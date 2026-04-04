import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import Animated, { FadeInDown, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { activities } from '../../lib/mockData';
import { logCheckin } from '../../lib/dnaSignals';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

// In production: import QRCode from 'react-native-qrcode-svg';

export default function CheckinScreen() {
 const router = useRouter();
 const [checkedIn, setCheckedIn] = useState<Set<string>>(new Set());
 const checkScale = useSharedValue(1);

 const handleCheckin = (activityId: string) => {
 logCheckin(activityId);
 setCheckedIn((prev) => new Set([...prev, activityId]));
 checkScale.value = withSpring(1.2, {}, () => { checkScale.value = withSpring(1); });
 };

 return (
 <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }}" contentContainerClassName="pt-safe pb-24 px-6">
 <View className="flex-row items-center justify-between mb-6">
 <TouchableOpacity onPress={() => router.back()}>
 <Text className=" text-xl" style={{ color: colors.text.primary }}>‹ Back</Text>
 </TouchableOpacity>
 <Text className=" text-[18px]" style={{ color: colors.text.primary }}>Check-in</Text>
 <View className="w-12" />
 </View>

 {/* QR Code */}
 <Animated.View entering={FadeInDown} className="bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-6 items-center mb-6">
 <Text className=" text-[18px] mb-4" style={{ color: colors.text.primary }}>Your Booking QR</Text>
 <View className="w-48 h-48 bg-white rounded-xl items-center justify-center mb-4">
 {/* In production: <QRCode value="TRAVI-BK-2026-0515-DXB" size={180} /> */}
 <Ionicons name="phone-portrait" size={24} color="#FFFFFF" />
 <Text className="text-bg-[#6443F4] text-[12px] mt-2">QR Code</Text>
 </View>
 <Text className="text-[rgba(255,255,255,0.6)] text-[13px]">TRAVI-BK-2026-0515-DXB</Text>
 </Animated.View>

 {/* Activities to check in */}
 <Text className=" text-[18px] mb-3" style={{ color: colors.text.primary }}>Today's Activities</Text>
 {activities.slice(0, 4).map((act, i) => {
 const isChecked = checkedIn.has(act.id);
 return (
 <Animated.View key={act.id} entering={FadeInDown.delay(i * 100)}>
 <TouchableOpacity
 className={`flex-row bg-[#120824] border rounded-[16px] p-4 mb-2 items-center ${isChecked ? 'border-status-success' : 'border-[rgba(255,255,255,0.08)]'}`}
 onPress={() => !isChecked && handleCheckin(act.id)}
 disabled={isChecked}
 >
 <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${isChecked ? 'bg-[#4ADE80]' : 'bg-bg-surface'}`}>
 <Text className=" text-[15px] font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{isChecked ? 'checkmark' : i + 1}</Text>
 </View>
 <View className="flex-1">
 <Text className={`text-[15px] font-semibold ${isChecked ? 'text-[rgba(255,255,255,0.3)] line-through' : 'text-white'}`}>{act.name}</Text>
 <Text className="text-[rgba(255,255,255,0.6)] text-[13px]">{act.time}</Text>
 </View>
 {isChecked && <Text className="text-[#4ADE80] text-[13px] font-semibold">+10 pts</Text>}
 </TouchableOpacity>
 </Animated.View>
 );
 })}

 {/* Auto check-in info */}
 <View className="bg-bg-surface rounded-[16px] p-4 mt-4">
 <Text className="text-[rgba(255,255,255,0.6)] text-[13px]">Auto check-in is enabled. When you're within 200m of an activity, we'll check you in automatically and award points.</Text>
 </View>
 </ScrollView>
 );
}
