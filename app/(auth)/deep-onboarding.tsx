import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// DS object exported from ScreenWrapper.tsx

const DeepOnboarding = () => {
  return (
    <ScreenWrapper title="Deep Onboarding" scrollable={true}>
      <View style={styles.contentContainer}>
        <Text style={styles.headerTitle}>Welcome to TRAVI!</Text>
        <Text style={styles.headerSubtitle}>Let's get you set up for an amazing journey.</Text>

        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <MaterialIcons name="flight" size={48} color={DS.purple} style={styles.cardIcon} />
          <Text style={styles.cardTitle}>Your Travel Companion</Text>
          <Text style={styles.cardBody}>TRAVI helps you discover, plan, and book your dream trips with ease. Get ready to explore the world!</Text>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <MaterialIcons name="security" size={48} color={DS.pink} style={styles.cardIcon} />
          <Text style={styles.cardTitle}>Secure & Private</Text>
          <Text style={styles.cardBody}>Your data is protected with top-tier security. Travel with peace of mind, knowing your information is safe.</Text>
        </BlurView>

        <TouchableOpacity activeOpacity={0.8} style={styles.ctaButton}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            <Text style={styles.ctaButtonText}>Get Started</Text>
            <MaterialIcons name="arrow-forward" size={20} color={DS.white} style={styles.ctaIcon} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: DS.bg, // Ensure background is set if ScreenWrapper doesn't cover it fully or for visual consistency
  },
  headerTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 32,
    color: DS.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 18,
    color: DS.muted,
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
  },
  cardIcon: {
    marginBottom: 15,
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 22,
    color: DS.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  cardBody: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.secondary,
    textAlign: 'center',
  },
  ctaButton: {
    width: '90%',
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 30,
  },
  gradientBackground: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
    marginRight: 10,
  },
  ctaIcon: {
    // No specific styling needed, just ensure it's visible
  },
});

export default DeepOnboarding;
