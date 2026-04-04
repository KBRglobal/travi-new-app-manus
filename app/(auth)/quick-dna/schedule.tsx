import { useState, useCallback} from 'react';
import { View, Text, Pressable, ScrollView, FlatList} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

const OPTIONS = [
  { id: 'detailed', iconName: 'clipboard', title: 'Detailed itinerary', subtitle: 'Planned hour by hour' },
  { id: 'rough', iconName: 'map', title: 'Rough plan', subtitle: 'Key stops, flexible timing' },
  { id: 'spontaneous', iconName: 'dice', title: 'Spontaneous', subtitle: 'Figure it out there' },
  { id: 'flow', iconName: 'water', title: 'Go with the flow', subtitle: 'Pure adventure' },
];

// S9 — DNA Schedule
export default function DNAScheduleScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      {/* Header */}
      <View className="flex-row items-center px-6 md:px-12 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2">
          <Text className="text-white text-2xl">‹</Text>
        </Pressable>
        <View className="flex-1 h-1 bg-white/10 rounded-full ml-4">
          <View className="w-3/4 h-full bg-primary rounded-full" />
        </View>
      </View>

      <ScrollView contentContainerClassName="px-6 md:px-12 pb-32">
        <Text className="text-2xl md:text-3xl font-bold text-white mt-6">How do you plan?</Text>
        <Text className="text-sm md:text-base text-text-secondary mt-2">There's no wrong answer</Text>

        <View className="gap-3 mt-6 max-w-md">
          {OPTIONS.map((opt) => (
            <Pressable
              key={opt.id}
              onPress={() => setSelected(opt.id)}
              className={`h-18 flex-row items-center px-4 rounded-card border ${
                selected === opt.id
                  ? 'bg-primary/20 border-primary'
                  : 'bg-white/5 border-white/8'
              }`}
            >
              <Text className="text-2xl mr-4">{opt.icon}</Text>
              <View className="flex-1">
                <Text className="text-white text-base font-bold">{opt.title}</Text>
                <Text className="text-text-muted text-xs">{opt.subtitle}</Text>
              </View>
              {selected === opt.id && (
                <View className="w-5 h-5 rounded-full bg-primary items-center justify-center">
                  <Ionicons name="checkmark" size={24} color="#FFFFFF" />
                </View>
              )}
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Sticky Continue */}
      <View className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-safe mb-4 bg-bg-primary pt-4">
        <Pressable
          onPress={() => router.push('/(auth)/quick-dna/summary')}
          disabled={!selected}
          className={`w-full max-w-md mx-auto h-14 rounded-button items-center justify-center ${
            selected ? 'bg-primary active:opacity-80' : 'bg-primary opacity-40'
          }`}
        >
          <Text className="text-white text-base md:text-lg font-semibold">Continue</Text>
        </Pressable>
      </View>
    </View>
  );
}
