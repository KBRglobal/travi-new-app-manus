import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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

const AlertsScreen = () => {
  return (
    <ScreenWrapper title="Alerts" scrollable={true}>
      <View style={styles.container}>
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <MaterialIcons name="notifications" size={30} color={DS.purple} />
          <Text style={styles.cardTitle}>Upcoming Trip Alert</Text>
          <Text style={styles.cardMessage}>Your flight to Paris is scheduled for tomorrow at 10:00 AM. Don't forget your passport!</Text>
          <LinearGradient colors={[DS.purple, DS.pink] as const} style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>View Details</Text>
          </LinearGradient>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <MaterialIcons name="local-offer" size={30} color={DS.pink} />
          <Text style={styles.cardTitle}>New Offer Available</Text>
          <Text style={styles.cardMessage}>Exclusive discount on hotel bookings for your next adventure. Limited time only!</Text>
          <LinearGradient colors={[DS.purple, DS.pink] as const} style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Explore Offers</Text>
          </LinearGradient>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <MaterialIcons name="security" size={30} color={DS.success} />
          <Text style={styles.cardTitle}>Security Update</Text>
          <Text style={styles.cardMessage}>Your account security settings have been updated successfully.</Text>
          <LinearGradient colors={[DS.purple, DS.pink] as const} style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Review Settings</Text>
          </LinearGradient>
        </BlurView>
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
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 20,
    color: DS.white,
    marginTop: 10,
    marginBottom: 5,
  },
  cardMessage: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
    textAlign: 'center',
    marginBottom: 15,
  },
  ctaButton: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginTop: 10,
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
    fontWeight: 'bold',
  },
});

export default AlertsScreen;
