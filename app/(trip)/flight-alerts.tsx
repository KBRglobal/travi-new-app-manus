import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Switch } from 'react-native';
import Animated, { FadeInDown, SlideInRight } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

const mockAlerts = [
 { id: '1', from: 'TLV', to: 'BCN', currentPrice: 120, targetPrice: 100, status: 'active', lastChecked: '2 min ago', trend: 'down' },
 { id: '2', from: 'TLV', to: 'LHR', currentPrice: 180, targetPrice: 150, status: 'active', lastChecked: '5 min ago', trend: 'up' },
 { id: '3', from: 'TLV', to: 'CDG', currentPrice: 95, targetPrice: 100, status: 'triggered', lastChecked: '1 min ago', trend: 'down' },
];

export default function FlightAlertsScreen() {
 const router = useRouter();
 const [showCreate, setShowCreate] = useState(false);
 const [from, setFrom] = useState('');
 const [to, setTo] = useState('');
 const [targetPrice, setTargetPrice] = useState('');

 return (
 <View className="flex-1 bg-bg-primary pt-safe">
 <View className="px-6 flex-row items-center justify-between mb-4">
 <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-xl">‹ Back</Text></TouchableOpacity>
 <Text className="text-white text-heading-3">Price Alerts</Text>
 <TouchableOpacity onPress={() => setShowCreate(true)}><Text className="text-primary text-body font-bold">+ New</Text></TouchableOpacity>
 </View>

 <FlatList
 ListEmptyComponent={() => <EmptyState emoji="" title="No price alerts" description="Set up alerts to track flight prices." />}
 data={mockAlerts}
 keyExtractor={(item) => item.id}
 contentContainerClassName="px-6 pb-24"
 renderItem={({ item, index }) => (
 <Animated.View entering={FadeInDown.delay(index * 100)}>
 <TouchableOpacity className={`bg-bg-card border rounded-card p-4 mb-3 ${item.status === 'triggered' ? 'border-status-success' : 'border-border'}`}>
 <View className="flex-row justify-between items-center mb-2">
 <View className="flex-row items-center">
 <Text className="text-white text-heading-3 font-bold">{item.from}</Text>
 <Text className="text-text-muted mx-2">→</Text>
 <Text className="text-white text-heading-3 font-bold">{item.to}</Text>
 </View>
 {item.status === 'triggered' ? (
 <View className="bg-status-success/20 px-3 py-1 rounded-full"><Text className="text-status-success text-caption font-bold">Price Drop!</Text></View>
 ) : (
 <View className="bg-primary/20 px-3 py-1 rounded-full"><Text className="text-primary text-caption">Watching</Text></View>
 )}
 </View>
 <View className="flex-row justify-between items-center">
 <View>
 <Text className="text-text-muted text-caption">Current</Text>
 <Text className={`text-heading-2 font-bold ${item.trend === 'down' ? 'text-status-success' : 'text-status-error'}`}>€{item.currentPrice}</Text>
 </View>
 <Text className="text-2xl">{item.trend === 'down' ? '' : ''}</Text>
 <View className="items-end">
 <Text className="text-text-muted text-caption">Target</Text>
 <Text className="text-white text-heading-2 font-bold">€{item.targetPrice}</Text>
 </View>
 </View>
 <Text className="text-text-muted text-caption mt-2">Last checked: {item.lastChecked}</Text>
 {item.status === 'triggered' && (
 <TouchableOpacity className="bg-status-success py-3 rounded-button items-center mt-3" onPress={() => router.push('/(trip)/flights')}>
 <Text className="text-white text-body font-bold">Book Now!</Text>
 </TouchableOpacity>
 )}
 </TouchableOpacity>
 </Animated.View>
 )}
 />

 {showCreate && (
 <Animated.View entering={SlideInRight} className="absolute bottom-0 left-0 right-0 bg-bg-primary border-t border-border rounded-t-3xl p-6 pb-safe">
 <View className="flex-row justify-between items-center mb-4">
 <Text className="text-white text-heading-3">New Alert</Text>
 <TouchableOpacity onPress={() => setShowCreate(false)}><Ionicons name="close" size={24} color="#FFFFFF" /></TouchableOpacity>
 </View>
 <TextInput className="bg-bg-card border border-border rounded-input text-white p-3 mb-3" placeholder="From (e.g. TLV)" placeholderTextColor="rgba(255,255,255,0.3)" value={from} onChangeText={setFrom} />
 <TextInput className="bg-bg-card border border-border rounded-input text-white p-3 mb-3" placeholder="To (e.g. BCN)" placeholderTextColor="rgba(255,255,255,0.3)" value={to} onChangeText={setTo} />
 <TextInput className="bg-bg-card border border-border rounded-input text-white p-3 mb-4" placeholder="Target price (€)" placeholderTextColor="rgba(255,255,255,0.3)" keyboardType="numeric" value={targetPrice} onChangeText={setTargetPrice} />
 <TouchableOpacity className="bg-primary py-4 rounded-button items-center" onPress={() => setShowCreate(false)}>
 <Text className="text-white text-body font-bold">Create Alert</Text>
 </TouchableOpacity>
 </Animated.View>
 )}
 </View>
 );
}
