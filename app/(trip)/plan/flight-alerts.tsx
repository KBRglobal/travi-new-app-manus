import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const MOCK_ALERTS = [
 { id: '1', origin: 'TLV', dest: 'DXB', originFlag: '🇮🇱', destFlag: '🇦🇪', current: 189, threshold: 200, status: 'watching', lastChecked: '2h ago', dnaMatch: 87 },
 { id: '2', origin: 'TLV', dest: 'LHR', originFlag: '🇮🇱', destFlag: '🇬🇧', current: 156, threshold: 180, status: 'dropped', lastChecked: '30m ago', dnaMatch: 72 },
 { id: '3', origin: 'TLV', dest: 'CDG', originFlag: '🇮🇱', destFlag: '🇫🇷', current: 220, threshold: 200, status: 'paused', lastChecked: '1d ago', dnaMatch: 91 },
];

const STATUS_STYLES: Record<string, { border: string; badge: string; badgeText: string }> = {
 watching: { border: '#3B82F6', badge: '#3B82F6', badgeText: 'Watching' },
 dropped: { border: '#22C55E', badge: '#22C55E', badgeText: 'Price Dropped!' },
 at_limit: { border: '#F59E0B', badge: '#F59E0B', badgeText: 'At your limit' },
 paused: { border: '#6B7280', badge: '#6B7280', badgeText: 'Paused' },
 expired: { border: '#4B5563', badge: '#4B5563', badgeText: 'Trip date passed' },
};

