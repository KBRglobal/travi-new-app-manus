import React, { useState, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { activities } from '../../lib/mockData';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Note: MapView requires native build. For web preview, showing placeholder.
// In production: import MapView, { Marker } from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';
// import BottomSheet from '@gorhom/bottom-sheet';

export default function LiveMapScreen() {
  const router = useRouter();
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [sheetExpanded, setSheetExpanded] = useState(false);

  return (
    <View className="flex-1 bg-bg-primary">
      {/* Map placeholder — in production this is MapView with dark style */}
      <View className="flex-1 bg-bg-secondary items-center justify-center">
        <Text className="text-6xl mb-4">🗺️</Text>
        <Text className="text-white text-heading-3">Live Map</Text>
        <Text className="text-text-secondary text-body-sm mt-2">Dubai, UAE</Text>

        {/* Activity markers */}
        <View className="absolute top-20 left-0 right-0 items-center">
          <View className="flex-row flex-wrap justify-center gap-4 px-6">
            {activities.slice(0, 4).map((act, i) => (
              <TouchableOpacity
                key={act.id}
                className={`bg-primary w-8 h-8 rounded-full items-center justify-center ${selectedActivity === act.id ? 'scale-125' : ''}`}
                onPress={() => setSelectedActivity(act.id)}
              >
                <Text className="text-white text-body-sm font-bold">{i + 1}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Back button */}
      <TouchableOpacity className="absolute top-14 left-6 bg-bg-overlay w-10 h-10 rounded-full items-center justify-center" onPress={() => router.back()}>
        <Text className="text-white text-lg">‹</Text>
      </TouchableOpacity>

      {/* Bottom sheet — in production this is @gorhom/bottom-sheet */}
      <View className={`absolute bottom-0 left-0 right-0 bg-bg-primary border-t border-border rounded-t-3xl ${sheetExpanded ? 'h-[60%]' : 'h-[30%]'}`}>
        <TouchableOpacity className="items-center py-3" onPress={() => setSheetExpanded(!sheetExpanded)}>
          <View className="w-10 h-1 bg-text-muted rounded-full" />
        </TouchableOpacity>

        <Text className="text-white text-heading-3 px-6 mb-3">Nearby</Text>

        <FlatList
          data={activities}
          keyExtractor={(item) => item.id}
          contentContainerClassName="px-6 pb-8"
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`flex-row bg-bg-card border rounded-card p-3 mb-2 ${selectedActivity === item.id ? 'border-primary' : 'border-border'}`}
              onPress={() => { setSelectedActivity(item.id); router.push(`/(live)/activity/${item.id}`); }}
            >
              <View className="flex-1">
                <Text className="text-white text-body font-semibold">{item.name}</Text>
                <Text className="text-text-secondary text-body-sm">{item.category} · {item.duration}</Text>
              </View>
              <View className="justify-center items-end">
                <Text className="text-primary text-body-sm font-semibold">0.5 km</Text>
                <Text className="text-text-muted text-caption">8 min walk</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
