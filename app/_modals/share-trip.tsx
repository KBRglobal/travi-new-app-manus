import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

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
 <View className="flex-1 bg-bg-primary pt-safe px-4">
 <View className="flex-row items-center justify-between py-3 mb-4">
 <TouchableOpacity onPress={() => router.back()}><Text className="text-white/60">Cancel</Text></TouchableOpacity>
 <Text className="text-white text-xl font-bold">Share Trip</Text>
 <View className="w-12" />
 </View>
 <View className="bg-bg-secondary rounded-2xl p-4 mb-6 border border-white/[0.08]">
 <Text className="text-white font-bold text-lg">🇯🇵 Tokyo Adventure</Text>
 <Text className="text-white/40 text-sm">Apr 15 - 22, 2026 • 7 days</Text>
 </View>
 {shareOptions.map(opt => (
 <TouchableOpacity key={opt.name} onPress={() => router.back()} className="flex-row items-center p-4 mb-2 bg-bg-secondary rounded-2xl border border-white/[0.08]">
 <Text className="text-2xl mr-3">{opt.emoji}</Text>
 <View className="flex-1">
 <Text className="text-white font-bold">{opt.name}</Text>
 <Text className="text-white/40 text-xs">{opt.desc}</Text>
 </View>
 <Text className="text-white/20">›</Text>
 </TouchableOpacity>
 ))}
 </View>
 );
}
