import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const stops = [
 { id: 'rt1', name: 'Barcelona', type: 'Start', km: 0, audioStory: true },
 { id: 'rt2', name: 'Montserrat Monastery', type: 'Scenic', km: 60, audioStory: true },
 { id: 'rt3', name: 'Tarragona', type: 'Historic', km: 100, audioStory: false },
 { id: 'rt4', name: 'Peñíscola Castle', type: 'Castle', km: 230, audioStory: true },
 { id: 'rt5', name: 'Valencia', type: 'City', km: 350, audioStory: false },
];

export default function RoadTripScreen() {
 const router = useRouter();
 const [currentStop, setCurrentStop] = useState(1);
 const [audioPlaying, setAudioPlaying] = useState(false);

 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }}">
 {/* Map area */}
 <View className="h-[40%] bg-[#120824] items-center justify-center">
 
 <Text className=" text-[18px]" style={{ color: colors.text.primary }}>Road Trip Route</Text>
 <Text className="text-[rgba(255,255,255,0.6)] text-[13px] mt-1">Barcelona → Valencia · 350 km</Text>
 <View className="absolute bottom-4 left-6 right-6 flex-row justify-between">
 {stops.map((s, i) => (
 <View key={s.id} className={`w-8 h-8 rounded-full items-center justify-center ${i <= currentStop ? 'bg-[#6443F4]' : 'bg-bg-surface'}`}>
 <Text className=" text-[12px] font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{i + 1}</Text>
 </View>
 ))}
 </View>
 </View>

 <TouchableOpacity className="absolute top-14 left-6 bg-bg-overlay w-10 h-10 rounded-full items-center justify-center" onPress={() => router.back()}>
 <Text className=" text-lg" style={{ color: colors.text.primary }}>‹</Text>
 </TouchableOpacity>

 {/* Stops list */}
 <ScrollView className="flex-1" contentContainerClassName="px-6 py-4 pb-24">
 <Text className=" text-[18px] mb-4" style={{ color: colors.text.primary }}>Stops</Text>
 {stops.map((stop, i) => (
 <Animated.View key={stop.id} entering={FadeInDown.delay(i * 100)}>
 <View className={`flex-row bg-[#120824] border rounded-[16px] p-4 mb-3 ${i === currentStop ? 'border-[#6443F4]' : i < currentStop ? 'border-status-success' : 'border-[rgba(255,255,255,0.08)]'}`}>
 <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${i <= currentStop ? 'bg-[#6443F4]' : 'bg-bg-surface'}`}>
 <Text className=" text-[15px] font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{i + 1}</Text>
 </View>
 <View className="flex-1">
 <Text className=" text-[15px] font-semibold" style={{ color: colors.text.primary }}>{stop.name}</Text>
 <Text className="text-[rgba(255,255,255,0.6)] text-[13px]">{stop.type} · {stop.km} km</Text>
 </View>
 <View className="justify-center items-end">
 {i < currentStop && <Text className="text-[#4ADE80] text-[13px]">Visited</Text>}
 {i === currentStop && <Text className="text-[#6443F4] text-[13px] font-[Satoshi-Bold]">→ Next</Text>}
 {stop.audioStory && (
 <TouchableOpacity className="mt-1" onPress={() => setAudioPlaying(!audioPlaying)}>
 <Text className="text-pink text-[12px]">{audioPlaying && i === currentStop ? '⏸ Playing' : 'Story'}</Text>
 </TouchableOpacity>
 )}
 </View>
 </View>
 </Animated.View>
 ))}
 </ScrollView>

 {/* Audio player bar */}
 {audioPlaying && (
 <View className="absolute bottom-0 left-0 right-0 bg-[#120824] border-t border-[rgba(255,255,255,0.08)] p-4 pb-safe flex-row items-center">
 <TouchableOpacity onPress={() => setAudioPlaying(false)}><Text className="text-2xl mr-3">⏸</Text></TouchableOpacity>
 <View className="flex-1">
 <Text className=" text-[13px] font-semibold" style={{ color: colors.text.primary }}>The History of Montserrat</Text>
 <View className="h-1 bg-bg-surface rounded-full mt-1"><View className="w-1/3 h-full bg-[#6443F4] rounded-full" /></View>
 </View>
 <Text className="text-[rgba(255,255,255,0.3)] text-[12px] ml-3">2:45 / 8:30</Text>
 </View>
 )}
 </View>
 );
}
