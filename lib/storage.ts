/**
 * Zustand Persistence Storage Adapter
 * Uses AsyncStorage for general state and SecureStore for sensitive tokens.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import type { StateStorage } from 'zustand/middleware';

/**
 * AsyncStorage adapter for Zustand persist middleware.
 * Used for non-sensitive state (trips, DNA, points, social, live).
 */
export const asyncStorageAdapter: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(name);
    } catch (error) {
      console.warn(`[Storage] Failed to get item "${name}":`, error);
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (error) {
      console.warn(`[Storage] Failed to set item "${name}":`, error);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (error) {
      console.warn(`[Storage] Failed to remove item "${name}":`, error);
    }
  },
};

/**
 * SecureStore adapter for Zustand persist middleware.
 * Used for sensitive data (auth tokens, user credentials).
 * Note: SecureStore has a 2048-byte limit per key on some platforms,
 * so we only store minimal auth data here.
 */
export const secureStorageAdapter: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(name);
    } catch (error) {
      console.warn(`[SecureStorage] Failed to get item "${name}":`, error);
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(name, value);
    } catch (error) {
      console.warn(`[SecureStorage] Failed to set item "${name}":`, error);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(name);
    } catch (error) {
      console.warn(`[SecureStorage] Failed to remove item "${name}":`, error);
    }
  },
};
