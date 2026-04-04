import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

// DS object as provided in the prompt

const RedeemScreen = () => {
  const currentPoints = 12500;
  const rewards = [
    { id: '1', name: 'Flight Discount (5000 points)', points: 5000, description: 'Get $50 off your next flight.' },
    { id: '2', name: 'Hotel Stay (10000 points)', points: 10000, description: 'One night free at selected hotels.' },
    { id: '3', name: 'Upgrade to Business Class (15000 points)', points: 15000, description: 'Upgrade your economy ticket.' },
    { id: '4', name: 'Lounge Access (3000 points)', points: 3000, description: 'Access to airport lounges worldwide.' },
  ];

  return (
    <ScreenWrapper title="Redeem Points" scrollable={true}>
      <View style={styles.container}>
        {/* Your Points Section */}
        <Text style={styles.sectionTitle}>Your Points</Text>
        <BlurView intensity={20} tint="dark" style={styles.pointsCard}>
          <View style={styles.pointsContent}>
            <MaterialIcons name="star" size={30} color={DS.warning} />
            <Text style={styles.pointsText}>{currentPoints}</Text>
            <Text style={styles.pointsLabel}>Available Points</Text>
          </View>
        </BlurView>

        {/* Available Rewards Section */}
        <Text style={styles.sectionTitle}>Available Rewards</Text>
        {rewards.map((reward) => (
          <BlurView key={reward.id} intensity={20} tint="dark" style={styles.rewardCard}>
            <View style={styles.rewardContent}>
              <View>
                <Text style={styles.rewardName}>{reward.name}</Text>
                <Text style={styles.rewardDescription}>{reward.description}</Text>
              </View>
              <TouchableOpacity
                style={styles.redeemButton}
                onPress={() => console.log(`Redeem ${reward.name}`)}
                disabled={currentPoints < reward.points}
              >
                <LinearGradient
                  colors={[DS.purple, DS.pink] as const}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                  style={styles.gradientButton}
                >
                  <Text style={styles.redeemButtonText}>
                    {currentPoints >= reward.points ? `Redeem (${reward.points})` : `Need ${reward.points - currentPoints} more`}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
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
    backgroundColor: DS.bg, // Ensure background is set for the scrollable content
  },
  sectionTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 22,
    color: DS.white,
    marginBottom: 15,
    marginTop: 25,
  },
  pointsCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  pointsContent: {
    alignItems: 'center',
  },
  pointsText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 48,
    color: DS.white,
    marginTop: 10,
  },
  pointsLabel: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.muted,
  },
  rewardCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 15,
    marginBottom: 15,
  },
  rewardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardName: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
    marginBottom: 5,
  },
  rewardDescription: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.muted,
    maxWidth: '70%', // Prevent text from overlapping button
  },
  redeemButton: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  redeemButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
    color: DS.white,
  },
});

export default RedeemScreen;