import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function NotificationSettingsScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    pushEnabled: true, flightAlerts: true, priceDrops: true, tripReminders: true,
    socialMessages: true, socialLikes: false, socialComments: true,
    pointsEarned: true, pointsExpiring: true, promotions: false,
    emailDigest: true, emailMarketing: false,
  });

  const toggle = (key: keyof typeof settings) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  const Section = ({ title, items }: { title: string; items: { key: keyof typeof settings; label: string; desc: string }[] }) => (
    <View className="mx-4 mb-6">
      <Text className="/60 text-xs uppercase mb-3 ml-1" style={{ color: colors.text.primary }}>{title}</Text>
      <View className="bg-[#120824] rounded-2xl border border-white/[0.08]">
        {items.map((item, i) => (
          <View key={item.key} className={`flex-row items-center justify-between p-4 ${i < items.length - 1 ? 'border-b border-white/[0.08]' : ''}`}>
            <View className="flex-1 mr-4"><Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{item.label}</Text><Text className="/40 text-xs" style={{ color: colors.text.primary }}>{item.desc}</Text></View>
            <Switch value={settings[item.key]} onValueChange={() => toggle(item.key)} trackColor={{ true: '#6443F4' }} />
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
      <View className="flex-row items-center px-4 py-3 mb-2">
        <TouchableOpacity onPress={() => router.back()}><Text className=" text-lg" style={{ color: colors.text.primary }}>←</Text></TouchableOpacity>
        <Text className=" text-xl font-[Satoshi-Bold] ml-3" style={{ color: colors.text.primary }}>Notifications</Text>
      </View>
      <Section title="Travel" items={[
        { key: 'pushEnabled', label: 'Push Notifications', desc: 'Enable all push notifications' },
        { key: 'flightAlerts', label: 'Flight Alerts', desc: 'Gate changes, delays, price drops' },
        { key: 'priceDrops', label: 'Price Drops', desc: 'When saved flights/hotels drop in price' },
        { key: 'tripReminders', label: 'Trip Reminders', desc: 'Packing lists, check-in reminders' },
      ]} />
      <Section title="Social" items={[
        { key: 'socialMessages', label: 'Messages', desc: 'New messages from travel buddies' },
        { key: 'socialLikes', label: 'Likes', desc: 'When someone likes your post' },
        { key: 'socialComments', label: 'Comments', desc: 'New comments on your posts' },
      ]} />
      <Section title="Rewards" items={[
        { key: 'pointsEarned', label: 'Points Earned', desc: 'When you earn new points' },
        { key: 'pointsExpiring', label: 'Points Expiring', desc: 'Before your points expire' },
        { key: 'promotions', label: 'Promotions', desc: 'Special offers and deals' },
      ]} />
      <Section title="Email" items={[
        { key: 'emailDigest', label: 'Weekly Digest', desc: 'Summary of your travel activity' },
        { key: 'emailMarketing', label: 'Marketing', desc: 'News and product updates' },
      ]} />
    </ScrollView>
  );
}
