import { View, Text } from 'react-native';

// — — CategoryPicker
export default function CategoryPickerScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0A0514', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}>—</Text>
      <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 8 }}>CategoryPicker</Text>
    </View>
  );
}
