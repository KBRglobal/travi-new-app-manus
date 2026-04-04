import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { ScreenWrapper } from "@/components/screen-wrapper";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// DS object as provided in the prompt
const DS = {
  bg: "#0A0514", surface: "rgba(36,16,62,0.55)", surfaceHigh: "rgba(50,20,80,0.7)",
  border: "rgba(123,68,230,0.22)", borderStrong: "rgba(100,67,244,0.4)",
  purple: "#6443F4", pink: "#F94498", success: "#02A65C", warning: "#FF9327",
  error: "#FF6B6B", info: "#01BEFF", white: "#FFFFFF", secondary: "#D3CFD8",
  muted: "#A79FB2", placeholder: "#7B6A94", gradient: ["#6443F4", "#F94498"],
};

const LoadingPaymentScreen = () => {
  return (
    <ScreenWrapper title="Payment Processing" scrollable={true}>
      <View style={styles.container}>
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <MaterialIcons name="payments" size={60} color={DS.purple} style={styles.icon} />
          <ActivityIndicator size="large" color={DS.pink} style={styles.activityIndicator} />
          <Text style={styles.title}>Processing Payment</Text>
          <Text style={styles.body}>Please wait while we securely process your transaction. This may take a few moments.</Text>
          {/* Example of a LinearGradient for a potential CTA, though not strictly needed for a loading screen */}
          {/* <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Cancel Payment</Text>
          </LinearGradient> */}
        </BlurView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DS.bg,
    padding: 20,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: "hidden",
    padding: 30,
    alignItems: 'center',
    width: '90%',
    maxWidth: 400,
  },
  icon: {
    marginBottom: 20,
  },
  activityIndicator: {
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Chillax-Bold',
    fontSize: 24,
    color: DS.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  body: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
    textAlign: 'center',
    lineHeight: 22,
  },
  gradientButton: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
  },
});

export default LoadingPaymentScreen;
