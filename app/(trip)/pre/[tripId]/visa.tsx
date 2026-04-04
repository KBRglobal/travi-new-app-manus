import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

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
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }}">
 <View className="flex-row items-center px-4 pt-12 pb-4">
 <TouchableOpacity onPress={() => router.back()} className="mr-3">
 <Text className=" text-lg" style={{ color: colors.text.primary }}>‹ Back</Text>
 </TouchableOpacity>
 <Text className=" text-xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Visa Requirements</Text>
 </View>

 <ScrollView className="flex-1 px-4">
 <View className="flex-row justify-between mb-4">
 <View className="flex-row items-center">
 <Text className="text-2xl mr-2">🇮🇱</Text>
 <View>
 <Text className="text-[rgba(255,255,255,0.6)] text-sm">Passport</Text>
 <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Israeli</Text>
 </View>
 </View>
 <TouchableOpacity><Text className="text-[#6443F4]">Change</Text></TouchableOpacity>
 <View className="flex-row items-center">
 <Text className="text-2xl mr-2">🇦🇪</Text>
 <View>
 <Text className="text-[rgba(255,255,255,0.6)] text-sm">Destination</Text>
 <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>UAE</Text>
 </View>
 </View>
 </View>

 <View className="rounded-[16px] p-4 mb-4 items-center" style={{ backgroundColor: status.color + '15', borderWidth: 1, borderColor: status.color }}>
 <Text style={{ color: status.color }} className="text-xl font-[Satoshi-Bold]">{status.icon} {status.text}</Text>
 <Text className="text-[rgba(255,255,255,0.6)] mt-1">{status.detail}</Text>
 </View>

 <Text className=" font-[Satoshi-Bold] text-lg mb-3" style={{ color: colors.text.primary }}>Requirements Checklist</Text>
 <View className="bg-[#120824] rounded-[16px] p-4 mb-4">
 {[
 { check: true, text: 'Valid passport (>6 months remaining)' },
 { check: true, text: 'Return ticket' },
 { check: true, text: 'Proof of accommodation' },
 { check: false, text: 'Travel insurance recommended', info: true },
 ].map((req, i) => (
 <View key={i} className="flex-row items-center py-2" style={{ borderBottomWidth: i < 3 ? 1 : 0, borderBottomColor: 'rgba(255,255,255,0.05)' }}>
 <Text className={`mr-3 ${req.check ? 'text-green-400' : 'text-blue-400'}`}>{req.check ? 'checkmark' : 'ℹ'}</Text>
 <Text className=" flex-1" style={{ color: colors.text.primary }}>{req.text}</Text>
 </View>
 ))}
 </View>

 <View className="bg-yellow-900/20 rounded-[16px] p-4 mb-4" style={{ borderWidth: 1, borderColor: '#F59E0B' }}>
 <Text className="text-yellow-400 font-[Satoshi-Bold] mb-1">Passport Expiry Warning</Text>
 <Text className="text-[rgba(255,255,255,0.6)]">Your passport expires in 8 months. Some countries require 6+ months validity.</Text>
 </View>

 {visaStatus === 'evisa' && (
 <TouchableOpacity onPress={() => Linking.openURL('https://example.com')} className="bg-[#6443F4] rounded-[12px] py-3 items-center mb-4">
 <Text className=" font-semibold" style={{ color: colors.text.primary }}>Apply for eVisa →</Text>
 </TouchableOpacity>
 )}

 <TouchableOpacity onPress={() => {}} className="bg-[#120824] rounded-[12px] py-3 items-center mb-4" style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
 <Text className="text-[#6443F4] font-semibold">Check Another Country</Text>
 </TouchableOpacity>

 <Text className="text-[rgba(255,255,255,0.3)] text-center text-xs mb-8">Data from Passport Index, updated April 2026</Text>
 </ScrollView>
 </View>
 );
}
