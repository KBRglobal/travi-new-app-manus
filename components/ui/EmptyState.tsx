/**
 * Reusable Empty State Component
 * Design System: Chillax headings, Satoshi body, brand colors
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { EmptyStates, type EmptyState as EmptyStateType } from '@/lib/errorHandling';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

interface EmptyStateProps {
  stateKey?: string;
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
      <Text style={{ fontSize: 48, marginBottom: 16 }}>{emoji}</Text>
      <Text
        style={{
          fontFamily: fonts.heading,
          fontSize: fontSizes.h2,
          color: colors.text.primary,
          textAlign: 'center',
          marginBottom: 8,
        }}
      >
        {title}
      </Text>
      {description ? (
        <Text
          style={{
            fontFamily: fonts.body,
            fontSize: fontSizes.bodySm,
            color: colors.text.secondary,
            textAlign: 'center',
            marginBottom: 24,
          }}
        >
          {description}
        </Text>
      ) : null}
      {actionLabel ? (
        <TouchableOpacity
          onPress={handleAction}
          style={{
            backgroundColor: colors.primary,
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: radius.button,
            ...shadows.fab,
          }}
        >
          <Text
            style={{
              fontFamily: fonts.bold,
              fontSize: fontSizes.body,
              color: '#FFFFFF',
            }}
          >
            {actionLabel}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
