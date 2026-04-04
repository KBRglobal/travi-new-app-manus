import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { asyncStorageAdapter } from '../lib/storage';

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

// ─── New Interfaces ───

export interface PackingItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  packed: boolean;
}

export interface Companion {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  status: 'confirmed' | 'pending' | 'declined';
  isOrganizer?: boolean;
}

export interface FoodPreferences {
  dietary: string[];       // e.g. ['vegetarian', 'gluten-free']
  cuisines: string[];      // e.g. ['italian', 'japanese']
  budget: 'street' | 'midrange' | 'fine' | null;
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
  // New fields
  packingList: PackingItem[];
  companions: Companion[];
  foodPreferences: FoodPreferences;
  interests: string[];
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

  // Packing List
  addPackingItem: (item: Omit<PackingItem, 'id'>) => void;
  togglePackingItem: (itemId: string) => void;
  removePackingItem: (itemId: string) => void;
  updatePackingQuantity: (itemId: string, quantity: number) => void;
  markAllInCategory: (category: string) => void;

  // Companions
  addCompanion: (companion: Omit<Companion, 'id'>) => void;
  removeCompanion: (companionId: string) => void;
  updateCompanionStatus: (companionId: string, status: Companion['status']) => void;

  // Food Preferences
  setFoodPreferences: (prefs: FoodPreferences) => void;

  // Interests
  setInterests: (interests: string[]) => void;
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
  packingList: [],
  companions: [],
  foodPreferences: { dietary: [], cuisines: [], budget: null },
  interests: [],
};

export const useTripStore = create<TripState>()(
  persist(
    (set) => ({
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

      // ─── Packing List ───
      addPackingItem: (item) => set((s) => {
        if (!s.currentTrip) return {};
        const newItem: PackingItem = { ...item, id: Date.now().toString() + Math.random().toString(36).slice(2, 6) };
        return { currentTrip: { ...s.currentTrip, packingList: [...s.currentTrip.packingList, newItem] } };
      }),
      togglePackingItem: (itemId) => set((s) => {
        if (!s.currentTrip) return {};
        return { currentTrip: { ...s.currentTrip, packingList: s.currentTrip.packingList.map(i => i.id === itemId ? { ...i, packed: !i.packed } : i) } };
      }),
      removePackingItem: (itemId) => set((s) => {
        if (!s.currentTrip) return {};
        return { currentTrip: { ...s.currentTrip, packingList: s.currentTrip.packingList.filter(i => i.id !== itemId) } };
      }),
      updatePackingQuantity: (itemId, quantity) => set((s) => {
        if (!s.currentTrip) return {};
        return { currentTrip: { ...s.currentTrip, packingList: s.currentTrip.packingList.map(i => i.id === itemId ? { ...i, quantity } : i) } };
      }),
      markAllInCategory: (category) => set((s) => {
        if (!s.currentTrip) return {};
        return { currentTrip: { ...s.currentTrip, packingList: s.currentTrip.packingList.map(i => i.category === category ? { ...i, packed: true } : i) } };
      }),

      // ─── Companions ───
      addCompanion: (companion) => set((s) => {
        if (!s.currentTrip) return {};
        const newCompanion: Companion = { ...companion, id: Date.now().toString() + Math.random().toString(36).slice(2, 6) };
        return { currentTrip: { ...s.currentTrip, companions: [...s.currentTrip.companions, newCompanion] } };
      }),
      removeCompanion: (companionId) => set((s) => {
        if (!s.currentTrip) return {};
        return { currentTrip: { ...s.currentTrip, companions: s.currentTrip.companions.filter(c => c.id !== companionId) } };
      }),
      updateCompanionStatus: (companionId, status) => set((s) => {
        if (!s.currentTrip) return {};
        return { currentTrip: { ...s.currentTrip, companions: s.currentTrip.companions.map(c => c.id === companionId ? { ...c, status } : c) } };
      }),

      // ─── Food Preferences ───
      setFoodPreferences: (prefs) => set((s) => {
        if (!s.currentTrip) return {};
        return { currentTrip: { ...s.currentTrip, foodPreferences: prefs } };
      }),

      // ─── Interests ───
      setInterests: (interests) => set((s) => {
        if (!s.currentTrip) return {};
        return { currentTrip: { ...s.currentTrip, interests } };
      }),
    }),
    {
      name: 'travi-trips',
      storage: createJSONStorage(() => asyncStorageAdapter),
      partialize: (state) => ({
        currentTrip: state.currentTrip,
        trips: state.trips,
        activeTripId: state.activeTripId,
      }),
    }
  )
);
