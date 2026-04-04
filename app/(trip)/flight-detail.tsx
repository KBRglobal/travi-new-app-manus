import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper'; // Assuming this path
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming @expo/vector-icons is installed

// DS object exported from ScreenWrapper.tsx

// Assuming custom fonts are loaded globally or handled by a theme provider
// For this example, we'll define them directly in styles, but in a real app,
// you'd likely use a global font solution.
const typography = {
  ChillaxBold: 'Chillax-Bold',
  SatoshiMedium: 'Satoshi-Medium',
  SatoshiRegular: 'Satoshi-Regular',
};

const FlightDetailScreen = () => {
  return (
    <ScreenWrapper title="Flight Details" scrollable={true}>
      <View style={styles.contentContainer}>
        {/* Departure Card */}
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="flight-takeoff" size={24} color={DS.purple} />
            <Text style={styles.cardTitle}>Departure</Text>
          </View>
          <Text style={styles.label}>Airport</Text>
          <Text style={styles.value}>New York (JFK)</Text>
          <Text style={styles.label}>Date & Time</Text>
          <Text style={styles.value}>2026-04-04, 10:00 AM</Text>
        </BlurView>

        {/* Arrival Card */}
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="flight-land" size={24} color={DS.pink} />
            <Text style={styles.cardTitle}>Arrival</Text>
          </View>
          <Text style={styles.label}>Airport</Text>
          <Text style={styles.value}>London (LHR)</Text>
          <Text style={styles.label}>Date & Time</Text>
          <Text style={styles.value}>2026-04-04, 08:00 PM</Text>
        </BlurView>

        {/* Flight Info Card */}
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="airplane-ticket" size={24} color={DS.success} />
            <Text style={styles.cardTitle}>Flight Information</Text>
          </View>
          <Text style={styles.label}>Flight Number</Text>
          <Text style={styles.value}>BA286</Text>
          <Text style={styles.label}>Airline</Text>
          <Text style={styles.value}>British Airways</Text>
        </BlurView>

        {/* CTA Button */}
        <TouchableOpacity activeOpacity={0.8} style={styles.ctaButtonContainer}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaButtonGradient}
          >
            <Text style={styles.ctaButtonText}>View Boarding Pass</Text>
            <MaterialIcons name="arrow-forward" size={20} color={DS.white} style={{ marginLeft: 8 }} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    paddingBottom: 40, // Add some padding at the bottom for scrollable content
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: "hidden",
    padding: 20,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontFamily: typography.ChillaxBold,
    fontSize: 20,
    color: DS.white,
    marginLeft: 10,
  },
  label: {
    fontFamily: typography.SatoshiMedium,
    fontSize: 14,
    color: DS.muted,
    marginTop: 10,
  },
  value: {
    fontFamily: typography.SatoshiRegular,
    fontSize: 16,
    color: DS.white,
    marginBottom: 5,
  },
  ctaButtonContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 20,
  },
  ctaButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 25,
  },
  ctaButtonText: {
    fontFamily: typography.ChillaxBold,
    fontSize: 18,
    color: DS.white,
  },
});

export default FlightDetailScreen;
