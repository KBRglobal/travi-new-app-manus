import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const TripScreen = () => {
  const router = useRouter();
  const tripData = {
    title: 'European Adventure',
    destination: 'Paris, France',
    dates: 'Oct 26 - Nov 02, 2024',
    status: 'Confirmed',
    price: '€1,250',
    details: [
      { icon: 'flight', label: 'Flights', value: 'Round trip' },
      { icon: 'hotel', label: 'Accommodation', value: 'Hotel Luxe' },
      { icon: 'event', label: 'Activities', value: 'Eiffel Tower, Louvre' },
    ],
    cta: 'View Details',
  };

  return (
    <ScreenWrapper title="Your Trip" scrollable={true}>
      <View style={styles.container}>
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{tripData.title}</Text>
            <Text style={styles.cardSubtitle}>{tripData.destination}</Text>
            <Text style={styles.cardDates}>{tripData.dates}</Text>
            <View style={styles.statusContainer}>
              <MaterialIcons name="check-circle" size={16} color={DS.success} />
              <Text style={styles.statusText}>{tripData.status}</Text>
            </View>
          </View>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <View style={styles.cardContent}>
            {tripData.details.map((item, index) => (
              <View key={index} style={styles.detailRow}>
                <MaterialIcons name={item.icon as any} size={20} color={DS.purple} />
                <Text style={styles.detailLabel}>{item.label}:</Text>
                <Text style={styles.detailValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.priceLabel}>Total Price:</Text>
            <Text style={styles.priceValue}>{tripData.price}</Text>
            <TouchableOpacity style={styles.ctaButton} onPress={() => router.push("/(dna)/categories" as any)}>
              <LinearGradient
                colors={[DS.purple, DS.pink] as const}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientButton}
              >
                <Text style={styles.ctaButtonText}>{tripData.cta}</Text>
                <MaterialIcons name="arrow-forward" size={20} color={DS.white} style={styles.ctaIcon} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
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
    marginBottom: 20,
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 24,
    color: DS.white,
    marginBottom: 5,
  },
  cardSubtitle: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.secondary,
    marginBottom: 10,
  },
  cardDates: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
    marginBottom: 15,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.success,
    marginLeft: 5,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabel: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.secondary,
    marginLeft: 10,
  },
  detailValue: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.white,
    marginLeft: 5,
  },
  priceLabel: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.secondary,
    marginBottom: 5,
  },
  priceValue: {
    fontFamily: 'Chillax-Bold',
    fontSize: 32,
    color: DS.white,
    marginBottom: 20,
  },
  ctaButton: {
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
    // No specific styles needed, color is set directly
  },
});

export default TripScreen;
