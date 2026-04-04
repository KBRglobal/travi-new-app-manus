import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

// Mock data for flights
const mockFlights = [
  {
    id: '1',
    airline: 'TRAVI Air',
    departureTime: '08:00 AM',
    arrivalTime: '10:30 AM',
    duration: '2h 30m',
    price: '$150',
    stops: 'Direct',
  },
  {
    id: '2',
    airline: 'TRAVI Express',
    departureTime: '11:00 AM',
    arrivalTime: '02:00 PM',
    duration: '3h 00m',
    price: '$180',
    stops: '1 Stop',
  },
  {
    id: '3',
    airline: 'TRAVI Global',
    departureTime: '03:00 PM',
    arrivalTime: '05:30 PM',
    duration: '2h 30m',
    price: '$165',
    stops: 'Direct',
  },
];

const FlightSelectScreen = () => {
  const router = useRouter();
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);

  return (
    <ScreenWrapper title="Select Flight" scrollable={true}>
      <View style={styles.container}>
        {mockFlights.map((flight) => (
          <TouchableOpacity
            key={flight.id}
            style={styles.flightCardWrapper}
            onPress={() => setSelectedFlight(flight.id)}
          >
            <BlurView
              intensity={20}
              tint="dark"
              style={[
                styles.flightCard,
                selectedFlight === flight.id && styles.selectedFlightCard,
              ]}
            >
              <View style={styles.flightDetails}>
                <Text style={styles.airlineText}>{flight.airline}</Text>
                <Text style={styles.timeText}>{flight.departureTime} - {flight.arrivalTime}</Text>
                <Text style={styles.durationText}>{flight.duration} ({flight.stops})</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>{flight.price}</Text>
                {selectedFlight === flight.id && (
                  <MaterialIcons name="check-circle" size={24} color={DS.success} style={styles.checkIcon} />
                )}
              </View>
            </BlurView>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => console.log('Proceed with selected flight:', selectedFlight)}
          disabled={!selectedFlight}
        >
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.ctaButtonText}>Proceed</Text>
            <MaterialIcons name="arrow-forward" size={24} color={DS.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  flightCardWrapper: {
    marginBottom: 15,
  },
  flightCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  selectedFlightCard: {
    borderColor: DS.purple,
    borderWidth: 2,
  },
  flightDetails: {
    flex: 1,
  },
  airlineText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginBottom: 5,
  },
  timeText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.secondary,
    marginBottom: 3,
  },
  durationText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.muted,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 20,
    color: DS.white,
    marginRight: 10,
  },
  checkIcon: {
    marginLeft: 5,
  },
  ctaButton: {
    marginTop: 30,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginRight: 10,
  },
});

export default FlightSelectScreen;
