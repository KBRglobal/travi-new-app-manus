import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function TermsScreen() {
 const router = useRouter();
 return (
 <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <View className="flex-row items-center px-4 py-3 mb-2">
 <TouchableOpacity onPress={() => router.back()}><Text className=" text-lg" style={{ color: colors.text.primary }}>←</Text></TouchableOpacity>
 <Text className=" text-xl font-[Satoshi-Bold] ml-3" style={{ color: colors.text.primary }}>Terms & Policies</Text>
 </View>
 {[
 { title: 'Terms of Service', icon: '', desc: 'Last updated: March 2026' },
 { title: 'Privacy Policy', iconName: 'lock-closed', desc: 'How we handle your data' },
 { title: 'Cookie Policy', icon: '', desc: 'Cookie usage on our platform' },
 { title: 'Refund Policy', iconName: 'cash', desc: 'Cancellation and refund terms' },
 { title: 'Community Guidelines', iconName: 'people', desc: 'Rules for social features' },
 { title: 'Open Source Licenses', iconName: 'clipboard', desc: 'Third-party software licenses' },
 ].map(item => (
 <TouchableOpacity onPress={() => {}} key={item.title} className="flex-row items-center mx-4 mb-2 p-4 bg-[#120824] rounded-2xl border border-white/[0.08]">
 <Text className="text-2xl mr-3">{item.icon}</Text>
 <View className="flex-1">
 <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{item.title}</Text>
 <Text className="/40 text-xs" style={{ color: colors.text.primary }}>{item.desc}</Text>
 </View>
 <Text className="/20" style={{ color: colors.text.primary }}>›</Text>
 </TouchableOpacity>
 ))}
 <View className="items-center py-8">
 <Text className="/20 text-xs" style={{ color: colors.text.primary }}>TRAVI v1.0.0</Text>
 <Text className="/20 text-xs" style={{ color: colors.text.primary }}>© 2026 TRAVI Travel Ltd.</Text>
 </View>
 </ScrollView>
 );
}
