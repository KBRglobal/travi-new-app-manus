import { View, Text } from 'react-native';

// Reused: S8 (DNA Swipe), S25 (Activity Swipe), S81 (Traveler Swipe)
interface SwipeStackProps {
  children?: React.ReactNode;
}

export default function SwipeStack({ children }: SwipeStackProps) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>SwipeStack Component</Text>
      {children}
    </View>
  );
}
