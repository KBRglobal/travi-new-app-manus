import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, FlatList} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function VisaPassport() {
 const router = useRouter();
 const { tripId } = useLocalSearchParams();
 const visaStatus = 'free'; // free | arrival | evisa | required | denied

 const statusConfig: Record<string, { icon: string; text: string; color: string; detail: string }> = {
 free: { iconName: 'checkmark-circle', text: 'Visa-free', color: '#22C55E', detail: 'Valid for 30 days / Max 90 per 180 days' },
 arrival: { icon: '', text: 'Visa on arrival', color: '#F59E0B', detail: '$50 at immigration' },
 evisa: { icon: 'ellipse', text: 'eVisa required', color: '#3B82F6', detail: 'Apply online before travel' },
 required: { icon: '', text: 'Visa required', color: '#EF4444', detail: 'Embassy appointment needed' },
 denied: { icon: '', text: 'Entry not permitted', color: '#EF4444', detail: 'No entry for this passport' },
 };

 const status = statusConfig[visaStatus];

 return (
 <View className="flex-1 bg-bg-primary">
 <View className="flex-row items-center px-4 pt-12 pb-4">
 <TouchableOpacity onPress={() => router.back()} className="mr-3">
 <Text className="text-white text-lg">‹ Back</Text>
 </TouchableOpacity>
 <Text className="text-white text-xl font-bold">Visa Requirements</Text>
 </View>

 <ScrollView className="flex-1 px-4">
 <View className="flex-row justify-between mb-4">
 <View className="flex-row items-center">
 <Text className="text-2xl mr-2">🇮🇱</Text>
 <View>
 <Text className="text-text-secondary text-sm">Passport</Text>
 <Text className="text-white font-bold">Israeli</Text>
 </View>
 </View>
 <TouchableOpacity><Text className="text-primary">Change</Text></TouchableOpacity>
 <View className="flex-row items-center">
 <Text className="text-2xl mr-2">🇦🇪</Text>
 <View>
 <Text className="text-text-secondary text-sm">Destination</Text>
 <Text className="text-white font-bold">UAE</Text>
 </View>
 </View>
 </View>

 <View className="rounded-card p-4 mb-4 items-center" style={{ backgroundColor: status.color + '15', borderWidth: 1, borderColor: status.color }}>
 <Text style={{ color: status.color }} className="text-xl font-bold">{status.icon} {status.text}</Text>
 <Text className="text-text-secondary mt-1">{status.detail}</Text>
 </View>

 <Text className="text-white font-bold text-lg mb-3">Requirements Checklist</Text>
 <View className="bg-bg-card rounded-card p-4 mb-4">
 {[
 { check: true, text: 'Valid passport (>6 months remaining)' },
 { check: true, text: 'Return ticket' },
 { check: true, text: 'Proof of accommodation' },
 { check: false, text: 'Travel insurance recommended', info: true },
 ].map((req, i) => (
 <View key={i} className="flex-row items-center py-2" style={{ borderBottomWidth: i < 3 ? 1 : 0, borderBottomColor: 'rgba(255,255,255,0.05)' }}>
 <Text className={`mr-3 ${req.check ? 'text-green-400' : 'text-blue-400'}`}>{req.check ? 'checkmark' : 'ℹ'}</Text>
 <Text className="text-white flex-1">{req.text}</Text>
 </View>
 ))}
 </View>

 <View className="bg-yellow-900/20 rounded-card p-4 mb-4" style={{ borderWidth: 1, borderColor: '#F59E0B' }}>
 <Text className="text-yellow-400 font-bold mb-1">Passport Expiry Warning</Text>
 <Text className="text-text-secondary">Your passport expires in 8 months. Some countries require 6+ months validity.</Text>
 </View>

 {visaStatus === 'evisa' && (
 <TouchableOpacity onPress={() => Linking.openURL('https://example.com')} className="bg-primary rounded-button py-3 items-center mb-4">
 <Text className="text-white font-semibold">Apply for eVisa →</Text>
 </TouchableOpacity>
 )}

 <TouchableOpacity className="bg-bg-card rounded-button py-3 items-center mb-4" style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
 <Text className="text-primary font-semibold">Check Another Country</Text>
 </TouchableOpacity>

 <Text className="text-text-muted text-center text-xs mb-8">Data from Passport Index, updated April 2026</Text>
 </ScrollView>
 </View>
 );
}
