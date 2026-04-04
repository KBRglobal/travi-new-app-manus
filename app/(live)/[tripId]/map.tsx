import { View, Text } from 'react-native';

// S37 — LiveMap
export default function LiveMapScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0A0514', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}>S37</Text>
      <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 8 }}>LiveMap</Text>
    </View>
  );
}
