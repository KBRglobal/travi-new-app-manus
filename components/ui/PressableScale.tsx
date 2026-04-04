import React, { useRef } from 'react';
import { Animated, Pressable, ViewStyle, PressableProps } from 'react-native';
import * as Haptics from 'expo-haptics';
import { pressAnimation } from '@/constants/theme';

type PressableScaleProps = PressableProps & {
  children: React.ReactNode;
  style?: ViewStyle;
  scaleValue?: number;
  haptic?: boolean;
};

export function PressableScale({
  children,
  style,
  scaleValue = pressAnimation.scale,
  haptic = true,
  onPress,
  ...props
}: PressableScaleProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: scaleValue,
      damping: pressAnimation.spring.damping,
      stiffness: pressAnimation.spring.stiffness,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      damping: pressAnimation.spring.damping,
      stiffness: pressAnimation.spring.stiffness,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = (e: any) => {
    if (haptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress?.(e);
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        {...props}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}
