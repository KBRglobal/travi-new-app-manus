import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const TripSummary = () => {
  const router = useRouter();
  // Placeholder data for the trip summary
  const tripData = {
    destination: 'Paris, France',
    dates: 'Oct 26 - Nov 02, 2024',
    passengers: [
      { name: 'John Doe', type: 'Adult' },
      { name: 'Jane Doe', type: 'Adult' },
    ],
    totalPrice: '$2,450.00',
    status: 'Confirmed',
    bookingRef: 'TRV-789012',
  };

  return (
    <ScreenWrapper title="Trip Summary" scrollable={true}>
      <View style={styles.section}>
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <MaterialIcons name="flight" size={24} color={DS.purple} style={styles.icon} />
          <Text style={styles.cardTitle}>Your Destination</Text>
          <Text style={styles.cardText}>{tripData.destination}</Text>
          <Text style={styles.cardLabel}>Dates</Text>
          <Text style={styles.cardText}>{tripData.dates}</Text>
        </BlurView>
      </View>

      <View style={styles.section}>
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <MaterialIcons name="people" size={24} color={DS.purple} style={styles.icon} />
          <Text style={styles.cardTitle}>Passengers</Text>
          {tripData.passengers.map((p, index) => (
            <View key={index} style={styles.passengerItem}>
              <Text style={styles.cardText}>{p.name}</Text>
              <Text style={styles.cardLabel}>{p.type}</Text>
            </View>
          ))}
        </BlurView>
      </View>

      <View style={styles.section}>
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <MaterialIcons name="receipt" size={24} color={DS.purple} style={styles.icon} />
          <Text style={styles.cardTitle}>Booking Details</Text>
          <Text style={styles.cardLabel}>Booking Reference</Text>
          <Text style={styles.cardText}>{tripData.bookingRef}</Text>
          <Text style={[styles.cardText, { color: DS.success }]}>{tripData.status}</Text>
        </BlurView>
      </View>

      <View style={styles.section}>
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <MaterialIcons name="attach-money" size={24} color={DS.purple} style={styles.icon} />
          <Text style={styles.cardTitle}>Total Price</Text>
          <Text style={styles.priceText}>{tripData.totalPrice}</Text>
        </BlurView>
      </View>

      <View style={styles.ctaContainer}>
        <LinearGradient
          colors={[DS.purple, DS.pink] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.ctaButton}
        >
          <Text style={styles.ctaButtonText}>View Details</Text>
        </LinearGradient>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
  },
  icon: {
    marginBottom: 10,
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 22,
    color: DS.white,
    marginBottom: 10,
  },
  cardLabel: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
    color: DS.muted,
    marginTop: 10,
  },
  cardText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.white,
  },
  passengerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  priceText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 28,
    color: DS.white,
    marginTop: 10,
  },
  ctaContainer: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  ctaButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
  },
});

export default TripSummary;
