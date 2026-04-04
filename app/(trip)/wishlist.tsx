import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

// S17 — Wishlist
export default function WishlistScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: colors.text.primary, fontSize: 20, fontFamily: fonts.bold }}>S17</Text>
      <Text style={{ color: colors.text.secondary, fontSize: 14, marginTop: 8 }}>Wishlist</Text>
    </View>
  );
}
