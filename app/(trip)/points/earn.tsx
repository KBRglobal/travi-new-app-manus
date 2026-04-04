import { Skeleton } from '@/components/ui/Skeleton';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const EARN_WAYS = [
 { iconName: 'airplane', title: 'Book a Flight', points: '100-500', desc: 'Earn based on trip value', action: 'Book Now' },
 { iconName: 'bed', title: 'Book a Hotel', points: '50-300', desc: 'Earn based on nights stayed', action: 'Browse Hotels' },
 { iconName: 'star', title: 'Write a Review', points: '25-50', desc: 'Detailed reviews earn more', action: 'Write Review' },
 { iconName: 'camera', title: 'Upload Photos', points: '5-10', desc: 'Per photo uploaded', action: 'Upload' },
 { iconName: 'people', title: 'Refer a Friend', points: '500', desc: 'When they complete first trip', action: 'Invite' },
 { iconName: 'flask', title: 'Complete DNA Quiz', points: '100', desc: 'One-time bonus', action: 'Take Quiz' },
 { emoji: 'calendar', title: 'Daily Check-in', points: '10', desc: 'Open the app daily', action: 'Claimed checkmark' },
 { iconName: 'flag', title: 'Complete Challenges', points: '200-500', desc: 'Varies by challenge', action: 'View' },
 { iconName: 'chatbubble', title: 'Social Engagement', points: '5-15', desc: 'Posts, comments, likes', action: 'Go Social' },
 { emoji: '', title: 'Birthday Bonus', points: '200', desc: 'Annual birthday gift', action: 'Auto' },
];

export default function EarnPointsScreen() {
 const router = useRouter();

 return (
 <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <ScreenHeader title="Earn Points" />
 </View>
 <View className="items-center py-6 mx-4 mb-4 bg-[#6443F4]/10 rounded-2xl border border-[#6443F4]/20">
 <Text className="text-[#6443F4] text-3xl font-[Satoshi-Bold]">15,400</Text>
 <Text className="/60 text-sm" style={{ color: colors.text.primary }}>Your current balance</Text>
 </View>
 {EARN_WAYS.map(item => (
 <View key={item.title} className="flex-row items-center mx-4 mb-2 p-4 bg-[#120824] rounded-2xl border border-white/[0.08]">
 <Text className="text-2xl mr-3">{item.emoji}</Text>
 <View className="flex-1">
 <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{item.title}</Text>
 <Text className="/40 text-xs" style={{ color: colors.text.primary }}>{item.desc}</Text>
 </View>
 <View className="items-end">
 <Text className="text-[#6443F4] font-[Satoshi-Bold] text-sm">+{item.points}</Text>
 <TouchableOpacity onPress={() => {}} className="mt-1"><Text className="text-[#6443F4]/60 text-xs">{item.action}</Text></TouchableOpacity>
 </View>
 </View>
 ))}
 </ScrollView>
 );
}
