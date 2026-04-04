import React, { useRef } from 'react';
import { Text, Animated, Pressable, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { fonts, fontSizes, letterSpacing, radius, shadows, pressAnimation, gradients, colors } from '@/constants/theme';

type GradientButtonProps = {
  title: string;
  onPress: () => void;
  gradient?: readonly string[];
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
};

export function GradientButton({
  title,
  onPress,
  gradient = gradients.primaryCTA,
  style,
  textStyle,
  disabled = false,
  size = 'md',
  fullWidth = true,
  icon,
}: GradientButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: pressAnimation.scale,
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

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const heights = { sm: 44, md: 52, lg: 60 };
  const fontSizeMap = { sm: 14, md: fontSizes.cta, lg: 18 };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, fullWidth && { width: '100%' as any }]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={disabled}
      >
        <LinearGradient
          colors={disabled ? ['#504065', '#504065'] : [...gradient] as [string, string, ...string[]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            {
              height: heights[size],
              borderRadius: radius.button,
              alignItems: 'center' as const,
              justifyContent: 'center' as const,
              flexDirection: 'row' as const,
              gap: 8,
              paddingHorizontal: fullWidth ? 0 : 32,
            },
            !disabled && shadows.cta,
            style,
          ]}
        >
          {icon}
          <Text
            style={[
              {
                fontFamily: fonts.bold,
                fontSize: fontSizeMap[size],
                letterSpacing: letterSpacing.cta,
                color: disabled ? colors.text.disabled : '#FFFFFF',
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}
