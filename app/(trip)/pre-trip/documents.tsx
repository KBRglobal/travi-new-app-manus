import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

const DOCUMENTS = [
 { id: '1', emoji: 'id-card', title: 'Passport', status: 'Valid', detail: 'Expires Dec 2028', color: 'text-green-400' },
 { id: '2', iconName: 'clipboard', title: 'Japan eVisa', status: 'Approved', detail: 'Valid Apr 10 - May 10', color: 'text-green-400' },
 { id: '3', iconName: 'medkit', title: 'Travel Insurance', status: 'Active', detail: 'World Nomads • Policy #WN-12345', color: 'text-green-400' },
 { id: '4', iconName: 'airplane', title: 'Flight Ticket', status: 'Confirmed', detail: 'AA 123 • Apr 15, 10:30 AM', color: 'text-green-400' },
 { id: '5', iconName: 'bed', title: 'Hotel Booking', status: 'Confirmed', detail: 'Hotel Shinjuku • 7 nights', color: 'text-green-400' },
 { id: '6', emoji: '', title: 'Vaccination Record', status: 'Not Required', detail: 'No vaccinations needed for Japan', color: 'text-white/40' },
];

export default function DocumentsScreen() {
 const router = useRouter();

 return (
 <ScrollView removeClippedSubviews={true} className="flex-1 bg-bg-primary pt-safe">
 <View className="flex-row items-center px-4 py-3">
 <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
 <Text className="text-white text-xl font-bold ml-3">Travel Documents</Text>
 </View>
 <View className="mx-4 mb-4 p-4 bg-green-500/10 rounded-2xl border border-green-500/20">
 <Text className="text-green-400 font-bold text-center">All documents ready for your trip!</Text>
 </View>
 {DOCUMENTS.map(doc => (
 <TouchableOpacity key={doc.id} className="flex-row items-center mx-4 mb-2 p-4 bg-bg-secondary rounded-2xl border border-white/[0.08]">
 <Text className="text-2xl mr-3">{doc.emoji}</Text>
 <View className="flex-1">
 <Text className="text-white font-bold">{doc.title}</Text>
 <Text className="text-white/40 text-xs">{doc.detail}</Text>
 </View>
 <Text className={`text-xs font-bold ${doc.color}`}>{doc.status}</Text>
 </TouchableOpacity>
 ))}
 <TouchableOpacity className="mx-4 mt-4 mb-8 p-4 bg-bg-secondary rounded-2xl border border-dashed border-white/[0.15] items-center">
 <Ionicons name="attach" size={24} color="#FFFFFF" />
 <Text className="text-white/60 text-sm">Add Document</Text>
 </TouchableOpacity>
 </ScrollView>
 );
}
