import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, spacing, radius, typography } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { PressableScale } from '@/components/ui/PressableScale';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

const NOTIFICATIONS = [
  { id: '1', icon: 'trending-down' as const, title: 'Price Drop Alert', desc: 'NYC→Tokyo flight dropped to $890', time: '2m ago', read: false, action: '/(trip)/flight-alerts' },
  { id: '2', icon: 'local-fire-department' as const, title: 'Streak Bonus', desc: 'You earned +50 streak points!', time: '1h ago', read: false, action: '/(trip)/points/transactions' },
  { id: '3', icon: 'people' as const, title: 'New Connection', desc: 'Sarah accepted your request', time: '3h ago', read: true, action: '/(social)/buddies' },
  { id: '4', icon: 'flight' as const, title: 'Check-in Open', desc: 'Your flight AA123 check-in is open', time: '5h ago', read: true, action: '/(trip)/pre/trip-1/documents' },
  { id: '5', icon: 'rate-review' as const, title: 'Review Reminder', desc: 'How was your stay at Hotel Shinjuku?', time: '1d ago', read: true, action: '/(trip)/post/trip-1/review' },
  { id: '6', icon: 'emoji-events' as const, title: 'Challenge Complete', desc: 'You completed the Foodie challenge!', time: '2d ago', read: true, action: '/(trip)/points/challenges' },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const markRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '15%' }}>
        <LinearGradient colors={['rgba(100,67,244,0.06)', 'transparent']} style={{ flex: 1 }} />
      </View>

      <ScreenHeader
        title="Notifications"
        rightAction={
          <PressableScale onPress={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}>
            <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodySm, color: colors.primary }}>Mark all read</Text>
          </PressableScale>
        }
      />

      {unreadCount > 0 && (
        <View style={{ paddingHorizontal: spacing.screenH, marginBottom: 12 }}>
          <Text style={{ ...typography.caption, color: colors.text.tertiary }}>
            {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
          </Text>
        </View>
      )}

      <FlatList
        data={notifications}
        keyExtractor={i => i.id}
        contentContainerStyle={{ paddingHorizontal: spacing.screenH, paddingBottom: insets.bottom + 20 }}
        renderItem={({ item }) => (
          <PressableScale
            onPress={() => { markRead(item.id); router.push(item.action as any); }}
            style={{ marginBottom: 8 }}
          >
            <GlassCard tint={item.read ? 'neutral' : 'discovery'}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <View style={{
                  width: 40, height: 40, borderRadius: 20,
                  backgroundColor: item.read ? 'rgba(255,255,255,0.04)' : 'rgba(100,67,244,0.12)',
                  borderWidth: 1,
                  borderColor: item.read ? 'rgba(255,255,255,0.06)' : 'rgba(100,67,244,0.2)',
                  alignItems: 'center', justifyContent: 'center', marginRight: 12,
                }}>
                  <MaterialIcons name={item.icon} size={20} color={item.read ? colors.text.tertiary : colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontFamily: fonts.bold,
                    fontSize: fontSizes.body,
                    color: item.read ? colors.text.secondary : colors.text.primary,
                    marginBottom: 2,
                  }}>{item.title}</Text>
                  <Text style={{ ...typography.caption, color: colors.text.tertiary, marginBottom: 4 }}>{item.desc}</Text>
                  <Text style={{ fontFamily: fonts.body, fontSize: 11, color: colors.text.muted }}>{item.time}</Text>
                </View>
                {!item.read && (
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, marginTop: 6 }} />
                )}
              </View>
            </GlassCard>
          </PressableScale>
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', paddingTop: 60 }}>
            <MaterialIcons name="notifications-none" size={48} color={colors.text.muted} />
            <Text style={{ ...typography.body, color: colors.text.tertiary, marginTop: 12 }}>No notifications yet</Text>
          </View>
        }
      />
    </View>
  );
}
