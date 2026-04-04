import { View, Text } from 'react-native';

// S80 — CompatibilityScore
export default function CompatibilityScoreScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0A0514', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}>S80</Text>
      <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 8 }}>CompatibilityScore</Text>
    </View>
  );
}
