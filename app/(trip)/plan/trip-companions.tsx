import { useState, useCallback } from 'react';
import { View, Text, Pressable, ScrollView, TextInput, Share, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';
import { useTripStore, Companion } from '@/stores/tripStore';
import { useAuthStore } from '@/stores/authStore';
import * as Haptics from 'expo-haptics';

export default function TripCompanionsScreen() {
  const router = useRouter();
  const trip = useTripStore((s) => s.currentTrip);
  const { addCompanion, removeCompanion, updateCompanionStatus } = useTripStore();
  const user = useAuthStore((s) => s.user);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteContact, setInviteContact] = useState('');

  const companions = trip?.companions || [];
  const totalPrice = trip?.totalPrice || 974;
  const splitCount = companions.filter((c) => c.status === 'confirmed').length + 1; // +1 for organizer
  const perPerson = (totalPrice / splitCount).toFixed(2);
  const allConfirmed = companions.length > 0 && companions.every((c) => c.status === 'confirmed');

  const handleInvite = () => {
    if (!inviteName.trim()) return;
    addCompanion({
      name: inviteName.trim(),
      email: inviteContact.includes('@') ? inviteContact.trim() : undefined,
      phone: !inviteContact.includes('@') ? inviteContact.trim() : undefined,
      status: 'pending',
      isOrganizer: false,
    });
    setInviteName('');
    setInviteContact('');
    setShowInvite(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handleRemove = (id: string, name: string) => {
    Alert.alert('Remove Companion', `Remove ${name} from this trip?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => removeCompanion(id) },
    ]);
  };

  const handleShareLink = async () => {
    const dest = trip?.destination?.name || 'a trip';
    await Share.share({ message: `Join me on ${dest} with TRAVI! 🌍\nhttps://travi.app/trip/${trip?.id}/join` });
  };

  const statusColor = (status: Companion['status']) => {
    switch (status) {
      case 'confirmed': return colors.success;
      case 'pending': return colors.warning;
      case 'declined': return colors.error;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 56, paddingBottom: 16 }}>
        <Pressable onPress={() => router.back()} style={{ padding: 8, marginRight: 12 }}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h2, color: colors.text.primary }}>Trip Companions</Text>
          <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.caption, color: colors.text.secondary }}>{companions.length + 1} people</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}>
        {/* All Confirmed Banner */}
        {allConfirmed && (
          <View style={{ marginBottom: 16, padding: 16, backgroundColor: 'rgba(74,222,128,0.15)', borderRadius: radius.card, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <MaterialIcons name="check-circle" size={24} color={colors.success} />
            <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.success }}>Everyone's in!</Text>
          </View>
        )}

        {/* You Card */}
        <View style={{ backgroundColor: colors.bg.card, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border.default, padding: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={{ width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
            <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h3, color: '#FFF' }}>{(user?.name || 'Y')[0].toUpperCase()}</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.text.primary }}>{user?.name || 'You'}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 4, backgroundColor: 'rgba(100,67,244,0.15)', borderRadius: radius.pill }}>
            <MaterialIcons name="military-tech" size={16} color={colors.primary} />
            <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.caption, color: colors.primary }}>Organizer</Text>
          </View>
        </View>

        {/* Companions List */}
        {companions.map((companion) => (
          <View key={companion.id} style={{ backgroundColor: colors.bg.card, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border.default, padding: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.08)', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h3, color: colors.text.secondary }}>{companion.name[0].toUpperCase()}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.text.primary }}>{companion.name}</Text>
              <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.caption, color: colors.text.muted, marginTop: 2 }}>{companion.email || companion.phone || ''}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View style={{ paddingHorizontal: 10, paddingVertical: 4, backgroundColor: `${statusColor(companion.status)}20`, borderRadius: radius.pill }}>
                <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.caption, color: statusColor(companion.status), textTransform: 'capitalize' }}>{companion.status}</Text>
              </View>
              {companion.status === 'pending' && (
                <Pressable onPress={() => updateCompanionStatus(companion.id, 'confirmed')}>
                  <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.caption, color: colors.primary }}>Resend</Text>
                </Pressable>
              )}
              <Pressable onPress={() => handleRemove(companion.id, companion.name)} style={{ padding: 4 }}>
                <Ionicons name="close" size={18} color={colors.text.muted} />
              </Pressable>
            </View>
          </View>
        ))}

        {/* Empty State */}
        {companions.length === 0 && (
          <View style={{ alignItems: 'center', paddingVertical: 40 }}>
            <MaterialIcons name="group-add" size={64} color={colors.text.muted} />
            <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.text.secondary, marginTop: 16 }}>Add friends to your trip</Text>
            <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.bodySm, color: colors.text.muted, marginTop: 4, textAlign: 'center' }}>Invite companions to plan and split costs together</Text>
          </View>
        )}

        {/* Cost Split Card */}
        {companions.length > 0 && (
          <Pressable
            onPress={() => router.push('/(trip)/wallet/split')}
            style={{ backgroundColor: colors.bg.card, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border.default, padding: 16, marginTop: 8, marginBottom: 12 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <MaterialIcons name="calculate" size={20} color={colors.primary} />
              <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.text.primary }}>Cost Split</Text>
            </View>
            <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.h3, color: colors.text.primary }}>
              €{totalPrice} ÷ {splitCount} people = <Text style={{ fontFamily: fonts.heading, color: colors.primary }}>€{perPerson}</Text> each
            </Text>
          </Pressable>
        )}

        {/* Invite Button */}
        <Pressable
          onPress={() => setShowInvite(true)}
          style={{ height: 52, borderRadius: radius.button, justifyContent: 'center', alignItems: 'center', marginTop: 8, overflow: 'hidden' }}
        >
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: colors.primary }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Ionicons name="person-add" size={20} color="#FFF" />
            <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: '#FFF' }}>Invite Companion</Text>
          </View>
        </Pressable>

        {/* Share Link Button */}
        <Pressable
          onPress={handleShareLink}
          style={{ height: 52, borderRadius: radius.button, justifyContent: 'center', alignItems: 'center', marginTop: 12, borderWidth: 1, borderColor: colors.border.strong }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Ionicons name="link" size={20} color={colors.text.primary} />
            <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.text.primary }}>Share Trip Link</Text>
          </View>
        </Pressable>
      </ScrollView>

      {/* Invite Bottom Sheet (simplified) */}
      {showInvite && (
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.bg.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40, ...shadows.card }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h3, color: colors.text.primary }}>Invite Companion</Text>
            <Pressable onPress={() => setShowInvite(false)}>
              <Ionicons name="close" size={24} color={colors.text.muted} />
            </Pressable>
          </View>
          <TextInput
            value={inviteName}
            onChangeText={setInviteName}
            placeholder="Name"
            placeholderTextColor={colors.text.muted}
            style={{ height: 48, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: radius.button, paddingHorizontal: 16, fontFamily: fonts.body, fontSize: fontSizes.body, color: colors.text.primary, borderWidth: 1, borderColor: colors.border.default, marginBottom: 12 }}
          />
          <TextInput
            value={inviteContact}
            onChangeText={setInviteContact}
            placeholder="Email or phone"
            placeholderTextColor={colors.text.muted}
            keyboardType="email-address"
            style={{ height: 48, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: radius.button, paddingHorizontal: 16, fontFamily: fonts.body, fontSize: fontSizes.body, color: colors.text.primary, borderWidth: 1, borderColor: colors.border.default, marginBottom: 20 }}
          />
          <Pressable
            onPress={handleInvite}
            disabled={!inviteName.trim()}
            style={{ height: 52, borderRadius: radius.button, justifyContent: 'center', alignItems: 'center', backgroundColor: inviteName.trim() ? colors.primary : 'rgba(100,67,244,0.4)' }}
          >
            <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: '#FFF' }}>Send Invite</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
