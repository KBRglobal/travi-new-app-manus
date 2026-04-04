import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// DS object exported from ScreenWrapper.tsx (as per prompt)

const SummaryScreen = () => {
  // Dummy data for demonstration
  const tripSummary = {
    destination: "Paris, France",
    dates: "Oct 26 - Nov 02, 2024",
    totalCost: "$2,500",
    flights: "2",
    hotels: "1",
    activities: "5",
    travelers: "2",
    status: "Confirmed",
  };

  const upcomingBookings = [
    { id: '1', type: 'Flight', details: 'JFK to CDG', date: 'Oct 26' },
    { id: '2', type: 'Hotel', details: 'The Ritz Paris', date: 'Oct 27' },
    { id: '3', type: 'Activity', details: 'Eiffel Tower Tour', date: 'Oct 28' },
  ];

  return (
    <ScreenWrapper title="Trip Summary" scrollable={true}>
      <View style={styles.section}>
        <Text style={styles.header}>Your Adventure Awaits!</Text>
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.cardContent}>
            <MaterialIcons name="location-on" size={24} color={DS.purple} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.label}>Destination</Text>
              <Text style={styles.body}>{tripSummary.destination}</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <MaterialIcons name="calendar-today" size={24} color={DS.pink} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.label}>Dates</Text>
              <Text style={styles.body}>{tripSummary.dates}</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <MaterialIcons name="attach-money" size={24} color={DS.success} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.label}>Total Cost</Text>
              <Text style={styles.body}>{tripSummary.totalCost}</Text>
            </View>
          </View>
        </BlurView>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Booking Details</Text>
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Flights:</Text>
            <Text style={styles.body}>{tripSummary.flights}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Hotels:</Text>
            <Text style={styles.body}>{tripSummary.hotels}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Activities:</Text>
            <Text style={styles.body}>{tripSummary.activities}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Travelers:</Text>
            <Text style={styles.body}>{tripSummary.travelers}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Status:</Text>
            <Text style={[styles.body, { color: DS.success }]}>{tripSummary.status}</Text>
          </View>
        </BlurView>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Upcoming Bookings</Text>
        {upcomingBookings.map((booking) => (
          <BlurView key={booking.id} intensity={20} tint="dark" style={[styles.glassCard, styles.smallMarginBottom]}>
            <View style={styles.cardContent}>
              <MaterialIcons
                name={booking.type === 'Flight' ? 'flight' : booking.type === 'Hotel' ? 'hotel' : 'local-activity'}
                size={20}
                color={DS.white}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.label}>{booking.type}</Text>
                <Text style={styles.body}>{booking.details} - {booking.date}</Text>
              </View>
            </View>
          </BlurView>
        ))}
      </View>

      <View style={styles.section}>
        <LinearGradient colors={[DS.purple, DS.pink] as const} style={styles.ctaButton}>
          <TouchableOpacity onPress={() => console.log('View Itinerary')} style={styles.ctaTouch}>
            <Text style={styles.ctaText}>View Full Itinerary</Text>
            <MaterialIcons name="arrow-forward" size={20} color={DS.white} style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient colors={[DS.purple, DS.pink] as const} style={[styles.ctaButton, { marginTop: 15 }]}>
          <TouchableOpacity onPress={() => console.log('Share Trip')} style={styles.ctaTouch}>
            <Text style={styles.ctaText}>Share Trip</Text>
            <MaterialIcons name="share" size={20} color={DS.white} style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  header: {
    fontFamily: 'Chillax-Bold', // Placeholder, assuming custom font loading
    fontSize: 26,
    color: DS.white,
    marginBottom: 15,
    textAlign: 'center',
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 15,
    marginBottom: 10,
  },
  smallMarginBottom: {
    marginBottom: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: DS.border,
  },
  label: {
    fontFamily: 'Satoshi-Medium', // Placeholder, assuming custom font loading
    fontSize: 14,
    color: DS.muted,
  },
  body: {
    fontFamily: 'Satoshi-Regular', // Placeholder, assuming custom font loading
    fontSize: 16,
    color: DS.white,
  },
  ctaButton: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
  },
  ctaTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  ctaText: {
    fontFamily: 'Chillax-Bold', // Placeholder, assuming custom font loading
    fontSize: 18,
    color: DS.white,
  },
});

export default SummaryScreen;
