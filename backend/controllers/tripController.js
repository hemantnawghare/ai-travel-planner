const Trip = require('../models/Trip');

// Exponential backoff executor for external API resilience
async function fetchWithRetry(url, options, retries = 5, delay = 1000) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      if (response.status === 429 && retries > 0) {
        // Wait and retry on rate limits
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchWithRetry(url, options, retries - 1, delay * 2);
      }
      throw new Error(`External API Error: Status Code ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retries - 1, delay * 2);
    }
    throw error;
  }
}

const ALLOWED_PACKING_CATEGORIES = ['Documents', 'Clothing', 'Gear', 'Other'];
const ALLOWED_ACTIVITY_TIMES = ['Morning', 'Afternoon', 'Evening'];

function normalizeTimeOfDay(value) {
  if (!value || typeof value !== 'string') return 'Afternoon';
  const normalized = value.trim().toLowerCase();
  if (normalized.includes('morning')) return 'Morning';
  if (normalized.includes('breakfast')) return 'Morning';
  if (normalized.includes('lunch')) return 'Afternoon';
  if (normalized.includes('afternoon')) return 'Afternoon';
  if (normalized.includes('evening') || normalized.includes('night') || normalized.includes('dinner')) return 'Evening';
  if (normalized.includes('late morning')) return 'Morning';
  if (normalized.includes('late afternoon')) return 'Afternoon';
  return 'Afternoon';
}

function normalizePackingCategory(value) {
  if (!value || typeof value !== 'string') return 'Other';
  const normalized = value.trim().toLowerCase();
  if (normalized.includes('document') || normalized.includes('passport') || normalized.includes('id') || normalized.includes('ticket') || normalized.includes('visa')) return 'Documents';
  if (normalized.includes('cloth') || normalized.includes('shirt') || normalized.includes('pants') || normalized.includes('jacket') || normalized.includes('shoe') || normalized.includes('socks') || normalized.includes('outfit')) return 'Clothing';
  if (normalized.includes('gear') || normalized.includes('camera') || normalized.includes('charger') || normalized.includes('adapter') || normalized.includes('electronics') || normalized.includes('phone') || normalized.includes('tablet') || normalized.includes('device') || normalized.includes('power bank') || normalized.includes('sunglasses')) return 'Gear';
  return 'Other';
}

function sanitizeGeneratedTrip(result) {
  const itinerary = Array.isArray(result.itinerary)
    ? result.itinerary.map((day) => ({
        dayNumber: Number(day.dayNumber) || 1,
        activities: Array.isArray(day.activities)
          ? day.activities.map((activity) => ({
              title: activity?.title || 'Activity',
              description: activity?.description || '',
              estimatedCostUSD: Number(activity?.estimatedCostUSD) || 0,
              timeOfDay: normalizeTimeOfDay(activity?.timeOfDay),
            }))
          : [],
      }))
    : [];

  const packingList = Array.isArray(result.packingList)
    ? result.packingList.map((item) => ({
        item: item?.item || 'Item',
        category: normalizePackingCategory(item?.category),
        isPacked: typeof item?.isPacked === 'boolean' ? item.isPacked : false,
      }))
    : [];

  const hotels = Array.isArray(result.hotels)
    ? result.hotels.map((hotel) => ({
        name: hotel?.name || 'Hotel',
        tier: hotel?.tier || '',
        estimatedCostNightUSD: Number(hotel?.estimatedCostNightUSD) || 0,
        rating: hotel?.rating || '',
      }))
    : [];

  const estimatedBudget = result.estimatedBudget || {};
  return {
    itinerary,
    hotels,
    estimatedBudget: {
      transport: Number(estimatedBudget.transport) || 0,
      accommodation: Number(estimatedBudget.accommodation) || 0,
      food: Number(estimatedBudget.food) || 0,
      activities: Number(estimatedBudget.activities) || 0,
      total: Number(estimatedBudget.total) || 0,
    },
    packingList,
  };
}

function sanitizeItineraryDay(dayResult) {
  return {
    dayNumber: Number(dayResult?.dayNumber) || 1,
    activities: Array.isArray(dayResult?.activities)
      ? dayResult.activities.map((activity) => ({
          title: activity?.title || 'Activity',
          description: activity?.description || '',
          estimatedCostUSD: Number(activity?.estimatedCostUSD) || 0,
          timeOfDay: normalizeTimeOfDay(activity?.timeOfDay),
        }))
      : [],
  };
}

// Generate new trip with AI
exports.generateNewTrip = async (req, res) => {
  const { destination, durationDays, budgetTier, interests } = req.body;
  const userId = req.user.id; // Populated from authentication middleware securely

  // Validate input
  if (!destination || !durationDays || !budgetTier) {
    return res.status(400).json({ message: 'Destination, duration days, and budget tier are required' });
  }

  const prompt = `
    Create a detailed travel plan for a ${durationDays}-day trip to ${destination}.
    Budget preference is ${budgetTier}. Interests are: ${interests?.join(', ') || 'general sightseeing'}.

    You must output ONLY a valid JSON object matching this structure, and use only the allowed values below:
    {
      "itinerary": [
        {
          "dayNumber": 1,
          "activities": [
            { "title": "Activity name", "description": "Brief text details", "estimatedCostUSD": 20, "timeOfDay": "Morning" }
          ]
        }
      ],
      "hotels": [
        { "name": "Recommended Hotel", "tier": "Budget", "estimatedCostNightUSD": 85, "rating": "4.5/5" }
      ],
      "estimatedBudget": {
        "transport": 120,
        "accommodation": 300,
        "food": 150,
        "activities": 100,
        "total": 670
      },
      "packingList": [
        { "item": "Passport", "category": "Documents", "isPacked": false }
      ]
    }
    Allowed packing categories: Documents, Clothing, Gear, Other.
    Allowed activity timesOfDay: Morning, Afternoon, Evening.
    Make sure estimates match typical realistic local rates for the specified budgetTier.
  `;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const requestPayload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
      },
    };

    const data = await fetchWithRetry(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestPayload),
    });

    const parsedResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!parsedResponseText) {
      throw new Error('Could not extract generation data from response.');
    }

    const cleanResult = JSON.parse(parsedResponseText);
    const sanitizedResult = sanitizeGeneratedTrip(cleanResult);

    // Save user isolated trip directly into MongoDB
    const newTrip = new Trip({
      userId,
      destination,
      durationDays,
      budgetTier,
      interests: interests || [],
      itinerary: sanitizedResult.itinerary,
      hotels: sanitizedResult.hotels,
      estimatedBudget: sanitizedResult.estimatedBudget,
      packingList: sanitizedResult.packingList,
    });

    const savedTrip = await newTrip.save();
    return res.status(201).json(savedTrip);
  } catch (error) {
    console.error('Critical AI Generation Error:', error);
    return res.status(500).json({
      message: 'Fail-safe: API encountered an error processing your trip. Please try again.',
      error: error.message,
    });
  }
};

// Get all trips for authenticated user
exports.getUserTrips = async (req, res) => {
  try {
    const userId = req.user.id;

    const trips = await Trip.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(trips);
  } catch (error) {
    console.error('Fetch Trips Error:', error);
    res.status(500).json({ message: 'Failed to fetch trips', error: error.message });
  }
};

// Get single trip by ID (with user isolation check)
exports.getTripById = async (req, res) => {
  try {
    const { tripId } = req.params;
    const userId = req.user.id;

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Ensure user isolation: verify the trip belongs to the authenticated user
    if (trip.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Access Denied: Trip belongs to another user' });
    }

    res.status(200).json(trip);
  } catch (error) {
    console.error('Fetch Trip Error:', error);
    res.status(500).json({ message: 'Failed to fetch trip', error: error.message });
  }
};

// Update trip (add/remove activity, update packing list, etc.)
exports.updateTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const userId = req.user.id;
    const updates = req.body;

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Ensure user isolation
    if (trip.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Access Denied: Trip belongs to another user' });
    }

    // Apply updates
    if (updates.itinerary) {
      trip.itinerary = updates.itinerary;
    }
    if (updates.packingList) {
      trip.packingList = updates.packingList;
    }
    if (updates.hotels) {
      trip.hotels = updates.hotels;
    }
    if (updates.estimatedBudget) {
      trip.estimatedBudget = updates.estimatedBudget;
    }

    const updatedTrip = await trip.save();
    res.status(200).json(updatedTrip);
  } catch (error) {
    console.error('Update Trip Error:', error);
    res.status(500).json({ message: 'Failed to update trip', error: error.message });
  }
};

// Delete trip
exports.deleteTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const userId = req.user.id;

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Ensure user isolation
    if (trip.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Access Denied: Trip belongs to another user' });
    }

    await Trip.findByIdAndDelete(tripId);
    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error('Delete Trip Error:', error);
    res.status(500).json({ message: 'Failed to delete trip', error: error.message });
  }
};

// Regenerate specific day
exports.regenerateDay = async (req, res) => {
  try {
    const { tripId, dayNumber } = req.params;
    const { feedback } = req.body;
    const userId = req.user.id;

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Ensure user isolation
    if (trip.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Access Denied: Trip belongs to another user' });
    }

    const prompt = `
      Regenerate Day ${dayNumber} of a ${trip.durationDays}-day trip to ${trip.destination}.
      Budget preference is ${trip.budgetTier}. Interests are: ${trip.interests?.join(', ') || 'general sightseeing'}.
      User feedback: ${feedback || 'Please create new activities for this day'}.

      You must output ONLY a valid JSON object with this structure:
      {
        "dayNumber": ${dayNumber},
        "activities": [
          { "title": "Activity name", "description": "Brief text details", "estimatedCostUSD": 20, "timeOfDay": "Morning" }
        ]
      }
    `;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const requestPayload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
      },
    };

    const data = await fetchWithRetry(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestPayload),
    });

    const parsedResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!parsedResponseText) {
      throw new Error('Could not extract generation data from response.');
    }

    const cleanResult = JSON.parse(parsedResponseText);
    const sanitizedDay = sanitizeItineraryDay(cleanResult);

    // Update the specific day in the itinerary
    const dayIndex = trip.itinerary.findIndex((d) => d.dayNumber === parseInt(dayNumber));
    if (dayIndex === -1) {
      return res.status(404).json({ message: `Day ${dayNumber} not found in itinerary` });
    }

    trip.itinerary[dayIndex] = sanitizedDay;
    const updatedTrip = await trip.save();

    res.status(200).json(updatedTrip);
  } catch (error) {
    console.error('Regenerate Day Error:', error);
    res.status(500).json({
      message: 'Failed to regenerate day',
      error: error.message,
    });
  }
};
