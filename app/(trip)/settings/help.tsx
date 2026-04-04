import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

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
    <ScrollView removeClippedSubviews={true} className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3 mb-2">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Help & FAQ</Text>
      </View>
      <TouchableOpacity onPress={() => router.push('/(trip)/settings/support')} className="mx-4 mb-6 p-5 bg-primary rounded-2xl items-center">
        <Ionicons name="chatbubble" size={24} color="#FFFFFF" />
        <Text className="text-white font-bold text-lg">Contact Support</Text>
        <Text className="text-white/60 text-sm">We typically reply within 2 hours</Text>
      </TouchableOpacity>
      <Text className="text-white/60 text-xs uppercase mx-4 mb-3 ml-5">Frequently Asked Questions</Text>
      {FAQ.map(item => (
        <TouchableOpacity key={item.q} onPress={() => setExpanded(expanded === item.q ? null : item.q)} className="mx-4 mb-2 p-4 bg-bg-secondary rounded-2xl border border-white/[0.08]">
          <View className="flex-row items-center justify-between">
            <Text className="text-white font-bold flex-1 mr-2">{item.q}</Text>
            <Text className="text-white/40">{expanded === item.q ? '−' : '+'}</Text>
          </View>
          {expanded === item.q && <Text className="text-white/60 text-sm mt-3">{item.a}</Text>}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
