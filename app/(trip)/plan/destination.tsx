import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius } from '@/constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTripStore } from '@/stores/tripStore';
import * as Haptics from 'expo-haptics';

const SUGGESTIONS = [
  { id: 'dubai', name: 'Dubai', country: 'UAE', flag: '🇦🇪', match: 92, imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', flag: '🇯🇵', match: 85, imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800' },
  { id: 'barcelona', name: 'Barcelona', country: 'Spain', flag: '🇪🇸', match: 88, imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800' },
  { id: 'bali', name: 'Bali', country: 'Indonesia', flag: '🇮🇩', match: 81, imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800' },
];

export default function DestinationSelect() {
  const router = useRouter();
  const setDestination = useTripStore((s) => s.setDestination);
  const [mode, setMode] = useState<'city' | 'road'>('city');

  const handleSelectDestination = (dest: typeof SUGGESTIONS[0]) => {
    setDestination({
      id: dest.id,
      name: dest.name,
      country: dest.country,
      imageUrl: dest.imageUrl,
      matchScore: dest.match,
    });
    router.push('/(trip)/plan/dates');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 48, paddingBottom: 16 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12, padding: 4 }}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h2, color: colors.text.primary }}>Where to?</Text>
      </View>

      {/* Mode Selector Row — City Trip | Swipe Mode | Surprise Me */}
      <View style={{ flexDirection: 'row', marginHorizontal: 16, marginBottom: 16, gap: 8 }}>
        <TouchableOpacity
          onPress={() => setMode('city')}
          style={{
            flex: 1, paddingVertical: 10, borderRadius: radius.pill, alignItems: 'center',
            backgroundColor: mode === 'city' ? colors.primary : 'transparent',
            borderWidth: mode === 'city' ? 0 : 1, borderColor: colors.border.default,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Ionicons name="airplane" size={16} color={mode === 'city' ? '#FFF' : colors.text.secondary} />
            <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodySm, color: mode === 'city' ? '#FFF' : colors.text.secondary }}>City Trip</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); router.push('/(trip)/plan/destination-swipe'); }}
          style={{
            flex: 1, paddingVertical: 10, borderRadius: radius.pill, alignItems: 'center',
            borderWidth: 1, borderColor: colors.border.default,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <MaterialIcons name="shuffle" size={16} color={colors.text.secondary} />
            <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodySm, color: colors.text.secondary }}>Swipe Mode</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); router.push('/(trip)/plan/surprise'); }}
          style={{
            flex: 1, paddingVertical: 10, borderRadius: radius.pill, alignItems: 'center',
            borderWidth: 1, borderColor: colors.border.default,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <MaterialIcons name="casino" size={16} color={colors.text.secondary} />
            <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodySm, color: colors.text.secondary }}>Surprise Me</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={{ paddingHorizontal: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bg.card, borderRadius: radius.input, paddingHorizontal: 12, borderWidth: 1, borderColor: colors.border.default }}>
          <Ionicons name="search" size={18} color={colors.text.muted} />
          <TextInput
            placeholder="Search destinations..."
            placeholderTextColor={colors.text.muted}
            style={{ flex: 1, height: 48, marginLeft: 8, fontFamily: fonts.body, fontSize: fontSizes.body, color: colors.text.primary }}
          />
        </View>
      </View>

      {/* Suggestions */}
      <ScrollView removeClippedSubviews={true} style={{ flex: 1, paddingHorizontal: 16, marginTop: 16 }} contentContainerStyle={{ paddingBottom: 32 }}>
        <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodyLg, color: colors.text.primary, marginBottom: 12 }}>AI Suggestions for You</Text>
        {SUGGESTIONS.map((dest) => (
          <TouchableOpacity
            key={dest.name}
            onPress={() => handleSelectDestination(dest)}
            style={{ backgroundColor: colors.bg.card, borderRadius: radius.card, padding: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: colors.border.default }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 24, marginRight: 12 }}>{dest.flag}</Text>
              <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodyLg, color: colors.text.primary }}>{dest.name}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodySm, color: colors.primary }}>✦ {dest.match}%</Text>
              <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.caption, color: colors.text.muted }}>DNA Match</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
