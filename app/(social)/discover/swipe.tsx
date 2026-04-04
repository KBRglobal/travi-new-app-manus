import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const CARDS = [
  { id: '1', name: 'Sarah K.', avatar: '👩', dna: 'Foodie · Culture', match: 92, bio: 'Love exploring local markets and hidden restaurants', trips: 8 },
  { id: '2', name: 'Mike R.', avatar: '👨', dna: 'Adventure · Nature', match: 87, bio: 'Hiking enthusiast, always looking for the next summit', trips: 12 },
  { id: '3', name: 'Emma L.', avatar: '👱‍♀️', dna: 'Luxury · Wellness', match: 78, bio: 'Spa lover, boutique hotels, fine dining', trips: 5 },
];

export default function DiscoverSwipeScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const card = CARDS[currentIndex];

  const handleAction = (action: 'skip' | 'connect') => {
    if (action === 'connect') {
      // Send connection request
    }
    if (currentIndex < CARDS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.back();
    }
  };

  if (!card) return (
    <View className="flex-1 bg-bg-primary items-center justify-center">
      <Text className="text-4xl mb-4">🎉</Text>
      <Text className="text-white text-xl font-bold">No more travelers</Text>
      <TouchableOpacity onPress={() => router.back()} className="mt-6 bg-primary px-8 py-3 rounded-xl">
        <Text className="text-white font-bold">Go Back</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">← Back</Text></TouchableOpacity>
        <Text className="text-white/60 text-sm">{currentIndex + 1} / {CARDS.length}</Text>
      </View>
      <View className="flex-1 mx-4 mb-4 bg-bg-secondary rounded-3xl border border-white/[0.08] overflow-hidden">
        <View className="flex-1 items-center justify-center p-8">
          <Text className="text-8xl mb-4">{card.avatar}</Text>
          <Text className="text-white text-2xl font-bold mb-1">{card.name}</Text>
          <Text className="text-primary text-lg font-bold mb-2">{card.match}% match</Text>
          <Text className="text-white/60 text-sm mb-4">{card.dna}</Text>
          <Text className="text-white/80 text-center text-base mb-4">{card.bio}</Text>
          <Text className="text-white/40 text-sm">{card.trips} trips completed</Text>
        </View>
        <View className="flex-row p-6 pt-0">
          <TouchableOpacity onPress={() => handleAction('skip')} className="flex-1 mr-2 bg-white/[0.05] py-4 rounded-2xl items-center">
            <Text className="text-white/60 text-lg">Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleAction('connect')} className="flex-1 ml-2 bg-primary py-4 rounded-2xl items-center">
            <Text className="text-white font-bold text-lg">Connect</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
