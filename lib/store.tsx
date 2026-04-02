import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ActivityCategory =
  | "beaches" | "hiking" | "food" | "nightlife" | "culture" | "adventure"
  | "wellness" | "shopping" | "nature" | "art" | "music" | "architecture";

export type TripPace = "slow" | "balanced" | "full";

export type TravelerProfile = {
  id: string;
  name: string;
  email: string;
  photo?: string;
  quizCompleted: boolean;
  travelerDNA: Record<string, string>;
  activityCategories: ActivityCategory[];
  tripPace: TripPace;
  foodPreferences: {
    cuisines: string[];
    avoid: string[];
    allergies: string[];
    dietary: string[];
  };
  points: number;
  lifetimeSavings: number;
  subscriptionActive: boolean;
};

export type Trip = {
  id: string;
  destination: string;
  destinationCode?: string;
  country: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: string;
  status: "draft" | "upcoming" | "active" | "completed";
  interests: string[];
  landmarks: string[];
  flight?: FlightOption;
  hotel?: HotelOption;
  itinerary: DayPlan[];
  totalCost: number;
  pointsEarned: number;
  coverImage?: string;
};

export type FlightOption = {
  id: string;
  airline: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  class: string;
  stops: number;
};

export type HotelOption = {
  id: string;
  name: string;
  stars: number;
  location: string;
  pricePerNight: number;
  totalPrice: number;
  amenities: string[];
  rating: number;
  image?: string;
};

export type DayPlan = {
  day: number;
  date: string;
  activities: Activity[];
};

export type Activity = {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  price: number;
  category: "flight" | "hotel" | "food" | "activity" | "transport";
  status: "pending" | "confirmed" | "completed";
  completed?: boolean;
};

export type PointTransaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "earned" | "spent" | "expired";
};

export type AppState = {
  isAuthenticated: boolean;
  isGuest: boolean;
  onboardingCompleted: boolean;
  profile: TravelerProfile | null;
  trips: Trip[];
  activeTrip: Trip | null;
  pointTransactions: PointTransaction[];
  notifications: AppNotification[];
  priceAlerts: PriceAlert[];
  splitBillExpenses: SplitBillExpense[];
};

export type PriceAlert = {
  id: string;
  destination: string;
  destinationCode: string;
  maxPrice: number;
  currentPrice: number;
  triggered: boolean;
  createdAt: string;
  alertedAt?: string;
};

export type SplitBillExpense = {
  id: string;
  tripId: string;
  title: string;
  totalAmount: number;
  paidBy: string;
  splitAmong: string[];
  category: "food" | "transport" | "accommodation" | "activity" | "other";
  date: string;
  settled: boolean;
};

export type AppNotification = {
  id: string;
  title: string;
  message: string;
  type: "booking" | "reminder" | "alert" | "points" | "social";
  read: boolean;
  createdAt: string;
};

type Action =
  | { type: "SET_AUTH"; payload: { isAuthenticated: boolean; isGuest: boolean } }
  | { type: "ADD_PRICE_ALERT"; payload: PriceAlert }
  | { type: "REMOVE_PRICE_ALERT"; payload: string }
  | { type: "TRIGGER_PRICE_ALERT"; payload: string }
  | { type: "ADD_EXPENSE"; payload: SplitBillExpense }
  | { type: "SETTLE_EXPENSE"; payload: string }
  | { type: "REMOVE_EXPENSE"; payload: string }
  | { type: "SET_PROFILE"; payload: TravelerProfile }
  | { type: "UPDATE_PROFILE"; payload: Partial<TravelerProfile> }
  | { type: "SET_ONBOARDING_COMPLETED" }
  | { type: "ADD_TRIP"; payload: Trip }
  | { type: "UPDATE_TRIP"; payload: { id: string; updates: Partial<Trip> } }
  | { type: "SET_ACTIVE_TRIP"; payload: Trip | null }
  | { type: "ADD_POINTS"; payload: { amount: number; description: string } }
  | { type: "SPEND_POINTS"; payload: { amount: number; description: string } }
  | { type: "ADD_NOTIFICATION"; payload: AppNotification }
  | { type: "MARK_NOTIFICATION_READ"; payload: string }
  | { type: "HYDRATE"; payload: Partial<AppState> }
  | { type: "LOGOUT" };

