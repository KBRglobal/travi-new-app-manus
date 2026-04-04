import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
 const router = useRouter();

 const menuItems = [
 { iconName: 'airplane', label: 'My Trips', route: '/(tabs)/home/trips' },
 { iconName: 'map', label: 'Adventure Log', route: '/(trip)/profile/adventure-log', isNew: true },
 { iconName: 'cash', label: 'Wallet', route: '/(tabs)/wallet' },
 { iconName: 'star', label: 'Points & Rewards', route: '/(tabs)/points' },
 { iconName: 'flask', label: 'Travel DNA', route: '/(trip)/dna/results' },
 { iconName: 'people', label: 'Social', route: '/(tabs)/social' },
 { iconName: 'settings', label: 'Settings', route: '/(trip)/settings' },
 { icon: 'help-circle', label: 'Help & Support', route: '/(trip)/settings/help' },
 ];

 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }}">
 <ScrollView className="flex-1 px-4 pt-12">
 <View className="items-center mb-6">
 <View className="w-20 h-20 bg-[#6443F4] rounded-full items-center justify-center mb-3">
 <Text className=" text-3xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>U</Text>
 </View>
 <Text className=" text-xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>User Name</Text>
 <Text className="text-[rgba(255,255,255,0.6)]">Explorer · 23 countries visited</Text>
 </View>

 <View className="flex-row justify-around bg-[#120824] rounded-[16px] p-4 mb-6">
 {[['12', 'Trips'], ['23', 'Countries'], ['12.5K', 'Points']].map(([num, label]) => (
 <View key={label} className="items-center">
 <Text className=" font-[Satoshi-Bold] text-lg" style={{ color: colors.text.primary }}>{num}</Text>
 <Text className="text-[rgba(255,255,255,0.3)] text-sm">{label}</Text>
 </View>
 ))}
 </View>

 {menuItems.map(item => (
 <TouchableOpacity key={item.label} onPress={() => router.push(item.route as any)} className="bg-[#120824] rounded-[16px] p-4 mb-2 flex-row items-center justify-between">
 <View className="flex-row items-center">
 <Text className="text-xl mr-3">{item.icon}</Text>
 <Text className=" font-semibold" style={{ color: colors.text.primary }}>{item.label}</Text>
 {item.isNew && (
 <View className="bg-pink ml-2 px-2 py-0.5 rounded-full">
 <Text className=" text-xs font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>NEW</Text>
 </View>
 )}
 </View>
 <Text className="text-[rgba(255,255,255,0.3)]">›</Text>
 </TouchableOpacity>
 ))}

 <TouchableOpacity onPress={() => {}} className="py-4 items-center mt-4 mb-8">
 <Text className="text-red-400 font-semibold">Log Out</Text>
 </TouchableOpacity>
 </ScrollView>
 </View>
 );
}
