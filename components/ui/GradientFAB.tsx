import React from 'react';
import { ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { PressableScale } from './PressableScale';
import { gradients, shadows, zIndex } from '@/constants/theme';

type GradientFABProps = {
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
  style?: ViewStyle;
};

export function GradientFAB({ icon, onPress, style }: GradientFABProps) {
  return (
    <PressableScale
      onPress={onPress}
      style={[
        {
          position: 'absolute',
          bottom: 90,
          right: 20,
          zIndex: zIndex.fab,
        },
        shadows.fab,
        style,
      ]}
    >
      <LinearGradient
        colors={[...gradients.primaryCTA] as [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MaterialIcons name={icon} size={28} color="#FFFFFF" />
      </LinearGradient>
    </PressableScale>
  );
}
