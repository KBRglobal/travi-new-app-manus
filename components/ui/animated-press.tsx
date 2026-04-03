import { useRef, useCallback } from "react";
import { Animated, Pressable, Platform, type ViewStyle, type PressableProps } from "react-native";
import * as Haptics from "expo-haptics";

interface AnimatedPressProps extends PressableProps {
  scale?: number;
  haptic?: "light" | "medium" | "heavy" | "none";
  style?: ViewStyle | ViewStyle[];
  children: React.ReactNode;
}

/**
 * Premium press component with spring animation + haptic feedback.
 * Use instead of TouchableOpacity for a more premium feel.
 *
 * Spring config: damping 20, stiffness 90 — matches "Modern Dark Cinema" spec.
 */
export function AnimatedPress({
  scale = 0.97,
  haptic = "light",
  style,
  children,
  onPress,
  ...props
}: AnimatedPressProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: scale,
      damping: 20,
      stiffness: 90,
      mass: 1,
      useNativeDriver: true,
    }).start();
  }, [scale]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      damping: 15,
      stiffness: 120,
      mass: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePress = useCallback(
    (e: any) => {
      if (haptic !== "none" && Platform.OS !== "web") {
        const style =
          haptic === "heavy"
            ? Haptics.ImpactFeedbackStyle.Heavy
            : haptic === "medium"
            ? Haptics.ImpactFeedbackStyle.Medium
            : Haptics.ImpactFeedbackStyle.Light;
        Haptics.impactAsync(style);
      }
      onPress?.(e);
    },
    [haptic, onPress],
  );

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      {...props}
    >
      <Animated.View style={[style, { transform: [{ scale: scaleAnim }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
