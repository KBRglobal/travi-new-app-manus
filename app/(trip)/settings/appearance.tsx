import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, FlatList} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

export default function AppearanceScreen() {
 const router = useRouter();
 const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');
 const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
 const [reduceMotion, setReduceMotion] = useState(false);
 const [haptics, setHaptics] = useState(true);

 return (
 <ScrollView className="flex-1 bg-bg-primary pt-safe">
 <View className="flex-row items-center px-4 py-3 mb-2">
 <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
 <Text className="text-white text-xl font-bold ml-3">Appearance</Text>
 </View>
 <View className="mx-4 mb-6">
 <Text className="text-white/60 text-xs uppercase mb-3 ml-1">Theme</Text>
 {(['dark', 'light', 'system'] as const).map(t => (
 <TouchableOpacity key={t} onPress={() => setTheme(t)} className={`flex-row items-center justify-between p-4 mb-2 rounded-2xl border ${theme === t ? 'bg-primary/10 border-primary' : 'bg-bg-secondary border-white/[0.08]'}`}>
 <View className="flex-row items-center">
 <Text className="text-xl mr-3">{t === 'dark' ? '' : t === 'light' ? 'sunny' : ''}</Text>
 <Text className="text-white capitalize font-bold">{t}</Text>
 </View>
 {theme === t && <Ionicons name="checkmark" size={24} color="#FFFFFF" />}
 </TouchableOpacity>
 ))}
 </View>
 <View className="mx-4 mb-6">
 <Text className="text-white/60 text-xs uppercase mb-3 ml-1">Font Size</Text>
 <View className="flex-row">
 {(['small', 'medium', 'large'] as const).map(s => (
 <TouchableOpacity key={s} onPress={() => setFontSize(s)} className={`flex-1 py-3 mx-1 rounded-xl items-center ${fontSize === s ? 'bg-primary' : 'bg-bg-secondary border border-white/[0.08]'}`}>
 <Text className={`capitalize ${fontSize === s ? 'text-white font-bold' : 'text-white/60'} ${s === 'small' ? 'text-xs' : s === 'large' ? 'text-lg' : 'text-sm'}`}>{s}</Text>
 </TouchableOpacity>
 ))}
 </View>
 </View>
 <View className="mx-4 mb-6">
 <Text className="text-white/60 text-xs uppercase mb-3 ml-1">Accessibility</Text>
 <View className="bg-bg-secondary rounded-2xl border border-white/[0.08]">
 <View className="flex-row items-center justify-between p-4 border-b border-white/[0.08]">
 <View><Text className="text-white font-bold">Reduce Motion</Text><Text className="text-white/40 text-xs">Minimize animations</Text></View>
 <Switch value={reduceMotion} onValueChange={setReduceMotion} trackColor={{ true: '#6443F4' }} />
 </View>
 <View className="flex-row items-center justify-between p-4">
 <View><Text className="text-white font-bold">Haptic Feedback</Text><Text className="text-white/40 text-xs">Vibration on interactions</Text></View>
 <Switch value={haptics} onValueChange={setHaptics} trackColor={{ true: '#6443F4' }} />
 </View>
 </View>
 </View>
 </ScrollView>
 );
}
