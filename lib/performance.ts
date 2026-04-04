/* ═══════════════════════════════════════════
 *  TRAVI — Performance Optimizations
 *  React.memo patterns, FlatList optimization,
 *  image caching, query caching
 * ═══════════════════════════════════════════ */

import React from 'react';

// ─── 1. React.memo with deep comparison ───

export function arePropsEqual<T extends Record<string, unknown>>(
  prevProps: T,
  nextProps: T,
  compareKeys?: (keyof T)[]
): boolean {
  const keys = compareKeys || (Object.keys(prevProps) as (keyof T)[]);
  return keys.every((key) => prevProps[key] === nextProps[key]);
}

// Usage: export default React.memo(MyComponent, (prev, next) => arePropsEqual(prev, next, ['id', 'title']))

// ─── 2. FlatList Optimization Helpers ───

export const FLATLIST_OPTIMIZATIONS = {
  removeClippedSubviews: true,
  maxToRenderPerBatch: 10,
  windowSize: 5,
  initialNumToRender: 10,
  updateCellsBatchingPeriod: 50,
  getItemLayout: (itemHeight: number) => (_data: any, index: number) => ({
    length: itemHeight,
    offset: itemHeight * index,
    index,
  }),
};

// Key extractor factory
export function keyExtractor(prefix: string = 'item') {
  return (item: { id: string }, index: number) => `${prefix}_${item.id || index}`;
}

// ─── 3. Image Caching Strategy ───

// expo-image handles caching automatically, but we can configure policies
export const IMAGE_CACHE_CONFIG = {
  // Memory cache: 100 images
  memoryCacheSize: 100,
  // Disk cache: 500MB
  diskCacheSize: 500 * 1024 * 1024,
  // Cache duration: 7 days
  cacheDurationMs: 7 * 24 * 60 * 60 * 1000,
};

// Placeholder blur hash for loading states
export const PLACEHOLDER_BLURHASH = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

// Image quality presets
export const IMAGE_QUALITY = {
  thumbnail: { width: 100, height: 100, quality: 0.5 },
  card: { width: 400, height: 300, quality: 0.7 },
  detail: { width: 800, height: 600, quality: 0.85 },
  full: { width: 1200, height: 900, quality: 0.95 },
};

// ─── 4. Query Caching (React Query defaults) ───

export const QUERY_DEFAULTS = {
  // Stale time: how long data is considered fresh
  staleTime: {
    user: 5 * 60 * 1000,         // 5 min
    destinations: 30 * 60 * 1000, // 30 min
    flights: 2 * 60 * 1000,       // 2 min (prices change fast)
    hotels: 5 * 60 * 1000,        // 5 min
    activities: 15 * 60 * 1000,   // 15 min
    wallet: 1 * 60 * 1000,        // 1 min
    points: 5 * 60 * 1000,        // 5 min
    social: 30 * 1000,             // 30 sec
    live: 10 * 1000,               // 10 sec
  },
  // Cache time: how long to keep unused data in cache
  gcTime: {
    default: 30 * 60 * 1000,  // 30 min
    heavy: 60 * 60 * 1000,    // 1 hour (destinations, activities)
    light: 5 * 60 * 1000,     // 5 min (live data)
  },
  // Retry config
  retry: {
    default: 3,
    auth: 1,
    payment: 2,
  },
};

// ─── 5. Debounce & Throttle ───

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => { inThrottle = false; }, limit);
    }
  };
}

// ─── 6. Lazy Loading ───

// Screen lazy loading wrapper
export function lazyScreen(importFn: () => Promise<{ default: React.ComponentType<any> }>) {
  return React.lazy(importFn);
}

// ─── 7. Memory Management ───

// Clean up large data structures when navigating away
export function cleanupOnUnmount(cleanupFns: (() => void)[]): () => void {
  return () => {
    cleanupFns.forEach((fn) => {
      try { fn(); } catch (e) { console.warn('[Cleanup]', e); }
    });
  };
}

// ─── 8. Network Optimization ───

// Batch API calls to reduce network overhead
export async function batchRequests<T>(
  requests: (() => Promise<T>)[],
  concurrency: number = 3
): Promise<T[]> {
  const results: T[] = [];
  const executing: Promise<void>[] = [];

  for (const request of requests) {
    const p = request().then((result) => {
      results.push(result);
    });
    executing.push(p);

    if (executing.length >= concurrency) {
      await Promise.race(executing);
    }
  }

  await Promise.all(executing);
  return results;
}

// ─── 9. Animation Performance ───

export const ANIMATION_CONFIG = {
  // Use native driver for all transform/opacity animations
  useNativeDriver: true,
  // Spring config for smooth animations
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
  // Timing config for simple transitions
  timing: {
    duration: 300,
  },
  // Reduce motion for accessibility
  reduceMotion: false, // Set from system preferences
};
