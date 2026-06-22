'use client';

import React, { useState } from 'react';
import { tripsApi } from '@/utils/api';

interface CreateTripFormProps {
  onTripCreated?: (trip: any) => void;
  isLoading?: boolean;
}

export default function CreateTripForm({ onTripCreated, isLoading = false }: CreateTripFormProps) {
  const [destination, setDestination] = useState('');
  const [durationDays, setDurationDays] = useState('5');
  const [budgetTier, setBudgetTier] = useState('Medium');
  const [interests, setInterests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      if (!destination.trim()) {
        throw new Error('Destination is required');
      }

      if (!durationDays || parseInt(durationDays) < 1) {
        throw new Error('Duration must be at least 1 day');
      }

      const interestArray = interests
        .split(',')
        .map((i) => i.trim())
        .filter((i) => i.length > 0);

      const trip = await tripsApi.generateTrip(
        destination,
        parseInt(durationDays),
        budgetTier,
        interestArray
      );

      setSuccess('Trip created successfully!');
      setDestination('');
      setDurationDays('5');
      setBudgetTier('Medium');
      setInterests('');

      if (onTripCreated) {
        onTripCreated(trip);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create trip');
      console.error('Trip creation error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Create New Trip</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-300 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-900/20 border border-green-800 rounded-lg text-green-300 text-sm">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Destination
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g., Tokyo, Paris, Bali"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            disabled={isSubmitting || isLoading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Duration (Days)
            </label>
            <input
              type="number"
              value={durationDays}
              onChange={(e) => setDurationDays(e.target.value)}
              min="1"
              max="30"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition"
              disabled={isSubmitting || isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Budget Tier
            </label>
            <select
              value={budgetTier}
              onChange={(e) => setBudgetTier(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition cursor-pointer"
              disabled={isSubmitting || isLoading}
            >
              <option value="Low">Budget</option>
              <option value="Medium">Standard</option>
              <option value="High">Luxury</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Interests (comma-separated)
          </label>
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="e.g., hiking, culture, food, history"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            disabled={isSubmitting || isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition mt-6"
        >
          {isSubmitting || isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating...
            </span>
          ) : (
            '✈️ Generate My Trip'
          )}
        </button>
      </form>
    </div>
  );
}