const initialState: AppState = {
  isAuthenticated: false,
  isGuest: false,
  onboardingCompleted: false,
  profile: null,
  trips: [],
  activeTrip: null,
  pointTransactions: [],
  notifications: [],
  priceAlerts: [],
  splitBillExpenses: [],
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_AUTH":
      return { ...state, isAuthenticated: action.payload.isAuthenticated, isGuest: action.payload.isGuest };
    case "SET_PROFILE":
      return { ...state, profile: action.payload };
    case "UPDATE_PROFILE":
      return { ...state, profile: state.profile ? { ...state.profile, ...action.payload } : null };
    case "SET_ONBOARDING_COMPLETED":
      return { ...state, onboardingCompleted: true };
    case "ADD_TRIP":
      return { ...state, trips: [...state.trips, action.payload] };
    case "UPDATE_TRIP":
      return {
        ...state,
        trips: state.trips.map((t) => (t.id === action.payload.id ? { ...t, ...action.payload.updates } : t)),
        activeTrip: state.activeTrip?.id === action.payload.id ? { ...state.activeTrip, ...action.payload.updates } : state.activeTrip,
      };
    case "SET_ACTIVE_TRIP":
      return { ...state, activeTrip: action.payload };
    case "ADD_POINTS": {
      const tx: PointTransaction = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        description: action.payload.description,
        amount: action.payload.amount,
        type: "earned",
      };
      return {
        ...state,
        profile: state.profile ? { ...state.profile, points: state.profile.points + action.payload.amount } : null,
        pointTransactions: [tx, ...state.pointTransactions],
      };
    }
    case "SPEND_POINTS": {
      const tx: PointTransaction = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        description: action.payload.description,
        amount: -action.payload.amount,
        type: "spent",
      };
      return {
        ...state,
        profile: state.profile ? { ...state.profile, points: Math.max(0, state.profile.points - action.payload.amount) } : null,
        pointTransactions: [tx, ...state.pointTransactions],
      };
    }
    case "ADD_NOTIFICATION":
      return { ...state, notifications: [action.payload, ...state.notifications] };
    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) => (n.id === action.payload ? { ...n, read: true } : n)),
      };
    case "HYDRATE":
      return { ...state, ...action.payload };
    case "ADD_PRICE_ALERT":
      return { ...state, priceAlerts: [action.payload, ...state.priceAlerts] };
    case "REMOVE_PRICE_ALERT":
      return { ...state, priceAlerts: state.priceAlerts.filter((a) => a.id !== action.payload) };
    case "TRIGGER_PRICE_ALERT":
      return {
        ...state,
        priceAlerts: state.priceAlerts.map((a) =>
          a.id === action.payload ? { ...a, triggered: true, alertedAt: new Date().toISOString() } : a
        ),
      };
    case "ADD_EXPENSE":
      return { ...state, splitBillExpenses: [action.payload, ...state.splitBillExpenses] };
    case "SETTLE_EXPENSE":
      return {
        ...state,
        splitBillExpenses: state.splitBillExpenses.map((e) =>
          e.id === action.payload ? { ...e, settled: true } : e
        ),
      };
    case "REMOVE_EXPENSE":
      return { ...state, splitBillExpenses: state.splitBillExpenses.filter((e) => e.id !== action.payload) };
    case "LOGOUT":
      return { ...initialState };
    default:
      return state;
  }
}

const StoreContext = createContext<{ state: AppState; dispatch: React.Dispatch<Action> } | null>(null);

const STORAGE_KEY = "travi_app_state";

export function TraviStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Hydrate from AsyncStorage on mount
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          const saved = JSON.parse(raw) as Partial<AppState>;
          dispatch({ type: "HYDRATE", payload: saved });
        } catch {}
      }
    });
  }, []);

  // Persist state changes
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within TraviStoreProvider");
  return ctx;
}
