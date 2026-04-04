import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const COWORKINGS = [
 { name: 'Hub71 Workspace', price: 15, rating: 4.7, wifi: 95, hours: '08:00-22:00' },
 { name: 'The Bureau', price: 20, rating: 4.5, wifi: 80, hours: '07:00-23:00' },
 { name: 'Nomad Cafe', price: 8, rating: 4.3, wifi: 60, hours: '09:00-20:00' },
];

const COMMUNITIES = [
 { name: 'Dubai Digital Nomads', platform: 'WhatsApp', members: '2.4k' },
 { name: 'Remote Workers UAE', platform: 'Facebook', members: '8.1k' },
 { name: 'Nomad Meetup Dubai', platform: 'Meetup', members: '1.2k' },
];

export default function DigitalNomadHub() {
 const router = useRouter();

 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }}">
 <View className="flex-row items-center px-4 pt-12 pb-4">
 <TouchableOpacity onPress={() => router.back()} className="mr-3">
 <Text className=" text-lg" style={{ color: colors.text.primary }}>‹ Back</Text>
 </TouchableOpacity>
 <Text className=" text-xl font-[Satoshi-Bold] flex-1" style={{ color: colors.text.primary }}>Digital Nomad Hub</Text>
 <TouchableOpacity><Text className="text-[#6443F4]">Dubai</Text></TouchableOpacity>
 </View>

 <ScrollView className="flex-1 px-4">
 <View className="bg-[#120824] rounded-[16px] p-6 mb-4">
 <Text className=" text-lg font-[Satoshi-Bold] mb-3" style={{ color: colors.text.primary }}>Nomad Score</Text>
 <View className="items-center mb-4">
 <Text className="text-[#6443F4] text-4xl font-[Satoshi-Bold]">8.4</Text>
 <Text className="text-[rgba(255,255,255,0.6)]">/ 10 — "Great for nomads"</Text>
 </View>
 {[
 ['Internet', '92 Mbps', ''],
 ['Cost of Living', '4.2/10 (affordable)', 'cash'],
 ['Nomad Population', '2,400/month', 'people'],
 ['Visa', 'Digital Nomad Visa available', 'id-card'],
 ['Weather', '28°C sunny', 'thermometer'],
 ['Safety', '8.1/10', ''],
 ].map(([label, value, icon]) => (
 <View key={label} className="flex-row justify-between py-2" style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' }}>
 <Text className="text-[rgba(255,255,255,0.6)]">{icon} {label}</Text>
 <Text className=" font-semibold" style={{ color: colors.text.primary }}>{value}</Text>
 </View>
 ))}
 </View>

 <Text className=" font-[Satoshi-Bold] text-lg mb-3" style={{ color: colors.text.primary }}>Coworking Spaces</Text>
 {COWORKINGS.map(cw => (
 <TouchableOpacity onPress={() => {}} key={cw.name} className="bg-[#120824] rounded-[16px] p-4 mb-2 flex-row justify-between items-center">
 <View>
 <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{cw.name}</Text>
 <Text className="text-[rgba(255,255,255,0.3)] text-sm">{cw.rating} · WiFi: {cw.wifi}mbps</Text>
 <Text className="text-[rgba(255,255,255,0.3)] text-sm">Open {cw.hours}</Text>
 </View>
 <View className="items-end">
 <Text className="text-[#6443F4] font-[Satoshi-Bold]">€{cw.price}/day</Text>
 <TouchableOpacity onPress={() => {}} className="bg-[#6443F4]/20 px-3 py-1 rounded-full mt-1">
 <Text className="text-[#6443F4] text-sm">Book →</Text>
 </TouchableOpacity>
 </View>
 </TouchableOpacity>
 ))}

 <Text className=" font-[Satoshi-Bold] text-lg mt-4 mb-3" style={{ color: colors.text.primary }}>Communities</Text>
 {COMMUNITIES.map(c => (
 <TouchableOpacity key={c.name} onPress={() => Linking.openURL('https://example.com')} className="bg-[#120824] rounded-[16px] p-4 mb-2 flex-row justify-between items-center">
 <View>
 <Text className=" font-semibold" style={{ color: colors.text.primary }}>{c.name}</Text>
 <Text className="text-[rgba(255,255,255,0.3)] text-sm">{c.platform} · {c.members} members</Text>
 </View>
 <Text className="text-[#6443F4] font-semibold">Join →</Text>
 </TouchableOpacity>
 ))}

 <Text className=" font-[Satoshi-Bold] text-lg mt-4 mb-3" style={{ color: colors.text.primary }}>Cost Breakdown</Text>
 <View className="bg-[#120824] rounded-[16px] p-4 mb-4">
 {[['Coffee', '€2'], ['Lunch', '€8'], ['Coworking/day', '€15'], ['Apartment/month', '€1,200']].map(([item, price]) => (
 <View key={item} className="flex-row justify-between py-2" style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' }}>
 <Text className="text-[rgba(255,255,255,0.6)]">{item}</Text>
 <Text className=" font-semibold" style={{ color: colors.text.primary }}>{price}</Text>
 </View>
 ))}
 </View>

 <TouchableOpacity onPress={() => {}} className="bg-[#6443F4] rounded-[12px] py-3 items-center mb-8">
 <Text className=" font-semibold" style={{ color: colors.text.primary }}>Find Remote Jobs →</Text>
 </TouchableOpacity>
 </ScrollView>
 </View>
 );
}
