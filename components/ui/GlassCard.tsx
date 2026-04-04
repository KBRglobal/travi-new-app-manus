import React from 'react';
import { View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { radius, shadows, gradients, colors } from '@/constants/theme';

type GlassCardProps = {
  children: React.ReactNode;
  tint?: 'discovery' | 'planning' | 'live' | 'neutral';
  style?: ViewStyle;
  noPadding?: boolean;
};

const tintMap = {
  discovery: gradients.cardTintDiscovery,
  planning: gradients.cardTintPlanning,
  live: gradients.cardTintLive,
  neutral: ['rgba(36,16,62,0.6)', 'rgba(36,16,62,0.4)'] as const,
};

export function GlassCard({ children, tint = 'neutral', style, noPadding = false }: GlassCardProps) {
  const tintColors = tintMap[tint];

  return (
    <View
      style={[
        {
          borderRadius: radius.card,
          borderWidth: 1.5,
          borderColor: colors.border.card,
          overflow: 'hidden',
        },
        shadows.card,
        style,
      ]}
    >
      <LinearGradient
        colors={[...tintColors] as [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          {
            borderRadius: radius.card - 1,
          },
          !noPadding && { padding: 18 },
        ]}
      >
        {children}
      </LinearGradient>
    </View>
  );
}
