import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import DraggableFlatList, { ScaleDecorator, RenderItemParams } from 'react-native-draggable-flatlist';
import { useRouter } from 'expo-router';
import { activities, itineraryDays } from '../../lib/mockData';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { CachedImage } from '../../components/ui/CachedImage';

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
        className={`flex-row bg-[#120824] border rounded-[16px] p-3 mb-2 mx-6 ${isActive ? 'border-[#6443F4] bg-[#6443F4]/10' : 'border-[rgba(255,255,255,0.08)]'}`}
        onLongPress={drag}
        delayLongPress={150}
        onPress={() => router.push(`/(trip)/activity/${item.id}`)}
      >
        <View className="w-8 h-8 bg-[#6443F4] rounded-full items-center justify-center mr-3">
          <Text className=" text-[13px] font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{items.indexOf(item) + 1}</Text>
        </View>
        <CachedImage source={{ uri: item.image }} className="w-14 h-14 rounded-lg mr-3" />
        <View className="flex-1 justify-center">
          <Text className=" text-[15px] font-semibold" style={{ color: colors.text.primary }}>{item.name}</Text>
          <Text className="text-[rgba(255,255,255,0.6)] text-[13px]">{item.time} · {item.duration}</Text>
        </View>
        <View className="justify-center">
          <Text className="text-[rgba(255,255,255,0.3)] text-lg">⠿</Text>
        </View>
      </TouchableOpacity>
    </ScaleDecorator>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
      <View className="px-6 flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className=" text-xl" style={{ color: colors.text.primary }}>‹ Back</Text>
        </TouchableOpacity>
        <Text className=" text-[18px]" style={{ color: colors.text.primary }}>Itinerary</Text>
        <TouchableOpacity onPress={() => router.push('/(trip)/collab-planning')}>
          <Text className="text-[#6443F4] text-[13px]">Collab</Text>
        </TouchableOpacity>
      </View>

      {/* Day tabs */}
      <View className="flex-row px-6 mb-4">
        {itineraryDays.map((day) => (
          <TouchableOpacity
            key={day.id}
            className={`mr-2 px-4 py-2 rounded-full border ${selectedDay === day.id ? 'bg-[#6443F4] border-[#6443F4]' : 'border-[rgba(255,255,255,0.08)]'}`}
            onPress={() => {
              setSelectedDay(day.id);
              setItems(day.activities.map((a) => ({ ...a, dayId: day.id })));
            }}
          >
            <Text className={`text-[13px] ${selectedDay === day.id ? 'text-white font-semibold' : 'text-[rgba(255,255,255,0.6)]'}`}>{day.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text className="text-[rgba(255,255,255,0.3)] text-[12px] px-6 mb-2">Long press to drag & reorder</Text>

      <DraggableFlatList
        data={items}
        onDragEnd={({ data }) => setItems(data)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        containerStyle={{ flex: 1 }}
      />

      {/* Bottom actions */}
      <View className="px-6 py-4 border-t border-[rgba(255,255,255,0.08)]">
        <View className="flex-row gap-3">
          <TouchableOpacity className="flex-1 bg-[#120824] border border-[rgba(255,255,255,0.08)] py-3 rounded-[12px] items-center" onPress={() => router.push('/(trip)/activities')}>
            <Text className=" text-[13px]" style={{ color: colors.text.primary }}>+ Add Activity</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-[#120824] border border-[rgba(255,255,255,0.08)] py-3 rounded-[12px] items-center" onPress={() => router.push('/(trip)/ai-itinerary')}>
            <Text className="text-[#6443F4] text-[13px]">AI Suggest</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="bg-[#6443F4] py-4 rounded-[12px] items-center mt-3" onPress={() => router.push('/(trip)/cart')}>
          <Text className=" text-[15px] font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Review & Book</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
