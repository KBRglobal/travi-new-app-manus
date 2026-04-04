import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { currentUser } from '../../lib/mockData';
import { useAuthStore } from '../../stores/authStore';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';
import { CachedImage } from '../../components/ui/CachedImage';

export default function ProfileScreen() {
 const router = useRouter();
 const { setAuthenticated } = useAuthStore();

 const menuItems = [
 { iconName: 'flask', label: 'My Travel DNA', route: '/(trip)/dna-profile' },
 { iconName: 'airplane', label: 'My Trips', route: '/(tabs)/trips' },
 { iconName: 'cash', label: 'Wallet', route: '/(tabs)/wallet' },
 { iconName: 'star', label: 'Points & Rewards', route: '/(tabs)/points' },
 { iconName: 'trophy', label: 'Membership', route: '/(trip)/membership' },
 { iconName: 'map', label: 'Adventure Log', route: '/(trip)/adventure-log' },
 { iconName: 'people', label: 'Referrals', route: '/(trip)/referral' },
 { iconName: 'settings', label: 'Settings', route: '/(trip)/settings' },
 { emoji: 'help-circle', label: 'Help & Support', route: '/(trip)/support' },
 ];

 return (
 <ScrollView className="flex-1 bg-bg-primary" contentContainerClassName="pt-safe pb-24">
 {/* Profile Header */}
 <Animated.View entering={FadeInDown} className="items-center px-6 mb-6">
 <CachedImage source={{ uri: currentUser.avatar }} className="w-24 h-24 rounded-full mb-3 border-2 border-primary" />
 <Text className="text-white text-heading-2">{currentUser.firstName} {currentUser.lastName}</Text>
 <Text className="text-text-secondary text-body">Member since {currentUser.memberSince}</Text>
 </Animated.View>

 {/* Stats */}
 <View className="flex-row px-6 mb-6">
 {[
 { value: currentUser.tripsCompleted, label: 'Trips' },
 { value: currentUser.countriesVisited, label: 'Countries' },
 { value: '12.5K', label: 'Points' },
 ].map((stat) => (
 <View key={stat.label} className="flex-1 bg-bg-card border border-border rounded-card py-3 items-center mr-2">
 <Text className="text-white text-heading-3 font-bold">{stat.value}</Text>
 <Text className="text-text-muted text-caption">{stat.label}</Text>
 </View>
 ))}
 </View>

 {/* Menu */}
 <View className="px-6">
 {menuItems.map((item, i) => (
 <Animated.View key={item.label} entering={FadeInDown.delay(i * 50)}>
 <TouchableOpacity className="flex-row items-center py-4 border-b border-border" onPress={() => router.push(item.route as any)}>
 <Text className="text-xl mr-4">{item.emoji}</Text>
 <Text className="text-white text-body flex-1">{item.label}</Text>
 <Text className="text-text-muted">›</Text>
 </TouchableOpacity>
 </Animated.View>
 ))}

 {/* Logout */}
 <TouchableOpacity className="flex-row items-center py-4 mt-4" onPress={() => { setAuthenticated(false); router.replace('/(auth)/welcome'); }}>
 <Ionicons name="log-out" size={24} color="#FFFFFF" />
 <Text className="text-status-error text-body">Log Out</Text>
 </TouchableOpacity>
 </View>
 </ScrollView>
 );
}
