import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// DS object exported from ScreenWrapper.tsx
const DS = {
  bg: "#0A0514", surface: "rgba(36,16,62,0.55)", surfaceHigh: "rgba(50,20,80,0.7)",
  border: "rgba(123,68,230,0.22)", borderStrong: "rgba(100,67,244,0.4)",
  purple: "#6443F4", pink: "#F94498", success: "#02A65C", warning: "#FF9327",
  error: "#FF6B6B", info: "#01BEFF", white: "#FFFFFF", secondary: "#D3CFD8",
  muted: "#A79FB2", placeholder: "#7B6A94", gradient: ["#6443F4", "#F94498"],
};

const CompatibilityScreen = () => {
  const router = useRouter();
  return (
    <ScreenWrapper title="Compatibility" scrollable={true}>
      <View style={styles.container}>
        <Text style={styles.header}>Find Your Travel Match</Text>
        <Text style={styles.bodyText}>
          Discover how compatible you are with other travelers based on your preferences and travel styles.
          Our advanced algorithm analyzes various factors to help you find the perfect companion for your next adventure.
        </Text>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <View style={styles.cardContent}>
            <MaterialIcons name="people" size={30} color={DS.purple} />
            <Text style={styles.cardTitle}>Compatibility Score</Text>
            <Text style={styles.cardBody}>
              Your current compatibility score is 85%. Explore profiles to see detailed breakdowns.
            </Text>
            <TouchableOpacity style={styles.button}>
              <LinearGradient
                colors={[DS.purple, DS.pink] as const}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>View Matches</Text>
                <MaterialIcons name="arrow-forward" size={20} color={DS.white} style={{ marginLeft: 8 }} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </BlurView>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How it Works</Text>
          <Text style={styles.bodyText}>
            We analyze your travel history, interests, and personality traits to provide accurate compatibility insights.
            Connect with like-minded individuals and make your journeys unforgettable.
          </Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Update Preferences</Text>
            <MaterialIcons name="settings" size={20} color={DS.white} style={{ marginLeft: 8 }} />
          </LinearGradient>
        </TouchableOpacity>

      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontFamily: 'Chillax-Bold',
    fontSize: 32,
    color: DS.white,
    marginBottom: 15,
    textAlign: 'center',
  },
  bodyText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 24,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginBottom: 30,
    padding: 20,
    alignItems: 'center',
  },
  cardContent: {
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 22,
    color: DS.white,
    marginTop: 10,
    marginBottom: 10,
  },
  cardBody: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 15,
    color: DS.secondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  button: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 10,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
  },
  section: {
    marginBottom: 30,
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 24,
    color: DS.white,
    marginBottom: 15,
  },
});

export default CompatibilityScreen;
