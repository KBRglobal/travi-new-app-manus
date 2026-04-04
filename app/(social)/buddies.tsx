import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

// DS object exported from ScreenWrapper.tsx (for reference, assuming it's available via context or direct import)

const buddiesData = [
  { id: '1', name: 'Alice Smith', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Bob Johnson', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Charlie Brown', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'Diana Prince', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: '5', name: 'Eve Adams', avatar: 'https://i.pravatar.cc/150?img=5' },
];

export default function BuddiesScreen() {
  const router = useRouter();
  return (
    <ScreenWrapper title="My Buddies" scrollable={true}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.addBuddyButton} onPress={() => router.push('/(social)/discover' as any)}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.addBuddyGradient}
          >
            <MaterialIcons name="person-add-alt-1" size={24} color={DS.white} />
            <Text style={styles.addBuddyText}>Add New Buddy</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Your Connections</Text>

        {buddiesData.map((buddy) => (
          <BlurView key={buddy.id} intensity={20} tint="dark" style={styles.buddyCard}>
            <Image source={{ uri: buddy.avatar }} style={styles.avatar} />
            <View style={styles.buddyInfo}>
              <Text style={styles.buddyName}>{buddy.name}</Text>
              <TouchableOpacity style={styles.messageButton} onPress={() => router.push('/(social)/message-chat' as any)}>
                <LinearGradient
                  colors={[DS.purple, DS.pink] as const}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                  style={styles.messageButtonGradient}
                >
                  <MaterialIcons name="chat" size={16} color={DS.white} />
                  <Text style={styles.messageButtonText}>Message</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </BlurView>
        ))}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  addBuddyButton: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  addBuddyGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  addBuddyText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
    marginLeft: 10,
  },
  sectionTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 22,
    color: DS.white,
    marginBottom: 20,
  },
  buddyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 1,
    borderColor: DS.borderStrong,
  },
  buddyInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buddyName: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 18,
    color: DS.white,
  },
  messageButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  messageButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  messageButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
    color: DS.white,
    marginLeft: 5,
  },
});
