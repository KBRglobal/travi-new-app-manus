import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const WalletKycScreen = () => {
  return (
    <ScreenWrapper title="Wallet KYC" scrollable={true}>
      <View style={styles.cardContainer}>
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <Text style={styles.cardTitle}>Verify Your Identity</Text>
          <Text style={styles.cardDescription}>
            To unlock full wallet features and increase transaction limits, please complete your KYC verification.
          </Text>
          <View style={styles.statusItem}>
            <MaterialIcons name="check-circle" size={20} color={DS.success} />
            <Text style={styles.statusText}>Basic Information Submitted</Text>
          </View>
          <View style={styles.statusItem}>
            <MaterialIcons name="pending" size={20} color={DS.warning} />
            <Text style={styles.statusText}>Document Upload Pending</Text>
          </View>
          <View style={styles.statusItem}>
            <MaterialIcons name="hourglass-empty" size={20} color={DS.muted} />
            <Text style={styles.statusText}>Verification Under Review</Text>
          </View>
          <TouchableOpacity style={styles.ctaButton}>
            <LinearGradient
              colors={[DS.purple, DS.pink] as const}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              <Text style={styles.ctaButtonText}>Continue Verification</Text>
              <MaterialIcons name="arrow-forward" size={20} color={DS.white} style={styles.ctaIcon} />
            </LinearGradient>
          </TouchableOpacity>
        </BlurView>
      </View>

      <View style={styles.cardContainer}>
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <Text style={styles.cardTitle}>Why KYC is Important</Text>
          <Text style={styles.cardDescription}>
            Know Your Customer (KYC) is a regulatory requirement that helps prevent financial crime and ensures the security of your funds.
            It also allows us to provide you with a more personalized and secure experience.
          </Text>
          <View style={styles.infoItem}>
            <MaterialIcons name="security" size={20} color={DS.purple} />
            <Text style={styles.infoText}>Enhanced Security</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="lock" size={20} color={DS.purple} />
            <Text style={styles.infoText}>Fraud Prevention</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="account-balance" size={20} color={DS.purple} />
            <Text style={styles.infoText}>Regulatory Compliance</Text>
          </View>
        </BlurView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 20,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 22,
    color: DS.white,
    marginBottom: 10,
  },
  cardDescription: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.muted,
    marginBottom: 20,
    lineHeight: 20,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
    marginLeft: 10,
  },
  ctaButton: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginRight: 10,
  },
  ctaIcon: {
    marginLeft: 5,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 15,
    color: DS.white,
    marginLeft: 10,
  },
});

export default WalletKycScreen;
