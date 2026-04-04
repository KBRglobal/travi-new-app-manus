import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function UserProfileScreen() {
 const router = useRouter();
 const { userId } = useLocalSearchParams();
 const [isConnected, setIsConnected] = useState(false);

 const user = { name: 'Sarah K.', avatar: 'person', bio: 'Foodie traveler exploring the world one bite at a time', trips: 8, countries: 12, reviews: 23, dna: ['Food 95%', 'Culture 88%', 'Adventure 72%'], badges: ['Top Reviewer', 'Globe Trotter', 'Foodie Master'] };

 return (
 <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <View className="flex-row items-center justify-between px-4 py-3">
 <TouchableOpacity onPress={() => router.back()}><Text className=" text-lg" style={{ color: colors.text.primary }}>←</Text></TouchableOpacity>
 <TouchableOpacity><Text className="/40 text-xl" style={{ color: colors.text.primary }}>···</Text></TouchableOpacity>
 </View>
 <View className="items-center py-6">
 <Text className="text-7xl mb-3">{user.avatar}</Text>
 <Text className=" text-2xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{user.name}</Text>
 <Text className="/60 text-sm text-center px-8 mt-2" style={{ color: colors.text.primary }}>{user.bio}</Text>
 </View>
 <View className="flex-row justify-around mx-4 mb-6 p-4 bg-[#120824] rounded-2xl border border-white/[0.08]">
 <View className="items-center"><Text className=" text-xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{user.trips}</Text><Text className="/40 text-xs" style={{ color: colors.text.primary }}>Trips</Text></View>
 <View className="items-center"><Text className=" text-xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{user.countries}</Text><Text className="/40 text-xs" style={{ color: colors.text.primary }}>Countries</Text></View>
 <View className="items-center"><Text className=" text-xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{user.reviews}</Text><Text className="/40 text-xs" style={{ color: colors.text.primary }}>Reviews</Text></View>
 </View>
 <View className="flex-row mx-4 mb-6">
 <TouchableOpacity onPress={() => setIsConnected(!isConnected)} className={`flex-1 mr-2 py-3 rounded-2xl items-center ${isConnected ? 'bg-white/[0.05] border border-white/[0.08]' : 'bg-[#6443F4]'}`}>
 <Text className={`font-[Satoshi-Bold] ${isConnected ? 'text-white/60' : 'text-white'}`}>{isConnected ? 'Connected' : 'Connect'}</Text>
 </TouchableOpacity>
 <TouchableOpacity onPress={() => router.push(`/(social)/messages/${userId}`)} className="flex-1 mx-1 py-3 rounded-2xl items-center bg-white/[0.05] border border-white/[0.08]">
 <Text className="/80 font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Message</Text>
 </TouchableOpacity>
 <TouchableOpacity onPress={() => router.push(`/(social)/compatibility/${userId}`)} className="flex-1 ml-2 py-3 rounded-2xl items-center bg-white/[0.05] border border-white/[0.08]">
 <Text className="/80 font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>DNA</Text>
 </TouchableOpacity>
 </View>
 <View className="mx-4 mb-4">
 <Text className=" font-[Satoshi-Bold] text-lg mb-3" style={{ color: colors.text.primary }}>Travel DNA</Text>
 <View className="flex-row flex-wrap">
 {user.dna.map(d => <View key={d} className="bg-[#6443F4]/20 px-3 py-1.5 rounded-full mr-2 mb-2"><Text className="text-[#6443F4] text-sm">{d}</Text></View>)}
 </View>
 </View>
 <View className="mx-4 mb-8">
 <Text className=" font-[Satoshi-Bold] text-lg mb-3" style={{ color: colors.text.primary }}>Badges</Text>
 <View className="flex-row flex-wrap">
 {user.badges.map(b => <View key={b} className="bg-[#120824] px-3 py-2 rounded-xl mr-2 mb-2 border border-white/[0.08]"><Text className="/80 text-sm" style={{ color: colors.text.primary }}>{b}</Text></View>)}
 </View>
 </View>
 </ScrollView>
 );
}
