import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const FlightsScreen = () => {
  const router = useRouter();
  return (
    <ScreenWrapper title="Your Flights" scrollable={true}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Trips</Text>
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.flightDetails}>
              <Text style={styles.flightRoute}>NYC to LAX</Text>
              <Text style={styles.flightDate}>April 20, 2026</Text>
            </View>
            <MaterialIcons name="flight-takeoff" size={24} color={DS.purple} />
          </View>
          <TouchableOpacity style={styles.cardButton} onPress={() => router.push('/(trip)/ai-chat' as any)}>
            <Text style={styles.cardButtonText}>View Details</Text>
          </TouchableOpacity>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.flightDetails}>
              <Text style={styles.flightRoute}>LDN to PAR</Text>
              <Text style={styles.flightDate}>May 15, 2026</Text>
            </View>
            <MaterialIcons name="flight-land" size={24} color={DS.pink} />
          </View>
          <TouchableOpacity style={styles.cardButton} onPress={() => router.push('/(trip)/ai-chat' as any)}>
            <Text style={styles.cardButtonText}>View Details</Text>
          </TouchableOpacity>
        </BlurView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Find New Flights</Text>
        <LinearGradient
          colors={[DS.purple, DS.pink] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.ctaButton}
        >
          <TouchableOpacity style={styles.ctaButtonInner} onPress={() => router.push('/(trip)/hotels' as any)}>
            <MaterialIcons name="search" size={24} color={DS.white} />
            <Text style={styles.ctaButtonText}>Search Flights</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 22,
    color: DS.white,
    marginBottom: 15,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginBottom: 15,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  flightDetails: {
    flex: 1,
  },
  flightRoute: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
    marginBottom: 5,
  },
  flightDate: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.muted,
  },
  cardButton: {
    backgroundColor: DS.surfaceHigh,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  cardButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.purple,
  },
  ctaButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  ctaButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    gap: 10,
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
  },
});

export default FlightsScreen;
