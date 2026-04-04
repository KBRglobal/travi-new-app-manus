import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function AppearanceScreen() {
 const router = useRouter();
 const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');
 const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
 const [reduceMotion, setReduceMotion] = useState(false);
 const [haptics, setHaptics] = useState(true);

 return (
 <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <View className="flex-row items-center px-4 py-3 mb-2">
 <TouchableOpacity onPress={() => router.back()}><Text className=" text-lg" style={{ color: colors.text.primary }}>←</Text></TouchableOpacity>
 <Text className=" text-xl font-[Satoshi-Bold] ml-3" style={{ color: colors.text.primary }}>Appearance</Text>
 </View>
 <View className="mx-4 mb-6">
 <Text className="/60 text-xs uppercase mb-3 ml-1" style={{ color: colors.text.primary }}>Theme</Text>
 {(['dark', 'light', 'system'] as const).map(t => (
 <TouchableOpacity key={t} onPress={() => setTheme(t)} className={`flex-row items-center justify-between p-4 mb-2 rounded-2xl border ${theme === t ? 'bg-[#6443F4]/10 border-[#6443F4]' : 'bg-[#120824] border-white/[0.08]'}`}>
 <View className="flex-row items-center">
 <Text className="text-xl mr-3">{t === 'dark' ? '' : t === 'light' ? 'sunny' : ''}</Text>
 <Text className=" capitalize font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{t}</Text>
 </View>
 {theme === t && <Ionicons name="checkmark" size={24} color="#FFFFFF" />}
 </TouchableOpacity>
 ))}
 </View>
 <View className="mx-4 mb-6">
 <Text className="/60 text-xs uppercase mb-3 ml-1" style={{ color: colors.text.primary }}>Font Size</Text>
 <View className="flex-row">
 {(['small', 'medium', 'large'] as const).map(s => (
 <TouchableOpacity key={s} onPress={() => setFontSize(s)} className={`flex-1 py-3 mx-1 rounded-xl items-center ${fontSize === s ? 'bg-[#6443F4]' : 'bg-[#120824] border border-white/[0.08]'}`}>
 <Text className={`capitalize ${fontSize === s ? 'text-white font-[Satoshi-Bold]' : 'text-white/60'} ${s === 'small' ? 'text-xs' : s === 'large' ? 'text-lg' : 'text-sm'}`}>{s}</Text>
 </TouchableOpacity>
 ))}
 </View>
 </View>
 <View className="mx-4 mb-6">
 <Text className="/60 text-xs uppercase mb-3 ml-1" style={{ color: colors.text.primary }}>Accessibility</Text>
 <View className="bg-[#120824] rounded-2xl border border-white/[0.08]">
 <View className="flex-row items-center justify-between p-4 border-b border-white/[0.08]">
 <View><Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Reduce Motion</Text><Text className="/40 text-xs" style={{ color: colors.text.primary }}>Minimize animations</Text></View>
 <Switch value={reduceMotion} onValueChange={setReduceMotion} trackColor={{ true: '#6443F4' }} />
 </View>
 <View className="flex-row items-center justify-between p-4">
 <View><Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Haptic Feedback</Text><Text className="/40 text-xs" style={{ color: colors.text.primary }}>Vibration on interactions</Text></View>
 <Switch value={haptics} onValueChange={setHaptics} trackColor={{ true: '#6443F4' }} />
 </View>
 </View>
 </View>
 </ScrollView>
 );
}
