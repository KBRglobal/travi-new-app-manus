import React from 'react';
import { Text, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { fonts, fontSizes, letterSpacing, radius, gradients, colors } from '@/constants/theme';

type GradientBadgeProps = {
  label: string;
  variant?: 'primary' | 'live' | 'points' | 'planning';
  style?: ViewStyle;
};

const variantMap = {
  primary: gradients.primaryCTA,
  live: gradients.live,
  points: gradients.points,
  planning: gradients.planning,
};

export function GradientBadge({ label, variant = 'primary', style }: GradientBadgeProps) {
  return (
    <LinearGradient
      colors={[...variantMap[variant]] as [string, string, ...string[]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        {
          paddingHorizontal: 12,
          paddingVertical: 5,
          borderRadius: radius.pill,
          alignSelf: 'flex-start' as const,
        },
        style,
      ]}
    >
      <Text
        style={{
          fontFamily: fonts.bold,
          fontSize: fontSizes.label,
          letterSpacing: letterSpacing.label,
          color: '#FFFFFF',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </Text>
    </LinearGradient>
  );
}

type PointsBadgeProps = {
  label: string;
  style?: ViewStyle;
};

export function PointsBadge({ label, style }: PointsBadgeProps) {
  return (
    <Text
      style={[
        {
          fontFamily: fonts.bold,
          fontSize: fontSizes.label,
          letterSpacing: letterSpacing.label,
          color: colors.gold,
          textTransform: 'uppercase',
          backgroundColor: colors.goldLight,
          borderWidth: 1,
          borderColor: 'rgba(255,215,0,0.25)',
          borderRadius: radius.pill,
          paddingHorizontal: 12,
          paddingVertical: 5,
          overflow: 'hidden',
          alignSelf: 'flex-start',
        },
        style,
      ]}
    >
      {label}
    </Text>
  );
}
