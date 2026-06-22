const express = require('express');
const tripController = require('../controllers/tripController');
const auth = require('../middleware/auth');

const router = express.Router();

// All trip routes require authentication
router.use(auth);

// Generate new trip
router.post('/generate', tripController.generateNewTrip);

// Get all trips for authenticated user
router.get('/', tripController.getUserTrips);

// Get single trip by ID
router.get('/:tripId', tripController.getTripById);

// Update trip
router.put('/:tripId', tripController.updateTrip);

// Delete trip
router.delete('/:tripId', tripController.deleteTrip);

// Regenerate specific day
router.post('/:tripId/regenerate-day/:dayNumber', tripController.regenerateDay);

module.exports = router;
