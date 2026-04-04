import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useRouter } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, radius, typography, spacing, gradients} from '@/constants/theme';
import { useTripStore } from '@/stores/tripStore';
import * as Haptics from 'expo-haptics';

const DIETARY_OPTIONS = [
  'No restrictions', 'Vegetarian', 'Vegan',
  'Halal', 'Kosher', 'No seafood',
  'Nut allergy', 'Gluten-free',
];

const CUISINE_OPTIONS = [
  'Italian', 'Asian', 'Middle Eastern',
  'Mediterranean', 'Mexican', 'Japanese',
  'Indian', 'Healthy', 'American',
];

const BUDGET_OPTIONS = [
  { id: 'street' as const, label: 'Street food & local', range: '€5-15/meal', icon: '🍜' },
  { id: 'midrange' as const, label: 'Mid-range', range: '€15-40/meal', icon: '🍽️' },
  { id: 'fine' as const, label: 'Fine dining', range: '€40+/meal', icon: '✨' },
];

export default function FoodPreferencesScreen() {
  const router = useRouter();
  const { setFoodPreferences } = useTripStore();
  const destination = useTripStore((s) => s.currentTrip?.destination?.name || 'your destination');

  const [dietary, setDietary] = useState<string[]>([]);
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [budget, setBudget] = useState<'street' | 'midrange' | 'fine' | null>(null);

  const toggleDietary = (item: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setDietary((prev) => prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]);
  };

  const toggleCuisine = (item: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (cuisines.includes(item)) {
      setCuisines((prev) => prev.filter((c) => c !== item));
    } else if (cuisines.length < 5) {
      setCuisines((prev) => [...prev, item]);
    }
  };

  const handleSave = () => {
    setFoodPreferences({ dietary, cuisines, budget });
    router.push('/(trip)/plan/interests');
  };

  const handleSkip = () => {
    router.push('/(trip)/plan/interests');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Top ambient glow */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '15%' }}>
        <LinearGradient colors={['rgba(100,67,244,0.06)', 'transparent']} style={{ flex: 1 }} />
      </View>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 56, paddingBottom: 8 }}>
        <Pressable onPress={() => router.back()} style={{ padding: 8, marginRight: 12 }}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </Pressable>
        {/* Step indicator */}
        <View style={{ flex: 1, height: 4, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
          <View style={{ width: '43%', height: 4, backgroundColor: colors.primary, borderRadius: 2 }} />
        </View>
        <Pressable onPress={handleSkip} style={{ marginLeft: 12, padding: 8 }}>
          <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.bodySm, color: colors.text.secondary }}>Skip</Text>
        </Pressable>
      </View>
      <Text style={{ paddingHorizontal: 20, fontFamily: fonts.body, fontSize: fontSizes.caption, color: colors.text.muted, marginBottom: 8 }}>Step 3 of 7</Text>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}>
        <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h1, color: colors.text.primary, marginTop: 8 }}>What do you eat?</Text>
        <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.bodySm, color: colors.text.secondary, marginTop: 4, marginBottom: 24 }}>We'll find the best restaurants in {destination}</Text>

        {/* Section 1: Dietary */}
        <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.text.primary, marginBottom: 12 }}>Dietary Preferences</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
          {DIETARY_OPTIONS.map((item) => {
            const selected = dietary.includes(item);
            return (
              <Pressable
                key={item}
                onPress={() => toggleDietary(item)}
                style={{
                  paddingHorizontal: 16, paddingVertical: 10,
                  borderRadius: radius.pill,
                  backgroundColor: selected ? 'rgba(100,67,244,0.25)' : 'rgba(36,16,62,0.8)',
                  borderWidth: 1,
                  borderColor: selected ? colors.primary : 'rgba(255,255,255,0.10)',
                }}
              >
                <Text style={{ fontFamily: selected ? fonts.bold : fonts.body, fontSize: fontSizes.bodySm, color: selected ? colors.text.primary : colors.text.secondary }}>{item}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* Section 2: Cuisine */}
        <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.text.primary, marginBottom: 4 }}>Favorite Cuisines</Text>
        <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.caption, color: colors.text.muted, marginBottom: 12 }}>Select up to 5</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
          {CUISINE_OPTIONS.map((item) => {
            const selected = cuisines.includes(item);
            return (
              <Pressable
                key={item}
                onPress={() => toggleCuisine(item)}
                style={{
                  paddingHorizontal: 16, paddingVertical: 10,
                  borderRadius: radius.pill,
                  backgroundColor: selected ? 'rgba(100,67,244,0.25)' : 'rgba(36,16,62,0.8)',
                  borderWidth: 1,
                  borderColor: selected ? colors.primary : 'rgba(255,255,255,0.10)',
                  opacity: !selected && cuisines.length >= 5 ? 0.4 : 1,
                }}
              >
                <Text style={{ fontFamily: selected ? fonts.bold : fonts.body, fontSize: fontSizes.bodySm, color: selected ? colors.text.primary : colors.text.secondary }}>{item}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* Section 3: Budget */}
        <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.text.primary, marginBottom: 12 }}>Meal Budget</Text>
        <View style={{ gap: 12 }}>
          {BUDGET_OPTIONS.map((option) => {
            const selected = budget === option.id;
            return (
              <Pressable
                key={option.id}
                onPress={() => { setBudget(option.id); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
                style={{
                  padding: 20,
                  borderRadius: radius.card,
                  backgroundColor: selected ? 'rgba(100,67,244,0.15)' : colors.bg.card,
                  borderWidth: 1,
                  borderColor: selected ? colors.primary : colors.border.default,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <Text style={{ fontSize: 28 }}>{option.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.text.primary }}>{option.label}</Text>
                  <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.bodySm, color: colors.text.secondary, marginTop: 2 }}>{option.range}</Text>
                </View>
                {selected && <Ionicons name="checkmark-circle" size={24} color={colors.primary} />}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Sticky Save */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingBottom: 36, paddingTop: 16, backgroundColor: colors.bg.primary }}>
        <Pressable
          onPress={handleSave}
          style={{ height: 56, borderRadius: radius.button, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary }}
        >
          <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: '#FFF' }}>Save Preferences</Text>
        </Pressable>
      </View>
    </View>
  );
}
