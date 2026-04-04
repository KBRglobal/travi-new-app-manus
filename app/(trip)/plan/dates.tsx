import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function PlanDatesScreen() {
 const router = useRouter();
 const [startDate, setStartDate] = useState('');
 const [endDate, setEndDate] = useState('');
 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <View className="flex-row items-center px-4 md:px-6 mt-4">
 <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className=" text-2xl" style={{ color: colors.text.primary }}>‹</Text></Pressable>
 <Text className=" text-xl font-[Satoshi-Bold] ml-3" style={{ color: colors.text.primary }}>Select Dates</Text>
 </View>
 <View className="flex-1 items-center justify-center px-4 md:px-6">
 <View className="w-full max-w-md">
 <Text className="text-[rgba(255,255,255,0.6)] text-sm mb-2">Calendar placeholder</Text>
 <View className="w-full h-64 bg-white/5 rounded-[16px] items-center justify-center border border-white/10">
 <Text className="text-4xl">calendar</Text>
 <Text className="text-[rgba(255,255,255,0.6)] text-sm mt-2">Select your travel dates</Text>
 </View>
 <View className="flex-row gap-3 mt-4">
 <Pressable onPress={() => setStartDate('Apr 10')} className="flex-1 h-13 bg-white/5 border border-white/10 rounded-input items-center justify-center">
 <Text className=" text-sm" style={{ color: colors.text.primary }}>{startDate || 'Start Date'}</Text>
 </Pressable>
 <Pressable onPress={() => setEndDate('Apr 17')} className="flex-1 h-13 bg-white/5 border border-white/10 rounded-input items-center justify-center">
 <Text className=" text-sm" style={{ color: colors.text.primary }}>{endDate || 'End Date'}</Text>
 </Pressable>
 </View>
 </View>
 </View>
 <View className="px-4 md:px-6 pb-safe mb-4">
 <Pressable onPress={() => router.push('/(trip)/plan/food-preferences')} className="w-full max-w-md mx-auto h-14 bg-[#6443F4] rounded-[12px] items-center justify-center active:opacity-80">
 <Text className=" text-base font-semibold" style={{ color: colors.text.primary }}>Continue</Text>
 </Pressable>
 </View>
 </View>
 );
}
