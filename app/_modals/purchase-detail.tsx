import { haptic } from '@/lib/haptics';
import { View, Text } from 'react-native';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

// — — PurchaseDetail
export default function PurchaseDetailScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: colors.text.primary, fontSize: 20, fontFamily: fonts.bold }}>—</Text>
      <Text style={{ color: colors.text.secondary, fontSize: 14, marginTop: 8 }}>PurchaseDetail</Text>
    </View>
  );
}
