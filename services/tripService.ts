/**
 * TRAVI — Trip Service
 * Handles trip CRUD, flights, hotels, activities, and booking operations.
 */
import { get, post, put, del } from '../lib/api';

// ─── Types ───

export interface Destination {
  id: string;
  name: string;
  country: string;
  imageUrl: string;
  matchScore: number;
  description?: string;
  tags?: string[];
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  departureAirport: string;
  arrivalAirport: string;
  price: number;
  currency: string;
  stops: number;
  duration: string;
  class: 'economy' | 'business' | 'first';
}

export interface Hotel {
  id: string;
  name: string;
  stars: number;
  pricePerNight: number;
  currency: string;
  imageUrl: string;
  rating: number;
  amenities: string[];
  address: string;
}

export interface Activity {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  duration: string;
  imageUrl?: string;
  rating?: number;
  description?: string;
}

export interface TripSummary {
  id: string;
  destination: string;
  country: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  status: string;
  totalPrice: number;
}

export interface TripDetail {
  id: string;
  destination: Destination;
  dates: { start: string; end: string };
  travelers: number;
  flights: Flight[];
  hotels: Hotel[];
  activities: Activity[];
  totalPrice: number;
  status: string;
}

export interface SearchFlightsParams {
  origin: string;
  destination: string;
  departDate: string;
  returnDate?: string;
  passengers: number;
  class?: string;
}

export interface SearchHotelsParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  stars?: number;
}

export interface SearchActivitiesParams {
  destination: string;
  date?: string;
  category?: string;
}

// ─── Service ───

export const tripService = {
  // Trips
  getTrips: () =>
    get<TripSummary[]>('/trips'),

  getTrip: (id: string) =>
    get<TripDetail>(`/trips/${id}`),

  createTrip: (data: Partial<TripDetail>) =>
    post<TripDetail>('/trips', data),

  updateTrip: (id: string, data: Partial<TripDetail>) =>
    put<TripDetail>(`/trips/${id}`, data),

  deleteTrip: (id: string) =>
    del<void>(`/trips/${id}`),

  // Destinations
  getDestinations: (params?: { limit?: number; offset?: number }) =>
    get<Destination[]>('/destinations', { params }),

  getDestination: (id: string) =>
    get<Destination>(`/destinations/${id}`),

  getMatchedDestinations: () =>
    get<Destination[]>('/destinations/matched'),

  // Flights
  searchFlights: (params: SearchFlightsParams) =>
    get<Flight[]>('/flights/search', { params }),

  // Hotels
  searchHotels: (params: SearchHotelsParams) =>
    get<Hotel[]>('/hotels/search', { params }),

  // Activities
  searchActivities: (params: SearchActivitiesParams) =>
    get<Activity[]>('/activities/search', { params }),

  // Booking
  bookTrip: (tripId: string) =>
    post<{ bookingId: string; confirmationCode: string }>(`/trips/${tripId}/book`),

  cancelBooking: (tripId: string) =>
    post<void>(`/trips/${tripId}/cancel`),
};
