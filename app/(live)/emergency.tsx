import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, FlatList} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function EmergencyScreen() {
 const router = useRouter();

 const emergencyNumbers = [
 { emoji: '', title: 'Local Emergency', number: '110', desc: 'Police' },
 { emoji: '', title: 'Ambulance', number: '119', desc: 'Medical emergency' },
 { emoji: '', title: 'Fire Department', number: '119', desc: 'Fire emergency' },
 { iconName: 'medkit', title: 'Nearest Hospital', number: '+81-3-1234-5678', desc: 'Tokyo General Hospital • 1.2 km' },
 { iconName: 'business', title: 'Embassy', number: '+81-3-3224-5000', desc: 'US Embassy Tokyo' },
 { iconName: 'alert-circle', title: 'TRAVI Emergency', number: '+1-800-TRAVI', desc: '24/7 traveler support' },
 ];

 return (
 <ScrollView className="flex-1 bg-bg-primary pt-safe">
 <View className="flex-row items-center px-4 py-3">
 <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
 <Text className="text-red-400 text-xl font-bold ml-3">Emergency</Text>
 </View>
 <View className="mx-4 mb-4 p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
 <Text className="text-red-400 font-bold text-center">Your location: Shinjuku, Tokyo, Japan</Text>
 </View>
 {emergencyNumbers.map(item => (
 <TouchableOpacity key={item.title} onPress={() => Linking.openURL(`tel:${item.number}`)} className="flex-row items-center mx-4 mb-2 p-4 bg-bg-secondary rounded-2xl border border-white/[0.08]">
 <Text className="text-3xl mr-3">{item.emoji}</Text>
 <View className="flex-1">
 <Text className="text-white font-bold">{item.title}</Text>
 <Text className="text-white/40 text-xs">{item.desc}</Text>
 </View>
 <View className="bg-red-500 px-4 py-2 rounded-xl">
 <Text className="text-white font-bold">Call</Text>
 </View>
 </TouchableOpacity>
 ))}
 <View className="mx-4 mt-4 mb-4">
 <Text className="text-white font-bold text-lg mb-3">Quick Actions</Text>
 <View className="flex-row flex-wrap">
 {[
 { iconName: 'clipboard', title: 'Medical Info', desc: 'Your health card' },
 { iconName: 'map', title: 'Nearest Hospital', desc: 'Open in maps' },
 { iconName: 'call', title: 'Call Insurance', desc: 'Travel insurance' },
 { iconName: 'create', title: 'Report Incident', desc: 'File a report' },
 ].map(item => (
 <TouchableOpacity key={item.title} className="w-[48%] m-[1%] p-4 bg-bg-secondary rounded-2xl border border-white/[0.08]">
 <Text className="text-2xl mb-2">{item.emoji}</Text>
 <Text className="text-white font-bold text-sm">{item.title}</Text>
 <Text className="text-white/40 text-xs">{item.desc}</Text>
 </TouchableOpacity>
 ))}
 </View>
 </View>
 </ScrollView>
 );
}
