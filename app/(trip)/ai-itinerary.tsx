import { haptic } from '@/lib/haptics';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

const preferences = ['Adventure', 'Culture', 'Food', 'Relaxation', 'Nightlife', 'Nature', 'Shopping', 'Photography'];

const mockItinerary = [
  { day: 1, title: 'Arrival & Old Town', activities: [{ time: '14:00', name: 'Check-in Hotel', duration: '1h' }, { time: '16:00', name: 'Gothic Quarter Walk', duration: '2h' }, { time: '19:00', name: 'Tapas at La Boqueria', duration: '2h' }] },
  { day: 2, title: 'Gaudí Day', activities: [{ time: '09:00', name: 'Sagrada Familia', duration: '2h' }, { time: '12:00', name: 'Park Güell', duration: '2h' }, { time: '15:00', name: 'Casa Batlló', duration: '1.5h' }] },
  { day: 3, title: 'Beach & Culture', activities: [{ time: '09:00', name: 'Barceloneta Beach', duration: '3h' }, { time: '13:00', name: 'Seafood Lunch', duration: '1.5h' }, { time: '16:00', name: 'Picasso Museum', duration: '2h' }] },
];

export default function AIItineraryScreen() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedPrefs, setSelectedPrefs] = useState<Set<string>>(new Set());
  const [budget, setBudget] = useState<'low' | 'medium' | 'high'>('medium');

  const togglePref = (p: string) => {
    setSelectedPrefs((prev) => {
      const next = new Set(prev);
      next.has(p) ? next.delete(p) : next.add(p);
      return next;
    });
  };

  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => setStep(3), 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  if (step === 1) {
    return (
      <ScrollView className="flex-1 bg-bg-primary" contentContainerClassName="pt-safe pb-24 px-6">
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-xl">‹ Back</Text></TouchableOpacity>
          <Text className="text-white text-heading-3">AI Itinerary</Text>
          <View className="w-12" />
        </View>
        <Text className="text-4xl text-center mb-4">🤖</Text>
        <Text className="text-white text-heading-2 text-center mb-2">What do you love?</Text>
        <Text className="text-text-secondary text-body text-center mb-6">Select your preferences and I'll create the perfect itinerary</Text>
        <View className="flex-row flex-wrap gap-2 mb-6">
          {preferences.map((p) => (
            <TouchableOpacity key={p} className={`px-4 py-3 rounded-full border ${selectedPrefs.has(p) ? 'bg-primary border-primary' : 'border-border'}`} onPress={() => togglePref(p)}>
              <Text className={`text-body-sm ${selectedPrefs.has(p) ? 'text-white font-semibold' : 'text-text-secondary'}`}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text className="text-white text-heading-3 mb-3">Budget</Text>
        <View className="flex-row gap-2 mb-8">
          {(['low', 'medium', 'high'] as const).map((b) => (
            <TouchableOpacity key={b} className={`flex-1 py-3 rounded-button items-center ${budget === b ? 'bg-primary' : 'bg-bg-card border border-border'}`} onPress={() => setBudget(b)}>
              <Text className={`text-body-sm font-semibold ${budget === b ? 'text-white' : 'text-text-secondary'}`}>{b === 'low' ? '💰 Budget' : b === 'medium' ? '💰💰 Mid' : '💰💰💰 Luxury'}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity className="bg-primary py-4 rounded-button items-center" onPress={() => setStep(2)}>
          <Text className="text-white text-body font-bold">Generate Itinerary ✨</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  if (step === 2) {
    return (
      <View className="flex-1 bg-bg-primary items-center justify-center px-6">
        <ActivityIndicator size="large" color="#6443F4" />
        <Text className="text-white text-heading-3 mt-6 mb-2">Creating your perfect trip...</Text>
        <Text className="text-text-secondary text-body text-center">Analyzing your DNA profile, preferences, and {selectedPrefs.size} interests</Text>
        <View className="mt-8 w-full">
          {['Checking weather patterns...', 'Finding hidden gems...', 'Optimizing routes...'].map((t, i) => (
            <Animated.View key={t} entering={FadeInUp.delay(i * 800)}>
              <Text className="text-primary text-body-sm text-center mb-2">✓ {t}</Text>
            </Animated.View>
          ))}
        </View>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-bg-primary" contentContainerClassName="pt-safe pb-24 px-6">
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity onPress={() => setStep(1)}><Text className="text-white text-xl">‹ Back</Text></TouchableOpacity>
        <Text className="text-white text-heading-3">Your Itinerary</Text>
        <TouchableOpacity onPress={() => router.push('/(trip)/itinerary')}><Text className="text-primary text-body-sm">Edit</Text></TouchableOpacity>
      </View>

      <View className="bg-status-success/20 border border-status-success rounded-card p-3 mb-6">
        <Text className="text-status-success text-body font-semibold">🤖 AI-generated based on your DNA profile</Text>
      </View>

      {mockItinerary.map((day, di) => (
        <Animated.View key={day.day} entering={FadeInDown.delay(di * 150)} className="mb-6">
          <Text className="text-white text-heading-3 mb-1">Day {day.day}: {day.title}</Text>
          {day.activities.map((act, ai) => (
            <View key={ai} className="flex-row bg-bg-card border border-border rounded-card p-3 mb-2">
              <View className="w-14 items-center mr-3">
                <Text className="text-primary text-body-sm font-bold">{act.time}</Text>
                <Text className="text-text-muted text-caption">{act.duration}</Text>
              </View>
              <View className="flex-1"><Text className="text-white text-body">{act.name}</Text></View>
            </View>
          ))}
        </Animated.View>
      ))}

      <View className="flex-row gap-3">
        <TouchableOpacity className="flex-1 bg-bg-card border border-border py-4 rounded-button items-center" onPress={() => setStep(1)}>
          <Text className="text-white text-body-sm">🔄 Regenerate</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-primary py-4 rounded-button items-center" onPress={() => router.push('/(trip)/itinerary')}>
          <Text className="text-white text-body-sm font-bold">✅ Accept</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
