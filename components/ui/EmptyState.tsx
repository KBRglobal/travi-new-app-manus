/**
 * Reusable Empty State Component
 * Used as ListEmptyComponent in FlatLists across the app
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { EmptyStates, type EmptyState as EmptyStateType } from '@/lib/errorHandling';

interface EmptyStateProps {
  /** Key from EmptyStates record (e.g., 'trips', 'messages', 'wishlist') */
  stateKey?: string;
  /** Or provide custom props directly */
  emoji?: string;
  title?: string;
  description?: string;
  actionLabel?: string;
  actionRoute?: string;
  onAction?: () => void;
}

export function EmptyState({
  stateKey,
  emoji: customEmoji,
  title: customTitle,
  description: customDescription,
  actionLabel: customActionLabel,
  actionRoute: customActionRoute,
  onAction,
}: EmptyStateProps) {
  const router = useRouter();

  // Get from predefined states or use custom props
  const state: Partial<EmptyStateType> = stateKey
    ? EmptyStates[stateKey] || {}
    : {};

  const emoji = customEmoji || state.emoji || '📭';
  const title = customTitle || state.title || 'Nothing here yet';
  const description = customDescription || state.description || '';
  const actionLabel = customActionLabel || state.actionLabel;
  const actionRoute = customActionRoute || state.actionRoute;

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else if (actionRoute) {
      router.push(actionRoute as any);
    }
  };

  return (
    <View className="flex-1 items-center justify-center py-20 px-8">
      <Text className="text-5xl mb-4">{emoji}</Text>
      <Text className="text-white text-xl font-bold mb-2 text-center">{title}</Text>
      {description ? (
        <Text className="text-white/50 text-sm text-center mb-6">{description}</Text>
      ) : null}
      {actionLabel ? (
        <TouchableOpacity
          onPress={handleAction}
          className="bg-primary px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-bold">{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
