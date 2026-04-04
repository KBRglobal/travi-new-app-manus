import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper'; // Assuming this path is correct and exports DS

// Dummy DS object for local reference, assuming ScreenWrapper provides the actual one

// Assuming custom fonts are loaded globally or via a custom hook
// For this example, we'll define font families directly.
const fontFamilies = {
  'Chillax-Bold': 'Chillax-Bold',
  'Satoshi-Medium': 'Satoshi-Medium',
  'Satoshi-Regular': 'Satoshi-Regular',
};

const TripPrepScreen = () => {
  return (
    <ScreenWrapper title="Trip Preparation" scrollable={true}>
      <View style={styles.contentContainer}>
        <Text style={styles.header}>Your Upcoming Adventure</Text>

        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <MaterialIcons name="flight-takeoff" size={24} color={DS.purple} style={styles.cardIcon} />
          <Text style={styles.cardTitle}>Flight Details</Text>
          <Text style={styles.cardBody}>Review your flight itinerary and boarding passes.</Text>
          <TouchableOpacity style={styles.cardButton}>
            <Text style={styles.cardButtonText}>View Flights</Text>
          </TouchableOpacity>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <MaterialIcons name="hotel" size={24} color={DS.pink} style={styles.cardIcon} />
          <Text style={styles.cardTitle}>Accommodation</Text>
          <Text style={styles.cardBody}>Confirm your hotel bookings and check-in information.</Text>
          <TouchableOpacity style={styles.cardButton}>
            <Text style={styles.cardButtonText}>View Hotels</Text>
          </TouchableOpacity>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <MaterialIcons name="directions-car" size={24} color={DS.success} style={styles.cardIcon} />
          <Text style={styles.cardTitle}>Transportation</Text>
          <Text style={styles.cardBody}>Organize your ground transportation and rentals.</Text>
          <TouchableOpacity style={styles.cardButton}>
            <Text style={styles.cardButtonText}>View Transport</Text>
          </TouchableOpacity>
        </BlurView>

        <TouchableOpacity style={styles.ctaButton}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.ctaButtonText}>Complete Pre-Trip Checklist</Text>
            <MaterialIcons name="arrow-forward" size={20} color={DS.white} style={styles.ctaIcon} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    gap: 20,
  },
  header: {
    fontFamily: fontFamilies['Chillax-Bold'],
    fontSize: 28,
    color: DS.white,
    marginBottom: 20,
    textAlign: 'center',
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: "hidden",
    padding: 20,
    alignItems: 'center',
  },
  cardIcon: {
    marginBottom: 10,
  },
  cardTitle: {
    fontFamily: fontFamilies['Satoshi-Medium'],
    fontSize: 20,
    color: DS.white,
    marginBottom: 5,
  },
  cardBody: {
    fontFamily: fontFamilies['Satoshi-Regular'],
    fontSize: 14,
    color: DS.muted,
    textAlign: 'center',
    marginBottom: 15,
  },
  cardButton: {
    backgroundColor: DS.surfaceHigh,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cardButtonText: {
    fontFamily: fontFamilies['Satoshi-Medium'],
    color: DS.white,
    fontSize: 16,
  },
  ctaButton: {
    marginTop: 30,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    gap: 10,
  },
  ctaButtonText: {
    fontFamily: fontFamilies['Chillax-Bold'],
    color: DS.white,
    fontSize: 18,
  },
  ctaIcon: {
    marginLeft: 5,
  },
});

export default TripPrepScreen;