export default function FlightPriceAlerts() {
 const router = useRouter();
 const [showNewAlert, setShowNewAlert] = useState(false);

 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }}">
 <View className="flex-row items-center px-4 pt-12 pb-4">
 <TouchableOpacity onPress={() => router.back()} className="mr-3">
 <Text className=" text-lg" style={{ color: colors.text.primary }}>‹ Back</Text>
 </TouchableOpacity>
 <Text className=" text-xl font-[Satoshi-Bold] flex-1" style={{ color: colors.text.primary }}>Flight Price Alerts</Text>
 <TouchableOpacity onPress={() => setShowNewAlert(true)} className="bg-[#6443F4] px-4 py-2 rounded-[12px]">
 <Text className=" font-semibold" style={{ color: colors.text.primary }}>+ New Alert</Text>
 </TouchableOpacity>
 </View>

 <ScrollView className="flex-1 px-4">
 {MOCK_ALERTS.map((alert) => {
 const style = STATUS_STYLES[alert.status] || STATUS_STYLES.watching;
 return (
 <TouchableOpacity
 key={alert.id}
 onPress={() => {
 if (alert.status === 'dropped') router.push('/(trip)/plan/flights');
 }}
 className="bg-[#120824] rounded-[16px] p-4 mb-3"
 style={{ borderLeftWidth: 4, borderLeftColor: style.border }}
 >
 <View className="flex-row justify-between items-center mb-2">
 <Text className=" text-lg font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>
 {alert.originFlag} {alert.origin} → {alert.destFlag} {alert.dest}
 </Text>
 <View style={{ backgroundColor: style.badge }} className="px-2 py-1 rounded-full">
 <Text className=" text-xs font-semibold" style={{ color: colors.text.primary }}>{style.badgeText}</Text>
 </View>
 </View>
 <View className="flex-row justify-between mb-1">
 <Text className="text-[rgba(255,255,255,0.6)]">Current: €{alert.current}</Text>
 <Text className="text-[rgba(255,255,255,0.6)]">Your limit: €{alert.threshold}</Text>
 </View>
 <View className="flex-row justify-between">
 <Text className="text-[rgba(255,255,255,0.3)] text-xs">Last checked: {alert.lastChecked}</Text>
 <Text className="text-[#6443F4] text-xs">sparkles {alert.dnaMatch}% Match</Text>
 </View>
 {alert.status === 'dropped' && (
 <TouchableOpacity onPress={() => router.push('/(trip)/plan/flights')} className="mt-2 bg-[#6443F4]/20 rounded-[12px] py-2 items-center">
 <Text className="text-[#6443F4] font-semibold">View Flights →</Text>
 </TouchableOpacity>
 )}
 </TouchableOpacity>
 );
 })}
 </ScrollView>

 {showNewAlert && (
 <View className="absolute bottom-0 left-0 right-0 bg-[#120824] rounded-t-modal p-6" style={{ paddingBottom: 40 }}>
 <View className="flex-row justify-between items-center mb-4">
 <Text className=" text-lg font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>New Price Alert</Text>
 <TouchableOpacity onPress={() => setShowNewAlert(false)}>
 <Ionicons name="close" size={24} color="#FFFFFF" />
 </TouchableOpacity>
 </View>
 <Text className="text-[rgba(255,255,255,0.6)] mb-2">Route</Text>
 <View className="flex-row mb-3">
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} rounded-input p-3 mr-2"><Text className="text-[rgba(255,255,255,0.3)]">Origin</Text></View>
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} rounded-input p-3"><Text className="text-[rgba(255,255,255,0.3)]">Destination</Text></View>
 </View>
 <Text className="text-[rgba(255,255,255,0.6)] mb-2">Date Range</Text>
 <View className="flex-row mb-3">
 <TouchableOpacity onPress={() => {}} className="bg-[#6443F4]/20 px-3 py-2 rounded-full mr-2"><Text className="text-[#6443F4]">Flexible</Text></TouchableOpacity>
 <TouchableOpacity onPress={() => {}} className="bg-bg-[#6443F4] px-3 py-2 rounded-full"><Text className="text-[rgba(255,255,255,0.6)]">Fixed dates</Text></TouchableOpacity>
 </View>
 <Text className="text-[rgba(255,255,255,0.6)] mb-2">My price limit</Text>
 <TextInput className="bg-bg-[#6443F4] rounded-input p-3 text-white mb-3" placeholder="€___" placeholderTextColor="rgba(255,255,255,0.3)" keyboardType="numeric" />
 <Text className="text-[rgba(255,255,255,0.6)] mb-2">Class</Text>
 <View className="flex-row mb-3">
 <TouchableOpacity onPress={() => {}} className="bg-[#6443F4]/20 px-3 py-2 rounded-full mr-2"><Text className="text-[#6443F4]">Economy</Text></TouchableOpacity>
 <TouchableOpacity onPress={() => {}} className="bg-bg-[#6443F4] px-3 py-2 rounded-full"><Text className="text-[rgba(255,255,255,0.6)]">Business</Text></TouchableOpacity>
 </View>
 <Text className="text-[rgba(255,255,255,0.6)] mb-2">Alert when</Text>
 <View className="flex-row mb-4 flex-wrap">
 <TouchableOpacity className="bg-[#6443F4]/20 px-3 py-2 rounded-full mr-2 mb-2"><Text className="text-[#6443F4]">Below my limit</Text></TouchableOpacity>
 <TouchableOpacity className="bg-bg-[#6443F4] px-3 py-2 rounded-full mr-2 mb-2"><Text className="text-[rgba(255,255,255,0.6)]">Drops 20%</Text></TouchableOpacity>
 <TouchableOpacity className="bg-bg-[#6443F4] px-3 py-2 rounded-full mb-2"><Text className="text-[rgba(255,255,255,0.6)]">Lowest in 30 days</Text></TouchableOpacity>
 </View>
 <TouchableOpacity className="bg-[#6443F4] rounded-[12px] py-4 items-center" onPress={() => setShowNewAlert(false)}>
 <Text className=" font-[Satoshi-Bold] text-lg" style={{ color: colors.text.primary }}>Set Alert</Text>
 </TouchableOpacity>
 </View>
 )}
 </View>
 );
}
