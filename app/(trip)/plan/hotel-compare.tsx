import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const HOTELS = [
  { name: 'Hotel Luxe', price: 89, dna: 87, rating: 8.9, stars: 4, pool: true, breakfast: true, cancel: 'Free', distance: '1.2km', wifi: true },
  { name: 'City Inn', price: 120, dna: 72, rating: 7.8, stars: 3, pool: false, breakfast: true, cancel: '€20', distance: '0.8km', wifi: true },
  { name: 'Beach Resort', price: 65, dna: 91, rating: 9.1, stars: 5, pool: true, breakfast: false, cancel: 'Free', distance: '3.1km', wifi: true },
];

const ATTRS = ['Price/night', 'DNA Match', 'Rating', 'Stars', 'Pool', 'Breakfast', 'Cancellation', 'Distance center', 'WiFi'];

function getVal(hotel: typeof HOTELS[0], attr: string) {
  switch (attr) {
    case 'Price/night': return `€${hotel.price}`;
    case 'DNA Match': return `${hotel.dna}%`;
    case 'Rating': return `${hotel.rating}`;
    case 'Stars': return '⭐'.repeat(hotel.stars);
    case 'Pool': return hotel.pool ? '✓' : '✗';
    case 'Breakfast': return hotel.breakfast ? '✓' : '✗';
    case 'Cancellation': return hotel.cancel;
    case 'Distance center': return hotel.distance;
    case 'WiFi': return hotel.wifi ? '✓' : '✗';
    default: return '';
  }
}

export default function HotelCompare() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-bg-primary">
      <View className="flex-row items-center px-4 pt-12 pb-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Text className="text-white text-lg">‹ Back</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Compare Hotels (3)</Text>
      </View>

      <ScrollView className="flex-1 px-4" horizontal={false}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            <View className="flex-row mb-2">
              <View style={{ width: 120 }} />
              {HOTELS.map(h => (
                <View key={h.name} style={{ width: 110 }} className="items-center">
                  <View className="bg-bg-card rounded-card p-2 w-full items-center">
                    <Text className="text-white font-bold text-sm">{h.name}</Text>
                  </View>
                </View>
              ))}
            </View>

            {ATTRS.map(attr => {
              const vals = HOTELS.map(h => getVal(h, attr));
              return (
                <View key={attr} className="flex-row py-2" style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' }}>
                  <View style={{ width: 120 }}><Text className="text-text-secondary text-sm">{attr}</Text></View>
                  {vals.map((v, i) => (
                    <View key={i} style={{ width: 110 }} className="items-center">
                      <Text className="text-white text-sm">{v}</Text>
                    </View>
                  ))}
                </View>
              );
            })}

            <View className="flex-row mt-4 mb-8">
              <View style={{ width: 120 }} />
              {HOTELS.map(h => (
                <TouchableOpacity key={h.name} onPress={() => router.push('/(trip)/plan/activities')} style={{ width: 110 }} className="items-center">
                  <View className="bg-primary rounded-button px-3 py-2"><Text className="text-white text-xs font-bold">Select</Text></View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity onPress={() => router.push('/(trip)/plan/hotels')} className="bg-bg-card rounded-button py-3 items-center mb-8" style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
          <Text className="text-primary font-semibold">+ Add Hotel</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
