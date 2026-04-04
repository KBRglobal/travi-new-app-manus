import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const HOTELS = [
  { id: '1', name: 'Hotel Luxe', stars: 4, price: 89, rating: 8.9, dna: 87 },
  { id: '2', name: 'City Inn', stars: 3, price: 120, rating: 7.8, dna: 72 },
  { id: '3', name: 'Beach Resort', stars: 5, price: 65, rating: 9.1, dna: 91 },
];

export default function HotelSelect() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Hotels');
  const [selected, setSelected] = useState<string[]>([]);
  const [selectMode, setSelectMode] = useState(false);

  return (
    <View className="flex-1 bg-bg-primary">
      <View className="flex-row items-center px-4 pt-12 pb-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Text className="text-white text-lg">‹ Back</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Select Hotel</Text>
      </View>

      <View className="flex-row mx-4 mb-4 bg-bg-card rounded-pill p-1">
        <TouchableOpacity onPress={() => setActiveTab('Hotels')} className={`flex-1 py-2 rounded-pill items-center ${activeTab === 'Hotels' ? 'bg-primary' : ''}`}>
          <Text className={activeTab === 'Hotels' ? 'text-white font-semibold' : 'text-text-secondary'}>Hotels</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setActiveTab('Alt'); router.push('/(trip)/plan/alternative-stays'); }} className={`flex-1 py-2 rounded-pill items-center ${activeTab === 'Alt' ? 'bg-primary' : ''}`} style={{ borderWidth: activeTab !== 'Alt' ? 1 : 0, borderColor: '#F94498' }}>
          <Text className={activeTab === 'Alt' ? 'text-white font-semibold' : 'text-pink font-semibold'}>Alternative Stays NEW</Text>
        </TouchableOpacity>
      </View>

      {selectMode && <Text className="text-text-secondary text-center mb-2">Long press to select, then compare</Text>}

      <ScrollView className="flex-1 px-4">
        {HOTELS.map(hotel => (
          <TouchableOpacity
            key={hotel.id}
            onPress={() => {
              if (selectMode) {
                setSelected(prev => prev.includes(hotel.id) ? prev.filter(id => id !== hotel.id) : [...prev, hotel.id]);
              } else {
                router.push('/(trip)/plan/activities');
              }
            }}
            onLongPress={() => { setSelectMode(true); setSelected([hotel.id]); }}
            className="bg-bg-card rounded-card p-4 mb-3"
            style={selected.includes(hotel.id) ? { borderWidth: 2, borderColor: '#6443F4' } : {}}
          >
            <View className="flex-row justify-between items-center mb-2">
              <View>
                <Text className="text-white font-bold text-lg">{hotel.name}</Text>
                <Text className="text-yellow-400">{'⭐'.repeat(hotel.stars)}</Text>
              </View>
              {selectMode && (
                <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${selected.includes(hotel.id) ? 'bg-primary border-primary' : 'border-text-muted'}`}>
                  {selected.includes(hotel.id) && <Text className="text-white text-xs">✓</Text>}
                </View>
              )}
            </View>
            <View className="flex-row justify-between">
              <Text className="text-text-secondary">⭐ {hotel.rating} · ✦ {hotel.dna}% Match</Text>
              <Text className="text-white font-bold text-lg">€{hotel.price}/night</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selected.length >= 2 && (
        <View className="px-4 pb-6">
          <TouchableOpacity onPress={() => router.push('/(trip)/plan/hotel-compare')} className="bg-primary rounded-button py-4 items-center">
            <Text className="text-white font-bold text-lg">Compare ({selected.length})</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
