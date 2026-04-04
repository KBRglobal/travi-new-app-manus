import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

// DS object is assumed to be exported from ScreenWrapper.tsx, but defined here for reference and clarity
const DS = {
  bg: "#0A0514",
  surface: "rgba(36,16,62,0.55)",
  surfaceHigh: "rgba(50,20,80,0.7)",
  border: "rgba(123,68,230,0.22)",
  borderStrong: "rgba(100,67,244,0.4)",
  purple: "#6443F4",
  pink: "#F94498",
  success: "#02A65C",
  warning: "#FF9327",
  error: "#FF6B6B",
  info: "#01BEFF",
  white: "#FFFFFF",
  secondary: "#D3CFD8",
  muted: "#A79FB2",
  placeholder: "#7B6A94",
  gradient: ["#6443F4", "#F94498"],
};

const DnaEvolutionScreen = () => {
  return (
    <ScreenWrapper title="Your Travel Evolution" scrollable={true}>
      <View style={styles.container}>
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <View style={styles.cardContent}>
            <MaterialIcons name="flight-takeoff" size={32} color={DS.purple} />
            <Text style={styles.cardTitle}>Journeys Completed</Text>
            <Text style={styles.cardValue}>12</Text>
          </View>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <View style={styles.cardContent}>
            <MaterialIcons name="star" size={32} color={DS.pink} />
            <Text style={styles.cardTitle}>Elite Status Points</Text>
            <Text style={styles.cardValue}>8,500</Text>
          </View>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <View style={styles.cardContent}>
            <MaterialIcons name="redeem" size={32} color={DS.success} />
            <Text style={styles.cardTitle}>Rewards Redeemed</Text>
            <Text style={styles.cardValue}>3</Text>
          </View>
        </BlurView>

        <LinearGradient
          colors={[DS.purple, DS.pink] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.ctaButton}
        >
          <Text style={styles.ctaButtonText}>Explore New Adventures</Text>
          <MaterialIcons name="arrow-forward" size={20} color={DS.white} style={{ marginLeft: 8 }} />
        </LinearGradient>

        <Text style={styles.sectionHeader}>Upcoming Milestones</Text>

        <BlurView intensity={20} tint="dark" style={styles.milestoneCard}>
          <View style={styles.milestoneContent}>
            <MaterialIcons name="military-tech" size={24} color={DS.info} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.milestoneTitle}>Reach Platinum Tier</Text>
              <Text style={styles.milestoneDescription}>Accumulate 10,000 Elite Status Points</Text>
            </View>
            <Text style={styles.milestoneProgress}>85%</Text>
          </View>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.milestoneCard}>
          <View style={styles.milestoneContent}>
            <MaterialIcons name="card-giftcard" size={24} color={DS.warning} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.milestoneTitle}>Unlock Exclusive Lounge Access</Text>
              <Text style={styles.milestoneDescription}>Complete 20 international flights</Text>
            </View>
            <Text style={styles.milestoneProgress}>60%</Text>
          </View>
        </BlurView>

      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: DS.bg, // Ensure background is set if not fully handled by ScreenWrapper
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: "hidden",
    marginBottom: 15,
    padding: 20,
    alignItems: 'center',
  },
  cardContent: {
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.muted,
    marginTop: 10,
  },
  cardValue: {
    fontFamily: 'Chillax-Bold',
    fontSize: 32,
    color: DS.white,
    marginTop: 5,
  },
  ctaButton: {
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
  },
  sectionHeader: {
    fontFamily: 'Chillax-Bold',
    fontSize: 22,
    color: DS.white,
    marginBottom: 15,
    textAlign: 'center',
  },
  milestoneCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: "hidden",
    marginBottom: 10,
    padding: 15,
  },
  milestoneContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  milestoneTitle: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
  },
  milestoneDescription: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 13,
    color: DS.muted,
    marginTop: 2,
  },
  milestoneProgress: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.purple,
  },
});

export default DnaEvolutionScreen;
