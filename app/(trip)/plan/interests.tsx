import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, radius } from '@/constants/theme';
import { useTripStore } from '@/stores/tripStore';
import * as Haptics from 'expo-haptics';

const INTEREST_CATEGORIES = [
  { id: 'culture', label: 'Culture' },
  { id: 'adventure', label: 'Adventure' },
  { id: 'food-drink', label: 'Food & Drink' },
  { id: 'beach', label: 'Beach' },
  { id: 'shopping', label: 'Shopping' },
  { id: 'nightlife', label: 'Nightlife' },
  { id: 'wellness', label: 'Wellness' },
  { id: 'photography', label: 'Photography' },
  { id: 'nature', label: 'Nature' },
  { id: 'arts', label: 'Arts' },
  { id: 'sports', label: 'Sports' },
  { id: 'entertainment', label: 'Entertainment' },
];

export default function InterestsScreen() {
  const router = useRouter();
  const { setInterests } = useTripStore();
  const destination = useTripStore((s) => s.currentTrip?.destination?.name || 'your destination');
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    setInterests(selected);
    router.push('/(trip)/plan/flights');
  };

  const handleSkip = () => {
    router.push('/(trip)/plan/flights');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 56, paddingBottom: 8 }}>
        <Pressable onPress={() => router.back()} style={{ padding: 8, marginRight: 12 }}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </Pressable>
        {/* Step indicator */}
        <View style={{ flex: 1, height: 4, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
          <View style={{ width: '57%', height: 4, backgroundColor: colors.primary, borderRadius: 2 }} />
        </View>
        <Pressable onPress={handleSkip} style={{ marginLeft: 12, padding: 8 }}>
          <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.bodySm, color: colors.text.secondary }}>Skip</Text>
        </Pressable>
      </View>
      <Text style={{ paddingHorizontal: 20, fontFamily: fonts.body, fontSize: fontSizes.caption, color: colors.text.muted, marginBottom: 8 }}>Step 4 of 7</Text>

      <ScrollView removeClippedSubviews={true} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}>
        <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h1, color: colors.text.primary, marginTop: 8 }}>
          What do you want to do in {destination}?
        </Text>
        <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.bodySm, color: colors.text.secondary, marginTop: 4, marginBottom: 24 }}>
          We'll find activities that match
        </Text>

        {/* Chips Grid */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {INTEREST_CATEGORIES.map((cat) => {
            const isSelected = selected.includes(cat.id);
            return (
              <Pressable
                key={cat.id}
                onPress={() => toggle(cat.id)}
                style={{
                  height: 44,
                  paddingHorizontal: 20,
                  borderRadius: radius.pill,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: isSelected ? 'rgba(100,67,244,0.25)' : 'rgba(255,255,255,0.05)',
                  borderWidth: 1,
                  borderColor: isSelected ? colors.primary : 'rgba(255,255,255,0.10)',
                }}
              >
                <Text style={{
                  fontFamily: isSelected ? fonts.bold : fonts.body,
                  fontSize: fontSizes.bodySm,
                  color: isSelected ? colors.text.primary : colors.text.secondary,
                }}>
                  {cat.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Sticky Continue */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingBottom: 36, paddingTop: 16, backgroundColor: colors.bg.primary }}>
        <Pressable
          onPress={handleContinue}
          disabled={selected.length === 0}
          style={{
            height: 56,
            borderRadius: radius.button,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: selected.length > 0 ? colors.primary : 'rgba(100,67,244,0.4)',
          }}
        >
          <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: '#FFF' }}>
            {selected.length > 0 ? `Continue (${selected.length} selected)` : 'Continue'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
