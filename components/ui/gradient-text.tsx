import { Text, type TextStyle } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

interface GradientTextProps {
  text: string;
  colors?: string[];
  style?: TextStyle;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

/**
 * Gradient text using MaskedView + LinearGradient.
 * Use for hero headlines and premium section titles.
 *
 * Falls back to solid first color if MaskedView unavailable.
 */
export function GradientText({
  text,
  colors = ["#C084FC", "#F94498"],
  style,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
}: GradientTextProps) {
  try {
    return (
      <MaskedView
        maskElement={
          <Text style={[style, { backgroundColor: "transparent" }]}>{text}</Text>
        }
      >
        <LinearGradient colors={colors} start={start} end={end}>
          <Text style={[style, { opacity: 0 }]}>{text}</Text>
        </LinearGradient>
      </MaskedView>
    );
  } catch {
    // Fallback: solid color
    return <Text style={[style, { color: colors[0] }]}>{text}</Text>;
  }
}
