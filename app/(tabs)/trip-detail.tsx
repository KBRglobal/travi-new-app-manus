import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const TripDetailScreen = () => {
  return (
    <ScreenWrapper title="Trip Details" scrollable={true}>
      <View style={styles.section}>
        <Text style={styles.headerTitle}>Trip to Paris</Text>
        <Text style={styles.headerSubtitle}>October 26 - November 2, 2024</Text>
      </View>

      <BlurView intensity={20} tint="dark" style={styles.card}>
        <Text style={styles.cardTitle}>Accommodation</Text>
        <Text style={styles.cardContent}>Hotel Le Littré</Text>
        <Text style={styles.cardContent}>10 Rue de l'Abbé Grégoire, 75006 Paris, France</Text>
      </BlurView>

      <BlurView intensity={20} tint="dark" style={styles.card}>
        <Text style={styles.cardTitle}>Flights</Text>
        <Text style={styles.cardContent}>Outbound: JFK to CDG (Oct 26)</Text>
        <Text style={styles.cardContent}>Return: CDG to JFK (Nov 2)</Text>
      </BlurView>

      <BlurView intensity={20} tint="dark" style={styles.card}>
        <Text style={styles.cardTitle}>Activities</Text>
        <Text style={styles.cardContent}>Eiffel Tower, Louvre Museum, Seine River Cruise</Text>
      </BlurView>

      <TouchableOpacity style={styles.ctaButton}>
        <LinearGradient
          colors={[DS.purple, DS.pink] as const}
          style={styles.gradientBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.ctaButtonText}>View Itinerary <MaterialIcons name="arrow-forward" size={18} color={DS.white} /></Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  headerTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 28,
    color: DS.white,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.muted,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 15,
    marginBottom: 15,
  },
  cardTitle: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
    marginBottom: 5,
  },
  cardContent: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.secondary,
    marginBottom: 2,
  },
  ctaButton: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientBackground: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
    marginRight: 5,
  },
});

export default TripDetailScreen;
