import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const AI_ACTIVITIES = [
 { time: '09:00', name: 'Dubai Museum', reason: 'Based on your 78% History score', dna: 'Matches your cultural DNA perfectly' },
 { time: '11:30', name: 'Gold Souk', reason: 'A must for your Shopping dimension', dna: 'Top-rated by similar travelers' },
 { time: '14:00', name: 'Burj Khalifa', reason: 'Your Adventure score is 85%', dna: 'Iconic experience, 92% match' },
 { time: '17:00', name: 'Dubai Marina Walk', reason: 'Relaxation matches your pace', dna: 'Perfect sunset timing' },
];

export default function AIItinerary() {
 const router = useRouter();
 const [step, setStep] = useState(1);
 const [kept, setKept] = useState<Record<string, boolean>>({});

 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }}">
 <View className="flex-row items-center px-4 pt-12 pb-4">
 <TouchableOpacity onPress={() => { if (step > 1) setStep(step - 1); else router.back(); }} className="mr-3">
 <Text className=" text-lg" style={{ color: colors.text.primary }}>‹ Back</Text>
 </TouchableOpacity>
 <Text className=" text-xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>AI Itinerary Generator</Text>
 </View>

 <ScrollView className="flex-1 px-4">
 {step === 1 && (
 <View>
 <View className="items-center py-8">
 <Ionicons name="hardware-chip" size={24} color="#FFFFFF" />
 <Text className=" text-xl font-[Satoshi-Bold] text-center" style={{ color: colors.text.primary }}>Let me plan your perfect Dubai trip</Text>
 </View>
 <Text className="text-[rgba(255,255,255,0.6)] mb-2">Budget per day</Text>
 <View className="bg-[#120824] rounded-input p-3 mb-4"><Text className="" style={{ color: colors.text.primary }}>€150</Text></View>
 <Text className="text-[rgba(255,255,255,0.6)] mb-2">Pace</Text>
 <View className="flex-row justify-between bg-[#120824] rounded-input p-3 mb-4">
 <Text className="text-[rgba(255,255,255,0.3)]">Relaxed</Text>
 <Text className="text-[#6443F4]">●────────</Text>
 <Text className="text-[rgba(255,255,255,0.3)]">Packed</Text>
 </View>
 <Text className="text-[rgba(255,255,255,0.6)] mb-2">Priorities</Text>
 <View className="flex-row flex-wrap mb-4">
 {['Food', 'Culture', 'Adventure', 'Nightlife', 'Shopping', 'Nature'].map(p => (
 <TouchableOpacity onPress={() => {}} key={p} className="bg-[#120824] px-3 py-2 rounded-full mr-2 mb-2" style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
 <Text className="text-[rgba(255,255,255,0.6)]">{p}</Text>
 </TouchableOpacity>
 ))}
 </View>
 <Text className="text-[rgba(255,255,255,0.6)] mb-2">Any must-haves?</Text>
 <TextInput className="bg-[#120824] rounded-input p-3 text-white mb-6" placeholder="e.g. Desert safari, Burj Khalifa..." placeholderTextColor="rgba(255,255,255,0.3)" />
 <TouchableOpacity onPress={() => setStep(2)} className="bg-[#6443F4] rounded-[12px] py-4 items-center mb-8">
 <Text className=" font-[Satoshi-Bold] text-lg" style={{ color: colors.text.primary }}>Generate My Itinerary →</Text>
 </TouchableOpacity>
 </View>
 )}

 {step === 2 && (
 <View className="items-center py-20">
 <Ionicons name="flask" size={24} color="#FFFFFF" />
 <Text className=" text-xl font-[Satoshi-Bold] mb-4" style={{ color: colors.text.primary }}>Analyzing your Travel DNA...</Text>
 <Text className="text-[#6443F4] mb-2">Finding 87% match activities...</Text>
 <Text className="text-[rgba(255,255,255,0.6)] mb-6">Optimizing routes...</Text>
 <View className="bg-[#120824] rounded-full h-3 w-64 overflow-hidden">
 <View className="bg-[#6443F4] h-full rounded-full" style={{ width: '70%' }} />
 </View>
 <TouchableOpacity onPress={() => setStep(3)} className="mt-8"><Text className="text-[#6443F4]">Skip →</Text></TouchableOpacity>
 </View>
 )}

 {step === 3 && (
 <View>
 <Text className=" text-lg font-[Satoshi-Bold] mb-4" style={{ color: colors.text.primary }}>Day 1 — Cultural Immersion</Text>
 {AI_ACTIVITIES.map((act) => (
 <View key={act.name} className="bg-[#120824] rounded-[16px] p-4 mb-3">
 <View className="flex-row justify-between mb-1">
 <Text className="text-[#6443F4] font-[Satoshi-Bold]">{act.time}</Text>
 <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{act.name}</Text>
 </View>
 <Text className="text-[rgba(255,255,255,0.6)] text-sm mb-1">{act.reason}</Text>
 <Text className="text-[#6443F4] text-sm mb-3">sparkles Why: "{act.dna}"</Text>
 <View className="flex-row">
 <TouchableOpacity onPress={() => setKept({ ...kept, [act.name]: true })} className={`flex-1 rounded-[12px] py-2 items-center mr-2 ${kept[act.name] ? 'bg-green-600' : 'bg-bg-[#6443F4]'}`}>
 <Text className=" font-semibold" style={{ color: colors.text.primary }}>{kept[act.name] ? 'Kept' : 'Keep checkmark'}</Text>
 </TouchableOpacity>
 <TouchableOpacity onPress={() => {}} style={{ flex: 1, backgroundColor: colors.bg.primary }} rounded-[12px] py-2 items-center ml-2">
 <Text className="text-[rgba(255,255,255,0.6)] font-semibold">Swap ↺</Text>
 </TouchableOpacity>
 </View>
 </View>
 ))}
 <View className="flex-row mb-4">
 <TouchableOpacity className="flex-1 bg-[#120824] rounded-[12px] py-3 items-center mr-2" style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
 <Text className="text-[rgba(255,255,255,0.6)] font-semibold">Regenerate Day</Text>
 </TouchableOpacity>
 <TouchableOpacity onPress={() => setStep(4)} className="flex-1 bg-[#6443F4] rounded-[12px] py-3 items-center ml-2">
 <Text className=" font-semibold" style={{ color: colors.text.primary }}>Accept All</Text>
 </TouchableOpacity>
 </View>
 </View>
 )}

 {step === 4 && (
 <View className="items-center py-8">
 <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
 <Text className=" text-2xl font-[Satoshi-Bold] mb-4" style={{ color: colors.text.primary }}>Itinerary Ready!</Text>
 <View className="bg-[#120824] rounded-[16px] p-6 w-full mb-6">
 <Text className="text-[rgba(255,255,255,0.6)] mb-1">5 days · 18 activities · est. €890</Text>
 <Text className="text-[#6443F4] text-lg font-[Satoshi-Bold]">DNA match score: 89% overall</Text>
 </View>
 <TouchableOpacity onPress={() => router.push('/(trip)/plan/itinerary')} className="bg-[#6443F4] rounded-[12px] py-4 items-center w-full mb-8">
 <Text className=" font-[Satoshi-Bold] text-lg" style={{ color: colors.text.primary }}>Add to My Itinerary →</Text>
 </TouchableOpacity>
 </View>
 )}
 </ScrollView>
 </View>
 );
}
