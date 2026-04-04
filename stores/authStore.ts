import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { secureStorageAdapter } from '../lib/storage';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  membershipTier: 'explorer' | 'adventurer' | 'globetrotter';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  isLoading: boolean;
  onboardingComplete: boolean;
  _hasHydrated: boolean;

  // Actions
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  login: (user: User, token: string) => void;
  loginAsGuest: () => void;
  logout: () => void;
  setOnboardingComplete: (complete: boolean) => void;
  setLoading: (loading: boolean) => void;
  setHasHydrated: (hydrated: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isGuest: false,
      isLoading: true,
      onboardingComplete: false,
      _hasHydrated: false,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token, isAuthenticated: !!token }),
      login: (user, token) => set({ user, token, isAuthenticated: true, isGuest: false }),
      loginAsGuest: () => set({
        user: {
          id: 'guest',
          email: 'guest@travi.app',
          name: 'Guest Traveler',
          membershipTier: 'explorer',
        },
        token: 'guest-token',
        isAuthenticated: true,
        isGuest: true,
        onboardingComplete: true,
      }),
      logout: () => set({ user: null, token: null, isAuthenticated: false, isGuest: false, onboardingComplete: false }),
      setOnboardingComplete: (complete) => set({ onboardingComplete: complete }),
      setLoading: (loading) => set({ isLoading: loading }),
      setHasHydrated: (hydrated) => set({ _hasHydrated: hydrated }),
    }),
    {
      name: 'travi-auth',
      storage: createJSONStorage(() => secureStorageAdapter),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isGuest: state.isGuest,
        onboardingComplete: state.onboardingComplete,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
        state?.setLoading(false);
      },
    }
  )
);
