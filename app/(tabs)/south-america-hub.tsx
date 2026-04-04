import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

// The DS object is assumed to be exported from ScreenWrapper.tsx
// For demonstration purposes, defining it here as per the prompt.

const SouthAmericaHub = () => {
  return (
    <ScreenWrapper title="South America Hub" scrollable={true}>
      <View style={styles.contentContainer}>
        {/* Header Section */}
        <Text style={styles.headerTitle}>Explore South America</Text>
        <Text style={styles.bodyText}>Discover breathtaking landscapes, vibrant cultures, and unforgettable adventures across the continent.</Text>

        {/* Glass Cards Section */}
        <Text style={styles.sectionTitle}>Popular Destinations</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardScrollContainer}>
          {[1, 2, 3].map((item) => (
            <BlurView key={item} intensity={20} tint="dark" style={styles.glassCard}>
              <MaterialIcons name="location-city" size={30} color={DS.purple} />
              <Text style={styles.cardTitle}>City Name {item}</Text>
              <Text style={styles.cardLabel}>Country</Text>
              <Text style={styles.cardBody}>A brief description of the city and its attractions.</Text>
            </BlurView>
          ))}
        </ScrollView>

        {/* CTA Section */}
        <Text style={styles.sectionTitle}>Plan Your Trip</Text>
        <LinearGradient
          colors={[DS.purple, DS.pink] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.ctaButton}
        >
          <MaterialIcons name="flight-takeoff" size={24} color={DS.white} />
          <Text style={styles.ctaButtonText}>Book Your Adventure Now</Text>
        </LinearGradient>

        {/* Another Section */}
        <Text style={styles.sectionTitle}>Travel Tips</Text>
        <BlurView intensity={20} tint="dark" style={styles.glassCardFullWidth}>
          <Text style={styles.cardTitle}>Essential Packing List</Text>
          <Text style={styles.cardBody}>Don't forget your essentials for a smooth journey. Always check local weather.</Text>
          <MaterialIcons name="arrow-forward" size={20} color={DS.pink} style={styles.cardIconRight} />
        </BlurView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    gap: 20,
  },
  headerTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 28,
    color: DS.white,
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 22,
    color: DS.white,
    marginTop: 10,
    marginBottom: 5,
  },
  bodyText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
    lineHeight: 24,
  },
  cardScrollContainer: {
    paddingVertical: 10,
    gap: 15,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 15,
    width: 200,
    height: 180,
    justifyContent: 'space-between',
    marginRight: 10,
  },
  glassCardFullWidth: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
  },
  cardLabel: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
    color: DS.secondary,
  },
  cardBody: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.muted,
  },
  cardIconRight: {
    marginLeft: 10,
  },
  ctaButton: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
  },
});

export default SouthAmericaHub;
