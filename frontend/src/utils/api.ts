import { Trip } from '@/types';

interface AuthResponse {
  token: string;
}

// Central API utility for making authenticated requests

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface RequestOptions extends RequestInit {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `API Error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

// Auth endpoints
export const authApi = {
  register: (email: string, password: string, firstName?: string, lastName?: string) =>
    apiRequest<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: { email, password, firstName, lastName },
    }),

  login: (email: string, password: string) =>
    apiRequest<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    }),
};

// Trips endpoints
export const tripsApi = {
  generateTrip: (destination: string, durationDays: number, budgetTier: string, interests: string[]) =>
    apiRequest('/api/trips/generate', {
      method: 'POST',
      body: { destination, durationDays, budgetTier, interests },
    }),

  getUserTrips: () =>
    apiRequest<Trip[]>('/api/trips', {
      method: 'GET',
    }),

  getTripById: (tripId: string) =>
    apiRequest<Trip>(`/api/trips/${tripId}`, {
      method: 'GET',
    }),

  updateTrip: (tripId: string, updates: any) =>
    apiRequest<Trip>(`/api/trips/${tripId}`, {
      method: 'PUT',
      body: updates,
    }),

  deleteTrip: (tripId: string) =>
    apiRequest(`/api/trips/${tripId}`, {
      method: 'DELETE',
    }),

  regenerateDay: (tripId: string, dayNumber: number, feedback?: string) =>
    apiRequest(`/api/trips/${tripId}/regenerate-day/${dayNumber}`, {
      method: 'POST',
      body: { feedback },
    }),
};
