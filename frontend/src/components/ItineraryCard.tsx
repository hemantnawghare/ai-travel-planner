'use client';

import React, { useState } from 'react';
import { Trip, ItineraryDay } from '@/types';
import { tripsApi } from '@/utils/api';
import { formatINR } from '@/utils/currency';

interface ItineraryCardProps {
  trip: Trip;
  onUpdate?: (updatedTrip: Trip) => void;
}

export default function ItineraryCard({ trip, onUpdate }: ItineraryCardProps) {
  const [newActivityName, setNewActivityName] = useState('');
  const [targetDay, setTargetDay] = useState<number | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');

  const handleAddActivity = async (dayNum: number) => {
    if (!newActivityName.trim()) return;

    setError('');
    setIsUpdating(true);

    try {
      const updatedItinerary = trip.itinerary.map((day) => {
        if (day.dayNumber === dayNum) {
          return {
            ...day,
            activities: [
              ...day.activities,
              {
                title: newActivityName,
                description: 'Added by traveler',
                estimatedCostUSD: 0,
                timeOfDay: 'Afternoon' as const,
              },
            ],
          };
        }
        return day;
      });

      const updatedTrip = await tripsApi.updateTrip(trip._id, { itinerary: updatedItinerary });

      setNewActivityName('');
      setTargetDay(null);

      if (onUpdate) {
        onUpdate(updatedTrip);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add activity');
      console.error('Add activity error:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveActivity = async (dayNum: number, activityIndex: number) => {
    setError('');
    setIsUpdating(true);

    try {
      const updatedItinerary = trip.itinerary.map((day) => {
        if (day.dayNumber === dayNum) {
          return {
            ...day,
            activities: day.activities.filter((_, index) => index !== activityIndex),
          };
        }
        return day;
      });

      const updatedTrip = await tripsApi.updateTrip(trip._id, { itinerary: updatedItinerary });

      if (onUpdate) {
        onUpdate(updatedTrip);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove activity');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-white border-b border-slate-800 pb-3">
        Day-by-Day Timeline: {trip.destination}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-800 rounded-lg text-red-300 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {trip.itinerary.map((day) => (
          <div key={day.dayNumber} className="border-l-2 border-indigo-500 pl-6 relative">
            <div className="absolute -left-[9px] top-1 w-4 h-4 bg-indigo-500 rounded-full border-4 border-slate-900" />
            <h3 className="text-lg font-bold text-slate-200 mb-3">
              Day {day.dayNumber} {day.dayNumber === 1 ? '(Arrival)' : day.dayNumber === trip.durationDays ? '(Departure)' : ''}
            </h3>

            <div className="space-y-3 mb-4">
              {day.activities.map((act, index) => (
                <div
                  key={index}
                  className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex justify-between items-start group"
                >
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-white">{act.title}</span>
                      <span className="text-xs bg-indigo-900/40 text-indigo-300 px-2 py-0.5 rounded-full">
                        {act.timeOfDay}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{act.description}</p>
                    <p className="text-xs text-slate-500">{formatINR(act.estimatedCostUSD)} INR</p>
                  </div>
                  <button
                    onClick={() => handleRemoveActivity(day.dayNumber, index)}
                    disabled={isUpdating}
                    className="ml-4 px-2 py-1 text-xs bg-red-900/30 text-red-300 hover:bg-red-900/60 rounded opacity-0 group-hover:opacity-100 transition disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Add Activity Inline Form */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add new activity..."
                value={targetDay === day.dayNumber ? newActivityName : ''}
                onChange={(e) => {
                  setTargetDay(day.dayNumber);
                  setNewActivityName(e.target.value);
                }}
                className="bg-slate-950 border border-slate-800 rounded-lg text-sm px-3 py-2 focus:outline-none focus:border-indigo-500 flex-1"
                disabled={isUpdating}
              />
              <button
                onClick={() => handleAddActivity(day.dayNumber)}
                disabled={isUpdating || !newActivityName.trim()}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2 text-sm font-semibold transition"
              >
                {isUpdating ? 'Adding...' : 'Add'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
