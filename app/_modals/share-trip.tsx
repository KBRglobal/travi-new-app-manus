import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function ShareTripModal() {
 const router = useRouter();

 const shareOptions = [
 { iconName: 'phone-portrait', name: 'Share Link', desc: 'Copy trip link to clipboard' },
 { iconName: 'mail', name: 'Email', desc: 'Send trip details via email' },
 { iconName: 'chatbubble', name: 'WhatsApp', desc: 'Share on WhatsApp' },
 { iconName: 'camera', name: 'Instagram', desc: 'Share as Instagram story' },
 { emoji: '', name: 'Twitter', desc: 'Tweet about your trip' },
 { iconName: 'people', name: 'TRAVI Friends', desc: 'Share with travel buddies' },
 ];

 return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe px-4">
 <View className="flex-row items-center justify-between py-3 mb-4">
 <TouchableOpacity onPress={() => router.back()}><Text className="/60" style={{ color: colors.text.primary }}>Cancel</Text></TouchableOpacity>
 <Text className=" text-xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Share Trip</Text>
 <View className="w-12" />
 </View>
 <View className="bg-[#120824] rounded-2xl p-4 mb-6 border border-white/[0.08]">
 <Text className=" font-[Satoshi-Bold] text-lg" style={{ color: colors.text.primary }}>🇯🇵 Tokyo Adventure</Text>
 <Text className="/40 text-sm" style={{ color: colors.text.primary }}>Apr 15 - 22, 2026 • 7 days</Text>
 </View>
 {shareOptions.map(opt => (
 <TouchableOpacity key={opt.name} onPress={() => router.back()} className="flex-row items-center p-4 mb-2 bg-[#120824] rounded-2xl border border-white/[0.08]">
 <Text className="text-2xl mr-3">{opt.emoji}</Text>
 <View className="flex-1">
 <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{opt.name}</Text>
 <Text className="/40 text-xs" style={{ color: colors.text.primary }}>{opt.desc}</Text>
 </View>
 <Text className="/20" style={{ color: colors.text.primary }}>›</Text>
 </TouchableOpacity>
 ))}
 </View>
 );
}
