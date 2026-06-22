'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CreateTripForm from '@/components/CreateTripForm';
import ItineraryCard from '@/components/ItineraryCard';
import PackingList from '@/components/PackingList';
import { tripsApi } from '@/utils/api';
import { Trip } from '@/types';
import { formatINR } from '@/utils/currency';

export default function Dashboard() {
  const router = useRouter();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

  // Authenticate user check and retrieve User Isolation Saved Trips
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchUserTrips();
  }, [router]);

  const fetchUserTrips = async () => {
    try {
      const data = await tripsApi.getUserTrips();
      setTrips(data);
      if (data.length > 0) setSelectedTrip(data[0]);
    } catch (err) {
      console.error('Failed to query user records', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTripCreated = (newTrip: Trip) => {
    setTrips([newTrip, ...trips]);
    setSelectedTrip(newTrip);
    setShowCreateForm(false);
  };

  const handleTripUpdate = (updatedTrip: Trip) => {
    setTrips(trips.map((trip) => (trip._id === updatedTrip._id ? updatedTrip : trip)));
    setSelectedTrip(updatedTrip);
  };

  const handleDeleteTrip = async (tripId: string) => {
    if (!confirm('Are you sure you want to delete this trip?')) return;

    try {
      await tripsApi.deleteTrip(tripId);
      const newTrips = trips.filter((trip) => trip._id !== tripId);
      setTrips(newTrips);
      if (selectedTrip?._id === tripId) {
        setSelectedTrip(newTrips.length > 0 ? newTrips[0] : null);
      }
    } catch (err) {
      console.error('Failed to delete trip', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-900 text-white">
        <div className="text-center">
          <div className="inline-block h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-xl animate-pulse">Loading secure user vault...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              ✈️ AI Travel Dashboard
            </h1>
            <p className="text-sm text-slate-400">Secure Multi-User Itinerary Manager</p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              router.push('/login');
            }}
            className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Create Trip Button */}
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="w-full bg-indigo-600 hover:bg-indigo-500 transition text-white font-semibold py-3 rounded-lg"
            >
              + New Trip
            </button>

            {/* Create Trip Form (Expandable) */}
            {showCreateForm && (
              <CreateTripForm
                onTripCreated={handleTripCreated}
                isLoading={loading}
              />
            )}

            {/* Trips List */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4">Your Trips ({trips.length})</h2>
              {trips.length === 0 ? (
                <p className="text-slate-500 text-sm">No itineraries yet. Create one to begin!</p>
              ) : (
                <div className="space-y-3">
                  {trips.map((trip) => (
                    <div
                      key={trip._id}
                      className="flex items-center justify-between gap-2"
                    >
                      <button
                        onClick={() => setSelectedTrip(trip)}
                        className={`flex-1 text-left p-4 rounded-xl transition ${
                          selectedTrip?._id === trip._id
                            ? 'bg-indigo-600 border border-indigo-500 text-white'
                            : 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <p className="font-bold">{trip.destination}</p>
                        <p className="text-xs opacity-80">
                          {trip.durationDays} Days • {trip.budgetTier}
                        </p>
                      </button>
                      <button
                        onClick={() => handleDeleteTrip(trip._id)}
                        className="px-3 py-4 text-red-400 hover:text-red-300 transition"
                        title="Delete trip"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Budget Summary */}
            {selectedTrip && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-4">Financial Ledger</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Accommodation:</span>
                    <span className="font-semibold">{formatINR(selectedTrip.estimatedBudget.accommodation)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Food & Dining:</span>
                    <span className="font-semibold">{formatINR(selectedTrip.estimatedBudget.food)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Activities:</span>
                    <span className="font-semibold">{formatINR(selectedTrip.estimatedBudget.activities)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Transport:</span>
                    <span className="font-semibold">{formatINR(selectedTrip.estimatedBudget.transport)}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-slate-800 pt-3 text-white font-bold">
                    <span>Total Budget:</span>
                    <span className="text-lg text-indigo-400">
                      {formatINR(selectedTrip.estimatedBudget.total)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {selectedTrip ? (
              <>
                {/* Hotels Section */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h2 className="text-xl font-bold mb-4">🏨 Recommended Hotels</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedTrip.hotels && selectedTrip.hotels.length > 0 ? (
                      selectedTrip.hotels.map((hotel, idx) => (
                        <div key={idx} className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-semibold text-white">{hotel.name}</p>
                              <p className="text-xs text-slate-400">{hotel.tier}</p>
                            </div>
                            <span className="text-xs bg-yellow-900/40 text-yellow-300 px-2 py-1 rounded">
                              {hotel.rating}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-indigo-400">
                            {formatINR(hotel.estimatedCostNightUSD)}/night
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-500">No hotels recommended</p>
                    )}
                  </div>
                </div>

                {/* Itinerary */}
                <ItineraryCard trip={selectedTrip} onUpdate={handleTripUpdate} />

                {/* Packing List */}
                <PackingList trip={selectedTrip} onUpdate={handleTripUpdate} />
              </>
            ) : (
              <div className="flex flex-col justify-center items-center h-96 bg-slate-900 border border-slate-800 rounded-2xl">
                <span className="text-6xl mb-4">✈️</span>
                <p className="text-slate-400 text-center">
                  Select an existing itinerary or create a new trip to begin exploring.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
