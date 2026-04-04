import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

export default function PreTripDashboard() {
 const router = useRouter();
 const { tripId } = useLocalSearchParams();

 const quickCards = [
 { iconName: 'clipboard', label: 'Checklist', route: `/(trip)/pre/${tripId}/checklist` },
 { icon: '', label: 'Documents', route: `/(trip)/pre/${tripId}/documents` },
 { icon: 'id-card', label: 'Visa & Entry', route: `/(trip)/pre/${tripId}/visa`, isNew: true },
 { iconName: 'airplane', label: 'Flight Status', route: `/(trip)/pre/${tripId}/flight-status`, isNew: true },
 ];

 return (
 <View className="flex-1 bg-bg-primary">
 <View className="flex-row items-center px-4 pt-12 pb-4">
 <TouchableOpacity onPress={() => router.back()} className="mr-3">
 <Text className="text-white text-lg">‹ Back</Text>
 </TouchableOpacity>
 <Text className="text-white text-xl font-bold">Pre-Trip Dashboard</Text>
 </View>

 <ScrollView removeClippedSubviews={true} className="flex-1 px-4">
 <View className="bg-bg-card rounded-card p-6 mb-4">
 <Text className="text-white text-2xl font-bold mb-1">Dubai Adventure</Text>
 <Text className="text-primary">Departing in 5 days</Text>
 <Text className="text-text-secondary mt-1">April 10 - April 17, 2026</Text>
 </View>

 <Text className="text-white font-bold text-lg mb-3">Quick Access</Text>
 <View className="flex-row flex-wrap mb-6">
 {quickCards.map(card => (
 <TouchableOpacity key={card.label} onPress={() => router.push(card.route as any)} className="bg-bg-card rounded-card p-4 items-center" style={{ width: '48%', marginRight: '2%', marginBottom: 8 }}>
 <Text className="text-2xl mb-2">{card.icon}</Text>
 <Text className="text-white font-semibold">{card.label}</Text>
 {card.isNew && (
 <View className="bg-pink px-2 py-0.5 rounded-pill mt-1">
 <Text className="text-white text-xs font-bold">NEW</Text>
 </View>
 )}
 </TouchableOpacity>
 ))}
 </View>

 <Text className="text-white font-bold text-lg mb-3">Trip Progress</Text>
 <View className="bg-bg-card rounded-card p-4 mb-4">
 {['Book flights', 'Book hotel', 'Pack essentials', 'Download maps'].map((task, i) => (
 <View key={task} className="flex-row items-center py-2" style={{ borderBottomWidth: i < 3 ? 1 : 0, borderBottomColor: 'rgba(255,255,255,0.05)' }}>
 <View className={`w-5 h-5 rounded-full mr-3 items-center justify-center ${i < 2 ? 'bg-green-500' : 'bg-bg-primary border border-text-muted'}`}>
 {i < 2 && <Ionicons name="checkmark" size={24} color="#FFFFFF" />}
 </View>
 <Text className={i < 2 ? 'text-text-muted line-through' : 'text-white'}>{task}</Text>
 </View>
 ))}
 </View>

 <TouchableOpacity onPress={() => router.push(`/(live)/${tripId}` as any)} className="bg-primary rounded-button py-4 items-center mb-8">
 <Text className="text-white font-bold text-lg">Start Trip →</Text>
 </TouchableOpacity>
 </ScrollView>
 </View>
 );
}
