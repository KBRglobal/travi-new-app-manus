import { View, StyleSheet, type ViewStyle, Platform } from "react-native";
import { BlurView } from "expo-blur";

interface BlurCardProps {
  intensity?: number;
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
  style?: ViewStyle;
  children: React.ReactNode;
}

/**
 * Glass morphism card with BlurView.
 * Falls back to semi-transparent view on web/Android where blur is limited.
 */
export function BlurCard({
  intensity = 20,
  borderRadius = 18,
  borderColor = "rgba(255,255,255,0.12)",
  borderWidth = 1,
  style,
  children,
}: BlurCardProps) {
  const cardStyle: ViewStyle = {
    borderRadius,
    borderWidth,
    borderColor,
    overflow: "hidden",
    ...style,
  };

  // Native blur on iOS, fallback on others
  if (Platform.OS === "ios") {
    return (
      <View style={cardStyle}>
        <BlurView intensity={intensity} tint="dark" style={StyleSheet.absoluteFillObject} />
        {children}
      </View>
    );
  }

  // Fallback for Android/Web
  return (
    <View style={[cardStyle, { backgroundColor: "rgba(26,10,61,0.85)" }]}>
      {children}
    </View>
  );
}
