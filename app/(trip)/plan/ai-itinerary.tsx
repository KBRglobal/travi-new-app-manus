import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, FlatList} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

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
 <View className="flex-1 bg-bg-primary">
 <View className="flex-row items-center px-4 pt-12 pb-4">
 <TouchableOpacity onPress={() => { if (step > 1) setStep(step - 1); else router.back(); }} className="mr-3">
 <Text className="text-white text-lg">‹ Back</Text>
 </TouchableOpacity>
 <Text className="text-white text-xl font-bold">AI Itinerary Generator</Text>
 </View>

 <ScrollView className="flex-1 px-4">
 {step === 1 && (
 <View>
 <View className="items-center py-8">
 <Ionicons name="hardware-chip" size={24} color="#FFFFFF" />
 <Text className="text-white text-xl font-bold text-center">Let me plan your perfect Dubai trip</Text>
 </View>
 <Text className="text-text-secondary mb-2">Budget per day</Text>
 <View className="bg-bg-card rounded-input p-3 mb-4"><Text className="text-white">€150</Text></View>
 <Text className="text-text-secondary mb-2">Pace</Text>
 <View className="flex-row justify-between bg-bg-card rounded-input p-3 mb-4">
 <Text className="text-text-muted">Relaxed</Text>
 <Text className="text-primary">●────────</Text>
 <Text className="text-text-muted">Packed</Text>
 </View>
 <Text className="text-text-secondary mb-2">Priorities</Text>
 <View className="flex-row flex-wrap mb-4">
 {['Food', 'Culture', 'Adventure', 'Nightlife', 'Shopping', 'Nature'].map(p => (
 <TouchableOpacity key={p} className="bg-bg-card px-3 py-2 rounded-pill mr-2 mb-2" style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
 <Text className="text-text-secondary">{p}</Text>
 </TouchableOpacity>
 ))}
 </View>
 <Text className="text-text-secondary mb-2">Any must-haves?</Text>
 <TextInput className="bg-bg-card rounded-input p-3 text-white mb-6" placeholder="e.g. Desert safari, Burj Khalifa..." placeholderTextColor="rgba(255,255,255,0.3)" />
 <TouchableOpacity onPress={() => setStep(2)} className="bg-primary rounded-button py-4 items-center mb-8">
 <Text className="text-white font-bold text-lg">Generate My Itinerary →</Text>
 </TouchableOpacity>
 </View>
 )}

 {step === 2 && (
 <View className="items-center py-20">
 <Ionicons name="flask" size={24} color="#FFFFFF" />
 <Text className="text-white text-xl font-bold mb-4">Analyzing your Travel DNA...</Text>
 <Text className="text-primary mb-2">Finding 87% match activities...</Text>
 <Text className="text-text-secondary mb-6">Optimizing routes...</Text>
 <View className="bg-bg-card rounded-full h-3 w-64 overflow-hidden">
 <View className="bg-primary h-full rounded-full" style={{ width: '70%' }} />
 </View>
 <TouchableOpacity onPress={() => setStep(3)} className="mt-8"><Text className="text-primary">Skip →</Text></TouchableOpacity>
 </View>
 )}

 {step === 3 && (
 <View>
 <Text className="text-white text-lg font-bold mb-4">Day 1 — Cultural Immersion</Text>
 {AI_ACTIVITIES.map((act) => (
 <View key={act.name} className="bg-bg-card rounded-card p-4 mb-3">
 <View className="flex-row justify-between mb-1">
 <Text className="text-primary font-bold">{act.time}</Text>
 <Text className="text-white font-bold">{act.name}</Text>
 </View>
 <Text className="text-text-secondary text-sm mb-1">{act.reason}</Text>
 <Text className="text-primary text-sm mb-3">sparkles Why: "{act.dna}"</Text>
 <View className="flex-row">
 <TouchableOpacity onPress={() => setKept({ ...kept, [act.name]: true })} className={`flex-1 rounded-button py-2 items-center mr-2 ${kept[act.name] ? 'bg-green-600' : 'bg-bg-primary'}`}>
 <Text className="text-white font-semibold">{kept[act.name] ? 'Kept' : 'Keep checkmark'}</Text>
 </TouchableOpacity>
 <TouchableOpacity className="flex-1 bg-bg-primary rounded-button py-2 items-center ml-2">
 <Text className="text-text-secondary font-semibold">Swap ↺</Text>
 </TouchableOpacity>
 </View>
 </View>
 ))}
 <View className="flex-row mb-4">
 <TouchableOpacity className="flex-1 bg-bg-card rounded-button py-3 items-center mr-2" style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
 <Text className="text-text-secondary font-semibold">Regenerate Day</Text>
 </TouchableOpacity>
 <TouchableOpacity onPress={() => setStep(4)} className="flex-1 bg-primary rounded-button py-3 items-center ml-2">
 <Text className="text-white font-semibold">Accept All</Text>
 </TouchableOpacity>
 </View>
 </View>
 )}

 {step === 4 && (
 <View className="items-center py-8">
 <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
 <Text className="text-white text-2xl font-bold mb-4">Itinerary Ready!</Text>
 <View className="bg-bg-card rounded-card p-6 w-full mb-6">
 <Text className="text-text-secondary mb-1">5 days · 18 activities · est. €890</Text>
 <Text className="text-primary text-lg font-bold">DNA match score: 89% overall</Text>
 </View>
 <TouchableOpacity onPress={() => router.push('/(trip)/plan/itinerary')} className="bg-primary rounded-button py-4 items-center w-full mb-8">
 <Text className="text-white font-bold text-lg">Add to My Itinerary →</Text>
 </TouchableOpacity>
 </View>
 )}
 </ScrollView>
 </View>
 );
}
