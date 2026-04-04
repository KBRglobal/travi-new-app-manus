import { View, Text, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, typography, spacing, gradients} from '@/constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTripStore } from '@/stores/tripStore';

export default function PlanCartScreen() {
  const router = useRouter();
  const companions = useTripStore((s) => s.currentTrip?.companions || []);
  const items = [
    { label: 'Flight TLV → BCN', price: '€180' },
    { label: 'Hotel Barcelona (7 nights)', price: '€840' },
    { label: '3 Activities', price: '€120' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Top ambient glow */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '15%' }}>
        <LinearGradient colors={['rgba(100,67,244,0.06)', 'transparent']} style={{ flex: 1 }} />
      </View>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 56, paddingBottom: 16 }}>
        <Pressable onPress={() => router.back()} style={{ padding: 8, marginRight: 12 }}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </Pressable>
        <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h2, color: colors.text.primary }}>Your Cart</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}>
        {/* Cart Items */}
        {items.map((item, i) => (
          <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.border.default }}>
            <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.body, color: colors.text.primary }}>{item.label}</Text>
            <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.text.primary }}>{item.price}</Text>
          </View>
        ))}

        {/* Total */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, marginTop: 8 }}>
          <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.bodyLg, color: colors.text.primary }}>Total</Text>
          <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.bodyLg, color: colors.primary }}>€1,140</Text>
        </View>

        {/* Payment Method */}
        <View style={{ backgroundColor: colors.bg.card, borderRadius: radius.card, padding: 16, marginTop: 16, borderWidth: 1, borderColor: colors.border.default, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <MaterialIcons name="credit-card" size={22} color={colors.text.secondary} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodySm, color: colors.text.primary }}>Payment Method</Text>
            <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.caption, color: colors.text.muted, marginTop: 2 }}>Visa •••• 4242</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.text.muted} />
        </View>

        {/* Trip Companions Row */}
        <Pressable
          onPress={() => router.push('/(trip)/plan/trip-companions')}
          style={{ backgroundColor: colors.bg.card, borderRadius: radius.card, padding: 16, marginTop: 12, borderWidth: 1, borderColor: colors.border.default, flexDirection: 'row', alignItems: 'center', gap: 12 }}
        >
          <MaterialIcons name="group" size={22} color={colors.text.secondary} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodySm, color: colors.text.primary }}>Trip Companions ({companions.length + 1} people)</Text>
            {companions.length > 0 && (
              <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.caption, color: colors.text.muted, marginTop: 2 }}>
                {companions.filter((c) => c.status === 'confirmed').length} confirmed
              </Text>
            )}
          </View>
          <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodySm, color: colors.primary }}>Manage →</Text>
        </Pressable>
      </ScrollView>

      {/* Checkout Button */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingBottom: 36, paddingTop: 16, backgroundColor: colors.bg.primary }}>
        <Pressable
          onPress={() => router.push('/(trip)/plan/checkout')}
          style={{ height: 56, borderRadius: radius.button, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary }}
        >
          <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: '#FFF' }}>Proceed to Checkout</Text>
        </Pressable>
      </View>
    </View>
  );
}
