import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

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
 <View className="flex-1 bg-bg-primary">
 <ScrollView className="flex-1 px-4 pt-12">
 <View className="items-center mb-6">
 <View className="w-20 h-20 bg-primary rounded-full items-center justify-center mb-3">
 <Text className="text-white text-3xl font-bold">U</Text>
 </View>
 <Text className="text-white text-xl font-bold">User Name</Text>
 <Text className="text-text-secondary">Explorer · 23 countries visited</Text>
 </View>

 <View className="flex-row justify-around bg-bg-card rounded-card p-4 mb-6">
 {[['12', 'Trips'], ['23', 'Countries'], ['12.5K', 'Points']].map(([num, label]) => (
 <View key={label} className="items-center">
 <Text className="text-white font-bold text-lg">{num}</Text>
 <Text className="text-text-muted text-sm">{label}</Text>
 </View>
 ))}
 </View>

 {menuItems.map(item => (
 <TouchableOpacity key={item.label} onPress={() => router.push(item.route as any)} className="bg-bg-card rounded-card p-4 mb-2 flex-row items-center justify-between">
 <View className="flex-row items-center">
 <Text className="text-xl mr-3">{item.icon}</Text>
 <Text className="text-white font-semibold">{item.label}</Text>
 {item.isNew && (
 <View className="bg-pink ml-2 px-2 py-0.5 rounded-pill">
 <Text className="text-white text-xs font-bold">NEW</Text>
 </View>
 )}
 </View>
 <Text className="text-text-muted">›</Text>
 </TouchableOpacity>
 ))}

 <TouchableOpacity className="py-4 items-center mt-4 mb-8">
 <Text className="text-red-400 font-semibold">Log Out</Text>
 </TouchableOpacity>
 </ScrollView>
 </View>
 );
}
