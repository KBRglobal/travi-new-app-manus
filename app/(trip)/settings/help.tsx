import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const FAQ = [
  { q: 'How does Travel DNA work?', a: 'TRAVI analyzes your travel preferences through a fun quiz and your booking behavior to create your unique Travel DNA profile.' },
  { q: 'How do I earn points?', a: 'You earn points by booking trips, completing activities, writing reviews, and engaging with the community.' },
  { q: 'Can I cancel a booking?', a: 'Yes, cancellation policies vary by provider. Check the booking details for specific terms.' },
  { q: 'How does the wallet work?', a: 'Your TRAVI wallet stores cashback, refunds, and can be used for future bookings.' },
  { q: 'Is my data secure?', a: 'Yes, we use bank-level encryption and never share your personal data with third parties.' },
];

export default function HelpScreen() {
  const router = useRouter();
  const [expanded, setExpanded] = React.useState<string | null>(null);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
      <View className="flex-row items-center px-4 py-3 mb-2">
        <TouchableOpacity onPress={() => router.back()}><Text className=" text-lg" style={{ color: colors.text.primary }}>←</Text></TouchableOpacity>
        <Text className=" text-xl font-[Satoshi-Bold] ml-3" style={{ color: colors.text.primary }}>Help & FAQ</Text>
      </View>
      <TouchableOpacity onPress={() => router.push('/(trip)/settings/support')} className="mx-4 mb-6 p-5 bg-[#6443F4] rounded-2xl items-center">
        <Ionicons name="chatbubble" size={24} color="#FFFFFF" />
        <Text className=" font-[Satoshi-Bold] text-lg" style={{ color: colors.text.primary }}>Contact Support</Text>
        <Text className="/60 text-sm" style={{ color: colors.text.primary }}>We typically reply within 2 hours</Text>
      </TouchableOpacity>
      <Text className="/60 text-xs uppercase mx-4 mb-3 ml-5" style={{ color: colors.text.primary }}>Frequently Asked Questions</Text>
      {FAQ.map(item => (
        <TouchableOpacity key={item.q} onPress={() => setExpanded(expanded === item.q ? null : item.q)} className="mx-4 mb-2 p-4 bg-[#120824] rounded-2xl border border-white/[0.08]">
          <View className="flex-row items-center justify-between">
            <Text className=" font-[Satoshi-Bold] flex-1 mr-2" style={{ color: colors.text.primary }}>{item.q}</Text>
            <Text className="/40" style={{ color: colors.text.primary }}>{expanded === item.q ? '−' : '+'}</Text>
          </View>
          {expanded === item.q && <Text className="/60 text-sm mt-3" style={{ color: colors.text.primary }}>{item.a}</Text>}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
