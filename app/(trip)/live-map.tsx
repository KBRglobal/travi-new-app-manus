import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

// DS object as provided in the prompt

const LiveMapScreen = () => {
  const router = useRouter();
  return (
    <ScreenWrapper title="Live Map" scrollable={true}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Current Trip</Text>
          <Text style={styles.headerSubtitle}>Exploring Paris, France</Text>
        </View>

        {/* Glass Card - Current Location */}
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.glassCardContent}>
            <MaterialIcons name="location-on" size={24} color={DS.purple} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.cardLabel}>Current Location</Text>
              <Text style={styles.cardValue}>Eiffel Tower, Paris</Text>
            </View>
          </View>
        </BlurView>

        {/* Glass Card - Next Destination */}
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.glassCardContent}>
            <MaterialIcons name="flag" size={24} color={DS.pink} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.cardLabel}>Next Destination</Text>
              <Text style={styles.cardValue}>Louvre Museum (2.5 km)</Text>
            </View>
          </View>
        </BlurView>

        {/* CTA Button */}
        <TouchableOpacity activeOpacity={0.8} style={styles.ctaButtonContainer}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaButton}
          >
            <MaterialIcons name="navigation" size={20} color={DS.white} />
            <Text style={styles.ctaButtonText}>Start Navigation</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Placeholder for Map or other content */}
        <View style={styles.mapPlaceholder}>
          <MaterialIcons name="map" size={60} color={DS.muted} />
          <Text style={styles.mapPlaceholderText}>Map content goes here</Text>
          <Text style={styles.mapPlaceholderSubText}>Real-time tracking and points of interest</Text>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: DS.bg, // Ensure background is set for the container within ScreenWrapper
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontFamily: 'Chillax-Bold', // Assuming font is loaded and available
    fontSize: 28,
    color: DS.white,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontFamily: 'Satoshi-Medium', // Assuming font is loaded and available
    fontSize: 16,
    color: DS.muted,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginBottom: 15,
    padding: 15,
  },
  glassCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLabel: {
    fontFamily: 'Satoshi-Medium', // Assuming font is loaded and available
    fontSize: 14,
    color: DS.muted,
  },
  cardValue: {
    fontFamily: 'Satoshi-Regular', // Assuming font is loaded and available
    fontSize: 18,
    color: DS.white,
    marginTop: 2,
  },
  ctaButtonContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 20,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold', // Assuming font is loaded and available
    fontSize: 18,
    color: DS.white,
    marginLeft: 10,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: DS.surfaceHigh,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 10,
  },
  mapPlaceholderText: {
    fontFamily: 'Satoshi-Medium', // Assuming font is loaded and available
    fontSize: 20,
    color: DS.white,
    marginTop: 10,
  },
  mapPlaceholderSubText: {
    fontFamily: 'Satoshi-Regular', // Assuming font is loaded and available
    fontSize: 14,
    color: DS.muted,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default LiveMapScreen;
