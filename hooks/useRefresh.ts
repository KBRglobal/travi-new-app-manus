/**
 * TRAVI — Pull to Refresh Hook
 * 
 * Provides consistent pull-to-refresh behavior across all list screens.
 * Includes haptic feedback on pull and simulated data refresh.
 * 
 * Usage:
 *   const { refreshing, onRefresh, refreshProps } = useRefresh(fetchData);
 *   <FlatList {...refreshProps} />
 */

import { useState, useCallback } from 'react';
import { RefreshControl } from 'react-native';
import { haptic } from '@/lib/haptics';

export function useRefresh(
  onRefreshFn?: () => Promise<void>,
  options?: {
    minDuration?: number; // Minimum refresh duration (ms) for UX feel
    hapticOnPull?: boolean;
  }
) {
  const [refreshing, setRefreshing] = useState(false);
  const { minDuration = 800, hapticOnPull = true } = options || {};

  const onRefresh = useCallback(async () => {
    if (hapticOnPull) haptic.medium();
    setRefreshing(true);

    try {
      // Run actual refresh + minimum duration in parallel
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

  // Ready-to-spread props for FlatList/ScrollView
  const refreshProps = {
    refreshing,
    onRefresh,
    refreshControl: (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        tintColor="rgba(255,255,255,0.6)"
        colors={['#7C3AED']}
        progressBackgroundColor="#1A0B32"
      />
    ),
  };

  return { refreshing, onRefresh, refreshProps };
}
