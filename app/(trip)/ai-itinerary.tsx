import { haptic } from '@/lib/haptics';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

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
 <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }}" contentContainerClassName="pt-safe pb-24 px-6">
 <View className="flex-row items-center justify-between mb-6">
 <TouchableOpacity onPress={() => router.back()}><Text className=" text-xl" style={{ color: colors.text.primary }}>‹ Back</Text></TouchableOpacity>
 <Text className=" text-[18px]" style={{ color: colors.text.primary }}>AI Itinerary</Text>
 <View className="w-12" />
 </View>
 <Ionicons name="hardware-chip" size={24} color="#FFFFFF" />
 <Text className=" text-[22px] text-center mb-2" style={{ color: colors.text.primary }}>What do you love?</Text>
 <Text className="text-[rgba(255,255,255,0.6)] text-[15px] text-center mb-6">Select your preferences and I'll create the perfect itinerary</Text>
 <View className="flex-row flex-wrap gap-2 mb-6">
 {preferences.map((p) => (
 <TouchableOpacity key={p} className={`px-4 py-3 rounded-full border ${selectedPrefs.has(p) ? 'bg-[#6443F4] border-[#6443F4]' : 'border-[rgba(255,255,255,0.08)]'}`} onPress={() => togglePref(p)}>
 <Text className={`text-[13px] ${selectedPrefs.has(p) ? 'text-white font-semibold' : 'text-[rgba(255,255,255,0.6)]'}`}>{p}</Text>
 </TouchableOpacity>
 ))}
 </View>
 <Text className=" text-[18px] mb-3" style={{ color: colors.text.primary }}>Budget</Text>
 <View className="flex-row gap-2 mb-8">
 {(['low', 'medium', 'high'] as const).map((b) => (
 <TouchableOpacity key={b} className={`flex-1 py-3 rounded-[12px] items-center ${budget === b ? 'bg-[#6443F4]' : 'bg-[#120824] border border-[rgba(255,255,255,0.08)]'}`} onPress={() => setBudget(b)}>
 <Text className={`text-[13px] font-semibold ${budget === b ? 'text-white' : 'text-[rgba(255,255,255,0.6)]'}`}>{b === 'low' ? 'Budget' : b === 'medium' ? 'cash Mid' : 'cash Luxury'}</Text>
 </TouchableOpacity>
 ))}
 </View>
 <TouchableOpacity className="bg-[#6443F4] py-4 rounded-[12px] items-center" onPress={() => setStep(2)}>
 <Text className=" text-[15px] font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Generate Itinerary </Text>
 </TouchableOpacity>
 </ScrollView>
 );
 }

 if (step === 2) {
 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} items-center justify-center px-6">
 <ActivityIndicator size="large" color="#6443F4" />
 <Text className=" text-[18px] mt-6 mb-2" style={{ color: colors.text.primary }}>Creating your perfect trip...</Text>
 <Text className="text-[rgba(255,255,255,0.6)] text-[15px] text-center">Analyzing your DNA profile, preferences, and {selectedPrefs.size} interests</Text>
 <View className="mt-8 w-full">
 {['Checking weather patterns...', 'Finding hidden gems...', 'Optimizing routes...'].map((t, i) => (
 <Animated.View key={t} entering={FadeInUp.delay(i * 800)}>
 <Text className="text-[#6443F4] text-[13px] text-center mb-2">{t}</Text>
 </Animated.View>
 ))}
 </View>
 </View>
 );
 }

 return (
 <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }}" contentContainerClassName="pt-safe pb-24 px-6">
 <View className="flex-row items-center justify-between mb-6">
 <TouchableOpacity onPress={() => setStep(1)}><Text className=" text-xl" style={{ color: colors.text.primary }}>‹ Back</Text></TouchableOpacity>
 <Text className=" text-[18px]" style={{ color: colors.text.primary }}>Your Itinerary</Text>
 <TouchableOpacity onPress={() => router.push('/(trip)/itinerary')}><Text className="text-[#6443F4] text-[13px]">Edit</Text></TouchableOpacity>
 </View>

 <View className="bg-[#4ADE80]/20 border border-status-success rounded-[16px] p-3 mb-6">
 <Text className="text-[#4ADE80] text-[15px] font-semibold">AI-generated based on your DNA profile</Text>
 </View>

 {mockItinerary.map((day, di) => (
 <Animated.View key={day.day} entering={FadeInDown.delay(di * 150)} className="mb-6">
 <Text className=" text-[18px] mb-1" style={{ color: colors.text.primary }}>Day {day.day}: {day.title}</Text>
 {day.activities.map((act, ai) => (
 <View key={ai} className="flex-row bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-3 mb-2">
 <View className="w-14 items-center mr-3">
 <Text className="text-[#6443F4] text-[13px] font-[Satoshi-Bold]">{act.time}</Text>
 <Text className="text-[rgba(255,255,255,0.3)] text-[12px]">{act.duration}</Text>
 </View>
 <View className="flex-1"><Text className=" text-[15px]" style={{ color: colors.text.primary }}>{act.name}</Text></View>
 </View>
 ))}
 </Animated.View>
 ))}

 <View className="flex-row gap-3">
 <TouchableOpacity className="flex-1 bg-[#120824] border border-[rgba(255,255,255,0.08)] py-4 rounded-[12px] items-center" onPress={() => setStep(1)}>
 <Text className=" text-[13px]" style={{ color: colors.text.primary }}>Regenerate</Text>
 </TouchableOpacity>
 <TouchableOpacity className="flex-1 bg-[#6443F4] py-4 rounded-[12px] items-center" onPress={() => router.push('/(trip)/itinerary')}>
 <Text className=" text-[13px] font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Accept</Text>
 </TouchableOpacity>
 </View>
 </ScrollView>
 );
}
