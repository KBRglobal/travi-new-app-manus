import { Stack } from 'expo-router';
import { colors } from '@/constants/theme';

// Trip Group: Stack, hides tab bar
export default function TripLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bg.primary },
        animation: 'slide_from_right',
      }}
    >
      {/* Planning Funnel */}
      <Stack.Screen name="plan/index" />
      <Stack.Screen name="plan/destination" />
      <Stack.Screen name="plan/dates" />
      <Stack.Screen name="plan/flights" />
      <Stack.Screen name="plan/hotels" />
      <Stack.Screen name="plan/hotel/[id]" />
      <Stack.Screen name="plan/activities" />
      <Stack.Screen name="plan/itinerary" />
      <Stack.Screen name="plan/cart" />
      <Stack.Screen name="plan/checkout" />
      <Stack.Screen name="plan/payment" />
      <Stack.Screen name="plan/confirmation" />
      <Stack.Screen name="plan/payment-failed" />

      {/* Pre-Trip */}
      <Stack.Screen name="pre/[tripId]/index" />
      <Stack.Screen name="pre/[tripId]/checklist" />
      <Stack.Screen name="pre/[tripId]/documents" />

      {/* Post-Trip */}
      <Stack.Screen name="post/[tripId]/celebration" />
      <Stack.Screen name="post/[tripId]/summary" />
      <Stack.Screen name="post/[tripId]/review" />
      <Stack.Screen name="post/[tripId]/gallery" />

      {/* Wallet */}
      <Stack.Screen name="wallet/add-funds" />
      <Stack.Screen name="wallet/transactions" />
      <Stack.Screen name="wallet/split" />
      <Stack.Screen name="wallet/kyc" />

      {/* Points */}
      <Stack.Screen name="points/redeem/index" />
      <Stack.Screen name="points/redeem/airline-miles" />
      <Stack.Screen name="points/redeem/partner/[id]" />
      <Stack.Screen name="points/redeem/gift-cards" />
      <Stack.Screen name="points/redeem/confirm" />
      <Stack.Screen name="points/earn" />
      <Stack.Screen name="points/transactions" />
      <Stack.Screen name="points/perks" />
      <Stack.Screen name="points/referrals" />

      {/* Profile & Settings */}
      <Stack.Screen name="profile/index" />
      <Stack.Screen name="profile/edit" />
      <Stack.Screen name="profile/dna" />
      <Stack.Screen name="settings/index" />
      <Stack.Screen name="settings/support" />
      <Stack.Screen name="account/change-email" />
      <Stack.Screen name="account/change-password" />
      <Stack.Screen name="account/delete" />

      {/* Universal */}
      <Stack.Screen name="wishlist" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="membership" />
    </Stack>
  );
}
