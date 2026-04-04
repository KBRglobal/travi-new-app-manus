/**
 * TRAVI — Loading State Hook
 * 
 * Provides consistent loading → skeleton → content flow.
 * Simulates API loading with configurable delay.
 * 
 * Usage:
 *   const { isLoading, data } = useLoadingState(mockData, 1200);
 *   if (isLoading) return <Skeleton.Home />;
 *   return <RealContent data={data} />;
 */

import { useState, useEffect } from 'react';

export function useLoadingState<T>(
  data: T,
  loadingDuration: number = 1000,
  options?: {
    onLoaded?: () => void;
  }
): {
  isLoading: boolean;
  data: T | null;
} {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      options?.onLoaded?.();
    }, loadingDuration);

    return () => clearTimeout(timer);
  }, [loadingDuration]);

  return {
    isLoading,
    data: isLoading ? null : data,
  };
}
