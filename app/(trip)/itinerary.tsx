import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import DraggableFlatList, { ScaleDecorator, RenderItemParams } from 'react-native-draggable-flatlist';
import { useRouter } from 'expo-router';
import { activities, itineraryDays } from '../../lib/mockData';
import { EmptyState } from '@/components/ui/EmptyState';

type ItineraryItem = typeof activities[0] & { dayId: string };

export default function ItineraryScreen() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState(itineraryDays[0].id);
  const [items, setItems] = useState<ItineraryItem[]>(
    itineraryDays[0].activities.map((a) => ({ ...a, dayId: itineraryDays[0].id }))
  );

  const renderItem = ({ item, drag, isActive }: RenderItemParams<ItineraryItem>) => (
    <ScaleDecorator>
      <TouchableOpacity
        className={`flex-row bg-bg-card border rounded-card p-3 mb-2 mx-6 ${isActive ? 'border-primary bg-primary/10' : 'border-border'}`}
        onLongPress={drag}
        delayLongPress={150}
        onPress={() => router.push(`/(trip)/activity/${item.id}`)}
      >
        <View className="w-8 h-8 bg-primary rounded-full items-center justify-center mr-3">
          <Text className="text-white text-body-sm font-bold">{items.indexOf(item) + 1}</Text>
        </View>
        <Image source={{ uri: item.image }} className="w-14 h-14 rounded-lg mr-3" />
        <View className="flex-1 justify-center">
          <Text className="text-white text-body font-semibold">{item.name}</Text>
          <Text className="text-text-secondary text-body-sm">{item.time} · {item.duration}</Text>
        </View>
        <View className="justify-center">
          <Text className="text-text-muted text-lg">⠿</Text>
        </View>
      </TouchableOpacity>
    </ScaleDecorator>
  );

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="px-6 flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-white text-xl">‹ Back</Text>
        </TouchableOpacity>
        <Text className="text-white text-heading-3">Itinerary</Text>
        <TouchableOpacity onPress={() => router.push('/(trip)/collab-planning')}>
          <Text className="text-primary text-body-sm">👥 Collab</Text>
        </TouchableOpacity>
      </View>

      {/* Day tabs */}
      <View className="flex-row px-6 mb-4">
        {itineraryDays.map((day) => (
          <TouchableOpacity
            key={day.id}
            className={`mr-2 px-4 py-2 rounded-full border ${selectedDay === day.id ? 'bg-primary border-primary' : 'border-border'}`}
            onPress={() => {
              setSelectedDay(day.id);
              setItems(day.activities.map((a) => ({ ...a, dayId: day.id })));
            }}
          >
            <Text className={`text-body-sm ${selectedDay === day.id ? 'text-white font-semibold' : 'text-text-secondary'}`}>{day.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text className="text-text-muted text-caption px-6 mb-2">Long press to drag & reorder</Text>

      <DraggableFlatList
        data={items}
        onDragEnd={({ data }) => setItems(data)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        containerStyle={{ flex: 1 }}
      />

      {/* Bottom actions */}
      <View className="px-6 py-4 border-t border-border">
        <View className="flex-row gap-3">
          <TouchableOpacity className="flex-1 bg-bg-card border border-border py-3 rounded-button items-center" onPress={() => router.push('/(trip)/activities')}>
            <Text className="text-white text-body-sm">+ Add Activity</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-bg-card border border-border py-3 rounded-button items-center" onPress={() => router.push('/(trip)/ai-itinerary')}>
            <Text className="text-primary text-body-sm">🤖 AI Suggest</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="bg-primary py-4 rounded-button items-center mt-3" onPress={() => router.push('/(trip)/cart')}>
          <Text className="text-white text-body font-bold">Review & Book</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
