import { create } from 'zustand';

interface Destination {
  id: string;
  name: string;
  country: string;
  imageUrl?: string;
  matchScore?: number;
}

interface Flight {
  id: string;
  airline: string;
  departure: string;
  arrival: string;
  price: number;
  stops: number;
}

interface Hotel {
  id: string;
  name: string;
  stars: number;
  pricePerNight: number;
  imageUrl?: string;
}

interface Activity {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
}

interface CartItem {
  type: 'flight' | 'hotel' | 'activity';
  item: Flight | Hotel | Activity;
  quantity: number;
}

interface TripPlan {
  id: string;
  destination: Destination | null;
  dates: { start: string; end: string } | null;
  travelers: number;
  flights: Flight[];
  hotels: Hotel[];
  activities: Activity[];
  cart: CartItem[];
  totalPrice: number;
  status: 'planning' | 'booked' | 'pre-trip' | 'live' | 'post-trip' | 'completed';
}

interface TripState {
  currentTrip: TripPlan | null;
  trips: TripPlan[];
  activeTripId: string | null;

  // Actions
  createTrip: () => void;
  setDestination: (destination: Destination) => void;
  setDates: (dates: { start: string; end: string }) => void;
  setTravelers: (count: number) => void;
  addFlight: (flight: Flight) => void;
  addHotel: (hotel: Hotel) => void;
  addActivity: (activity: Activity) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  setStatus: (status: TripPlan['status']) => void;
  setActiveTripId: (id: string | null) => void;
  reset: () => void;
}

const emptyTrip: TripPlan = {
  id: '',
  destination: null,
  dates: null,
  travelers: 1,
  flights: [],
  hotels: [],
  activities: [],
  cart: [],
  totalPrice: 0,
  status: 'planning',
};

export const useTripStore = create<TripState>((set) => ({
  currentTrip: null,
  trips: [],
  activeTripId: null,

  createTrip: () => set({ currentTrip: { ...emptyTrip, id: Date.now().toString() } }),
  setDestination: (destination) => set((s) => ({ currentTrip: s.currentTrip ? { ...s.currentTrip, destination } : null })),
  setDates: (dates) => set((s) => ({ currentTrip: s.currentTrip ? { ...s.currentTrip, dates } : null })),
  setTravelers: (count) => set((s) => ({ currentTrip: s.currentTrip ? { ...s.currentTrip, travelers: count } : null })),
  addFlight: (flight) => set((s) => ({ currentTrip: s.currentTrip ? { ...s.currentTrip, flights: [...s.currentTrip.flights, flight] } : null })),
  addHotel: (hotel) => set((s) => ({ currentTrip: s.currentTrip ? { ...s.currentTrip, hotels: [...s.currentTrip.hotels, hotel] } : null })),
  addActivity: (activity) => set((s) => ({ currentTrip: s.currentTrip ? { ...s.currentTrip, activities: [...s.currentTrip.activities, activity] } : null })),
  addToCart: (item) => set((s) => ({ currentTrip: s.currentTrip ? { ...s.currentTrip, cart: [...s.currentTrip.cart, item] } : null })),
  removeFromCart: (index) => set((s) => ({ currentTrip: s.currentTrip ? { ...s.currentTrip, cart: s.currentTrip.cart.filter((_, i) => i !== index) } : null })),
  setStatus: (status) => set((s) => ({ currentTrip: s.currentTrip ? { ...s.currentTrip, status } : null })),
  setActiveTripId: (id) => set({ activeTripId: id }),
  reset: () => set({ currentTrip: null }),
}));
