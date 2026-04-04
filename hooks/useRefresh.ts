/**
 * TRAVI — Pull to Refresh Hook
 * 
 * Provides consistent pull-to-refresh behavior across all list screens.
 * Includes haptic feedback on pull and simulated data refresh.
 * 
 * Usage:
 *   const { refreshing, onRefresh } = useRefresh(fetchData);
 *   <FlatList refreshing={refreshing} onRefresh={onRefresh} />
 */

import { useState, useCallback } from 'react';
import { haptic } from '@/lib/haptics';

export function useRefresh(
  onRefreshFn?: () => Promise<void>,
  options?: {
    minDuration?: number;
    hapticOnPull?: boolean;
  }
) {
  const [refreshing, setRefreshing] = useState(false);
  const { minDuration = 800, hapticOnPull = true } = options || {};

  const onRefresh = useCallback(async () => {
    if (hapticOnPull) haptic.medium();
    setRefreshing(true);

    try {
      await Promise.all([
        onRefreshFn?.(),
        new Promise((r) => setTimeout(r, minDuration)),
      ]);
    } catch (e) {
      console.warn('[useRefresh] Error:', e);
    } finally {
      setRefreshing(false);
    }
  }, [onRefreshFn, minDuration, hapticOnPull]);

  return { refreshing, onRefresh };
}
