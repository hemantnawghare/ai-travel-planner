'use client';

import React, { useState } from 'react';
import { Trip, PackingItem } from '@/types';
import { tripsApi } from '@/utils/api';

interface PackingListProps {
  trip: Trip;
  onUpdate?: (updatedTrip: Trip) => void;
}

export default function PackingList({ trip, onUpdate }: PackingListProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const togglePackingItem = async (itemId: string) => {
    setIsUpdating(true);

    try {
      const updatedPacking = trip.packingList.map((item) => {
        if (item._id === itemId) {
          return { ...item, isPacked: !item.isPacked };
        }
        return item;
      });

      const updatedTrip = await tripsApi.updateTrip(trip._id, { packingList: updatedPacking });

      if (onUpdate) {
        onUpdate(updatedTrip);
      }
    } catch (err) {
      console.error('Toggle packing item error:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Group packing items by category
  const itemsByCategory = trip.packingList.reduce(
    (acc, item) => {
      const category = item.category || 'Other';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    },
    {} as Record<string, PackingItem[]>
  );

  const categoryOrder = ['Documents', 'Clothing', 'Gear', 'Other'];
  const sortedCategories = categoryOrder.filter((cat) => itemsByCategory[cat]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h3 className="text-xl font-bold mb-1 text-white">
        ⛈️ AI Weather-Aware Packing Assistant
      </h3>
      <p className="text-xs text-slate-400 mb-6">
        Based on your planned activities and destination climate, here's what to pack:
      </p>

      <div className="space-y-6">
        {sortedCategories.length > 0 ? (
          sortedCategories.map((category) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-indigo-400 mb-3 uppercase tracking-wide">
                {category}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {itemsByCategory[category]?.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => !isUpdating && togglePackingItem(item._id!)}
                    className="flex items-center gap-3 p-3 bg-slate-800 border border-slate-700 rounded-xl cursor-pointer hover:bg-slate-750 transition"
                  >
                    <input
                      type="checkbox"
                      checked={item.isPacked}
                      readOnly
                      className="h-4 w-4 rounded bg-slate-950 border-slate-800 accent-emerald-500 cursor-pointer"
                    />
                    <span
                      className={`text-sm flex-1 ${
                        item.isPacked ? 'line-through text-slate-500' : 'text-slate-200'
                      }`}
                    >
                      {item.item}
                    </span>
                    {item.isPacked && (
                      <span className="text-xs text-emerald-400 font-semibold">✓</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-slate-500 py-8 text-center">
            Generating packing recommendations...
          </p>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-slate-800">
        <div className="text-xs text-slate-400 flex justify-between items-center">
          <span>
            {trip.packingList.filter((item) => item.isPacked).length} of{' '}
            {trip.packingList.length} items packed
          </span>
          {trip.packingList.length > 0 && (
            <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all"
                style={{
                  width: `${(trip.packingList.filter((item) => item.isPacked).length / trip.packingList.length) * 100}%`,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
