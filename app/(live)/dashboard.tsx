import { haptic } from '@/lib/haptics';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import Animated, { FadeInDown, useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useLiveStore } from '../../stores/liveStore';
import { activities } from '../../lib/mockData';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';
import { CachedImage } from '../../components/ui/CachedImage';

export default function LiveDashboardScreen() {
 const router = useRouter();
 const { isLive } = useLiveStore();
 const pulseOpacity = useSharedValue(1);

 useEffect(() => {
 pulseOpacity.value = withRepeat(withTiming(0.4, { duration: 1500 }), -1, true);
 }, []);

 const pulseStyle = useAnimatedStyle(() => ({ opacity: pulseOpacity.value }));

 const nextActivity = activities[0];
 const minutesUntilNext = 45;

 return (
 <ScrollView removeClippedSubviews={true} className="flex-1 bg-bg-primary" contentContainerClassName="pt-safe pb-24">
 {/* Live indicator */}
 <View className="px-6 flex-row items-center justify-between mb-6">
 <View className="flex-row items-center">
 <Animated.View style={pulseStyle} className="w-3 h-3 bg-status-error rounded-full mr-2" />
 <Text className="text-status-error text-body font-bold">LIVE</Text>
 </View>
 <Text className="text-white text-heading-3">Dubai Trip</Text>
 <TouchableOpacity onPress={() => router.push('/(live)/chat')}>
 <Ionicons name="chatbubble" size={24} color="#FFFFFF" />
 </TouchableOpacity>
 </View>

 {/* Countdown to next activity */}
 <Animated.View entering={FadeInDown.delay(100)} className="mx-6 bg-bg-card border border-border rounded-card p-4 mb-4">
 <Text className="text-text-muted text-caption mb-1">NEXT UP</Text>
 <View className="flex-row items-center justify-between">
 <View className="flex-1">
 <Text className="text-white text-heading-2">{nextActivity.name}</Text>
 <Text className="text-text-secondary text-body">{nextActivity.time} · {nextActivity.duration}</Text>
 </View>
 <View className="bg-primary w-16 h-16 rounded-full items-center justify-center">
 <Text className="text-white text-heading-3 font-bold">{minutesUntilNext}</Text>
 <Text className="text-white/70 text-caption">min</Text>
 </View>
 </View>
 <TouchableOpacity className="bg-primary/20 py-2 rounded-button items-center mt-3" onPress={() => router.push('/(live)/map')}>
 <Text className="text-primary text-body-sm font-semibold">Navigate</Text>
 </TouchableOpacity>
 </Animated.View>

 {/* Weather */}
 <Animated.View entering={FadeInDown.delay(200)} className="mx-6 bg-bg-card border border-border rounded-card p-4 mb-4 flex-row items-center justify-between">
 <View>
 <Text className="text-white text-heading-2">28°C</Text>
 <Text className="text-text-secondary text-body-sm">Sunny · Humidity 45%</Text>
 </View>
 <Ionicons name="sunny" size={24} color="#FFFFFF" />
 </Animated.View>

 {/* Quick Actions */}
 <Animated.View entering={FadeInDown.delay(300)} className="mx-6 mb-4">
 <Text className="text-white text-heading-3 mb-3">Quick Actions</Text>
 <View className="flex-row flex-wrap gap-2">
 {[
 { iconName: 'map', label: 'Map', route: '/(live)/map' },
 { iconName: 'cash', label: 'Expense', route: '/(live)/expenses' },
 { iconName: 'camera', label: 'Photo', route: '/(live)/memories' },
 { emoji: '', label: 'Tickets', route: '/(live)/checkin' },
 { iconName: 'alert-circle', label: 'Emergency', route: '/(live)/emergency' },
 { emoji: 'swap-horizontal', label: 'Currency', route: '/(trip)/currency' },
 ].map((action) => (
 <TouchableOpacity key={action.label} className="bg-bg-card border border-border rounded-card p-3 items-center w-[30%]" onPress={() => router.push(action.route as any)}>
 <Text className="text-2xl mb-1">{action.emoji}</Text>
 <Text className="text-text-secondary text-caption">{action.label}</Text>
 </TouchableOpacity>
 ))}
 </View>
 </Animated.View>

 {/* Today's Schedule */}
 <Animated.View entering={FadeInDown.delay(400)} className="mx-6">
 <Text className="text-white text-heading-3 mb-3">Today's Schedule</Text>
 {activities.slice(0, 4).map((act, i) => (
 <TouchableOpacity key={act.id} className="flex-row bg-bg-card border border-border rounded-card p-3 mb-2" onPress={() => router.push(`/(live)/activity/${act.id}`)}>
 <View className="w-8 h-8 bg-primary rounded-full items-center justify-center mr-3">
 <Text className="text-white text-body-sm font-bold">{i + 1}</Text>
 </View>
 <View className="flex-1">
 <Text className="text-white text-body font-semibold">{act.name}</Text>
 <Text className="text-text-secondary text-body-sm">{act.time} · {act.duration}</Text>
 </View>
 <View className="justify-center">
 {i === 0 ? (
 <View className="bg-status-success/20 px-2 py-1 rounded-full"><Text className="text-status-success text-caption">Next</Text></View>
 ) : i < 2 ? (
 <View className="bg-primary/20 px-2 py-1 rounded-full"><Text className="text-primary text-caption">Done checkmark</Text></View>
 ) : null}
 </View>
 </TouchableOpacity>
 ))}
 </Animated.View>
 </ScrollView>
 );
}
