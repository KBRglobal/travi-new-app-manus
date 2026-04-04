import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { useRouter } from 'expo-router';
import { useTripStore } from '../../stores/tripStore';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

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
 <View className="flex-1 bg-bg-primary pt-safe">
 <View className="px-6 flex-row items-center justify-between mb-4">
 <TouchableOpacity onPress={() => router.back()}>
 <Text className="text-white text-xl">‹ Back</Text>
 </TouchableOpacity>
 <Text className="text-white text-heading-3">Select Dates</Text>
 <View className="w-12" />
 </View>

 {startDate && endDate && (
 <View className="mx-6 bg-bg-card border border-border rounded-card p-3 mb-4 flex-row justify-between">
 <View>
 <Text className="text-text-muted text-caption">Check-in</Text>
 <Text className="text-white text-body font-semibold">{startDate}</Text>
 </View>
 <View className="items-center justify-center">
 <Text className="text-primary text-body-sm font-bold">{daysBetween} nights</Text>
 </View>
 <View className="items-end">
 <Text className="text-text-muted text-caption">Check-out</Text>
 <Text className="text-white text-body font-semibold">{endDate}</Text>
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
 <View className="absolute bottom-0 left-0 right-0 p-6 bg-bg-primary border-t border-border">
 <TouchableOpacity
 className="bg-primary py-4 rounded-button items-center"
 onPress={() => { setDates(startDate, endDate); router.push('/(trip)/travelers'); }}
 >
 <Text className="text-white text-body font-bold">Continue</Text>
 </TouchableOpacity>
 </View>
 )}

 <TouchableOpacity className="mx-6 mt-2 items-center" onPress={() => router.push('/(trip)/flexible-dates')}>
 <Text className="text-primary text-body-sm">calendar Flexible dates? Find cheapest</Text>
 </TouchableOpacity>
 </View>
 );
}
