import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { CalendarList } from 'react-native-calendars';
import { useRouter } from 'expo-router';
import { useTripStore } from '../../stores/tripStore';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function DatesScreen() {
 const router = useRouter();
 const { setDates } = useTripStore();
 const [startDate, setStartDate] = useState('');
 const [endDate, setEndDate] = useState('');

 const getMarkedDates = () => {
 if (!startDate) return {};
 if (!endDate) return { [startDate]: { startingDay: true, endingDay: true, color: colors.primary, textColor: 'white' } };
 const marked: Record<string, any> = {};
 const start = new Date(startDate);
 const end = new Date(endDate);
 for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
 const key = d.toISOString().split('T')[0];
 marked[key] = {
 color: key === startDate || key === endDate ? '#6443F4' : 'rgba(100,67,244,0.3)',
 textColor: 'white',
 startingDay: key === startDate,
 endingDay: key === endDate,
 };
 }
 return marked;
 };

 const handleDayPress = (day: any) => {
 if (!startDate || (startDate && endDate)) {
 setStartDate(day.dateString);
 setEndDate('');
 } else {
 if (day.dateString < startDate) {
 setEndDate(startDate);
 setStartDate(day.dateString);
 } else {
 setEndDate(day.dateString);
 }
 }
 };

 const daysBetween = startDate && endDate ? Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000) + 1 : 0;

 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <View className="px-6 flex-row items-center justify-between mb-4">
 <TouchableOpacity onPress={() => router.back()}>
 <Text className=" text-xl" style={{ color: colors.text.primary }}>‹ Back</Text>
 </TouchableOpacity>
 <Text className=" text-[18px]" style={{ color: colors.text.primary }}>Select Dates</Text>
 <View className="w-12" />
 </View>

 {startDate && endDate && (
 <View className="mx-6 bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-3 mb-4 flex-row justify-between">
 <View>
 <Text className="text-[rgba(255,255,255,0.3)] text-[12px]">Check-in</Text>
 <Text className=" text-[15px] font-semibold" style={{ color: colors.text.primary }}>{startDate}</Text>
 </View>
 <View className="items-center justify-center">
 <Text className="text-[#6443F4] text-[13px] font-[Satoshi-Bold]">{daysBetween} nights</Text>
 </View>
 <View className="items-end">
 <Text className="text-[rgba(255,255,255,0.3)] text-[12px]">Check-out</Text>
 <Text className=" text-[15px] font-semibold" style={{ color: colors.text.primary }}>{endDate}</Text>
 </View>
 </View>
 )}

 <CalendarList
 markingType="period"
 markedDates={getMarkedDates()}
 onDayPress={handleDayPress}
 minDate={new Date().toISOString().split('T')[0]}
 pastScrollRange={0}
 futureScrollRange={12}
 theme={{
 calendarBackground: '#0A0514',
 textSectionTitleColor: 'rgba(255,255,255,0.6)',
 dayTextColor: '#ffffff',
 todayTextColor: '#6443F4',
 monthTextColor: '#ffffff',
 textDisabledColor: 'rgba(255,255,255,0.2)',
 arrowColor: '#6443F4',
 }}
 />

 {startDate && endDate && (
 <View className="absolute bottom-0 left-0 right-0 p-6 bg-bg-[#6443F4] border-t border-[rgba(255,255,255,0.08)]">
 <TouchableOpacity
 className="bg-[#6443F4] py-4 rounded-[12px] items-center"
 onPress={() => { setDates(startDate, endDate); router.push('/(trip)/travelers'); }}
 >
 <Text className=" text-[15px] font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Continue</Text>
 </TouchableOpacity>
 </View>
 )}

 <TouchableOpacity className="mx-6 mt-2 items-center" onPress={() => router.push('/(trip)/flexible-dates')}>
 <Text className="text-[#6443F4] text-[13px]">calendar Flexible dates? Find cheapest</Text>
 </TouchableOpacity>
 </View>
 );
}
