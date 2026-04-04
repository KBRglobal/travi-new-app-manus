import { View, Text } from 'react-native';
import { colors, fonts, fontSizes } from '../constants/theme';

// Reused: S8 (DNA Swipe), S25 (Activity Swipe), S81 (Traveler Swipe)
interface SwipeStackProps {
  children?: React.ReactNode;
}

export default function SwipeStack({ children }: SwipeStackProps) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        style={{
          fontFamily: fonts.body,
          fontSize: fontSizes.bodySm,
          color: colors.text.muted,
        }}
      >
        SwipeStack Component
      </Text>
      {children}
    </View>
  );
}
