import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

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
 <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <View className="flex-row items-center px-4 py-3">
 <TouchableOpacity onPress={() => router.back()}><Text className=" text-lg" style={{ color: colors.text.primary }}>←</Text></TouchableOpacity>
 <Text className="text-red-400 text-xl font-[Satoshi-Bold] ml-3">Emergency</Text>
 </View>
 <View className="mx-4 mb-4 p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
 <Text className="text-red-400 font-[Satoshi-Bold] text-center">Your location: Shinjuku, Tokyo, Japan</Text>
 </View>
 {emergencyNumbers.map(item => (
 <TouchableOpacity key={item.title} onPress={() => Linking.openURL(`tel:${item.number}`)} className="flex-row items-center mx-4 mb-2 p-4 bg-[#120824] rounded-2xl border border-white/[0.08]">
 <Text className="text-3xl mr-3">{item.emoji}</Text>
 <View className="flex-1">
 <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{item.title}</Text>
 <Text className="/40 text-xs" style={{ color: colors.text.primary }}>{item.desc}</Text>
 </View>
 <View className="bg-red-500 px-4 py-2 rounded-xl">
 <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Call</Text>
 </View>
 </TouchableOpacity>
 ))}
 <View className="mx-4 mt-4 mb-4">
 <Text className=" font-[Satoshi-Bold] text-lg mb-3" style={{ color: colors.text.primary }}>Quick Actions</Text>
 <View className="flex-row flex-wrap">
 {[
 { iconName: 'clipboard', title: 'Medical Info', desc: 'Your health card' },
 { iconName: 'map', title: 'Nearest Hospital', desc: 'Open in maps' },
 { iconName: 'call', title: 'Call Insurance', desc: 'Travel insurance' },
 { iconName: 'create', title: 'Report Incident', desc: 'File a report' },
 ].map(item => (
 <TouchableOpacity onPress={() => {}} key={item.title} className="w-[48%] m-[1%] p-4 bg-[#120824] rounded-2xl border border-white/[0.08]">
 <Text className="text-2xl mb-2">{item.emoji}</Text>
 <Text className=" font-[Satoshi-Bold] text-sm" style={{ color: colors.text.primary }}>{item.title}</Text>
 <Text className="/40 text-xs" style={{ color: colors.text.primary }}>{item.desc}</Text>
 </TouchableOpacity>
 ))}
 </View>
 </View>
 </ScrollView>
 );
}
