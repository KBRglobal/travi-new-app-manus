import React from 'react';
import { Text, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { fonts, gradients } from '@/constants/theme';

type AvatarFallbackProps = {
  name: string;
  size?: number;
  style?: ViewStyle;
};

export function AvatarFallback({ name, size = 40, style }: AvatarFallbackProps) {
  const initials = name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <LinearGradient
      colors={[...gradients.avatar] as [string, string, ...string[]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <Text
        style={{
          fontFamily: fonts.heading,
          fontSize: size * 0.38,
          color: '#FFFFFF',
        }}
      >
        {initials}
      </Text>
    </LinearGradient>
  );
}
