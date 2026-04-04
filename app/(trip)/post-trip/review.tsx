import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

export default function ReviewScreen() {
  const router = useRouter();
  const [ratings, setRatings] = useState({ overall: 0, flights: 0, hotel: 0, activities: 0, food: 0 });
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const setRating = (key: keyof typeof ratings, val: number) => setRatings(prev => ({ ...prev, [key]: val }));

  if (submitted) return (
    <View className="flex-1 bg-bg-primary items-center justify-center px-8">
      <Text className="text-5xl mb-4">⭐</Text>
      <Text className="text-white text-2xl font-bold mb-2">Review Submitted!</Text>
      <Text className="text-white/60 text-center mb-2">Thanks for sharing your experience.</Text>
      <Text className="text-primary font-bold mb-6">+50 points earned!</Text>
      <TouchableOpacity onPress={() => router.push('/(tabs)/home')} className="bg-primary px-8 py-3 rounded-xl"><Text className="text-white font-bold">Done</Text></TouchableOpacity>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Review Your Trip</Text>
      </View>
      <View className="items-center py-4">
        <Text className="text-2xl mb-1">🇯🇵</Text>
        <Text className="text-white font-bold text-lg">Tokyo, Japan</Text>
        <Text className="text-white/40 text-sm">Apr 15 - 22, 2026</Text>
      </View>
      {[
        { key: 'overall' as const, label: 'Overall Experience', emoji: '⭐' },
        { key: 'flights' as const, label: 'Flights', emoji: '✈️' },
        { key: 'hotel' as const, label: 'Hotel', emoji: '🏨' },
        { key: 'activities' as const, label: 'Activities', emoji: '🎯' },
        { key: 'food' as const, label: 'Food & Dining', emoji: '🍽️' },
      ].map(item => (
        <View key={item.key} className="mx-4 mb-4">
          <Text className="text-white font-bold mb-2">{item.emoji} {item.label}</Text>
          <View className="flex-row">
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity key={star} onPress={() => setRating(item.key, star)} className="mr-2">
                <Text className="text-2xl">{star <= ratings[item.key] ? '⭐' : '☆'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
      <View className="mx-4 mb-4">
        <Text className="text-white font-bold mb-2">Your Review</Text>
        <TextInput className="bg-bg-secondary rounded-2xl px-4 py-4 text-white h-32 border border-white/[0.08]" value={review} onChangeText={setReview} placeholder="Share your experience..." placeholderTextColor="rgba(255,255,255,0.3)" multiline textAlignVertical="top" />
      </View>
      <TouchableOpacity onPress={() => ratings.overall > 0 ? setSubmitted(true) : null} className={`mx-4 mb-8 py-4 rounded-2xl items-center ${ratings.overall > 0 ? 'bg-primary' : 'bg-white/[0.05]'}`}>
        <Text className={`font-bold ${ratings.overall > 0 ? 'text-white' : 'text-white/30'}`}>Submit Review (+50 pts)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
