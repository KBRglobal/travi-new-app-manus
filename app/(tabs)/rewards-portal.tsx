import { useRouter } from 'expo-router';

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const RewardsPortalScreen = () => {
  const router = useRouter();
  const rewards = [
    { id: '1', title: '10% Off Next Flight', description: 'Redeem for your next adventure!', icon: 'flight' },
    { id: '2', title: 'Free Lounge Access', description: 'Enjoy comfort before your journey.', icon: 'lounge' },
    { id: '3', title: 'Upgrade to Business Class', description: 'Experience luxury in the skies.', icon: 'business-center' },
    { id: '4', title: 'Exclusive Hotel Deals', description: 'Unlock special rates at premium hotels.', icon: 'hotel' },
    { id: '5', title: 'Travel Insurance Discount', description: 'Stay protected on all your trips.', icon: 'security' },
  ];

  return (
    <ScreenWrapper title="Rewards Portal" scrollable={true}>
      <View style={styles.container}>
        <Text style={styles.header}>Your Exclusive Rewards</Text>
        <Text style={styles.subHeader}>Redeem your points for amazing travel benefits.</Text>

        {rewards.map((reward) => (
          <BlurView key={reward.id} intensity={20} tint="dark" style={styles.card}>
            <View style={styles.cardContent}>
              <MaterialIcons name={reward.icon as any} size={30} color={DS.purple} style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{reward.title}</Text>
                <Text style={styles.cardDescription}>{reward.description}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.redeemButton}>
              <LinearGradient
                colors={[DS.purple, DS.pink] as const}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientButton}
              >
                <Text style={styles.redeemButtonText}>Redeem</Text>
              </LinearGradient>
            </TouchableOpacity>
          </BlurView>
        ))}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: DS.bg,
  },
  header: {
    fontFamily: 'Chillax-Bold',
    fontSize: 28,
    color: DS.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeader: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginBottom: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
    marginBottom: 5,
  },
  cardDescription: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.muted,
  },
  redeemButton: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  redeemButtonText: {
    fontFamily: 'Satoshi-Medium',
    color: DS.white,
    fontSize: 14,
  },
});

export default RewardsPortalScreen;
