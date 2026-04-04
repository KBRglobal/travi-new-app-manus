import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TripHubScreen() {
  const upcomingTrips = [
    { id: '1', destination: 'Paris, France', date: 'Oct 26 - Nov 02', status: 'Confirmed' },
    { id: '2', destination: 'Tokyo, Japan', date: 'Dec 10 - Dec 18', status: 'Pending' },
  ];

  const pastTrips = [
    { id: '3', destination: 'Rome, Italy', date: 'Aug 15 - Aug 22', status: 'Completed' },
  ];

  const renderTripCard = (trip: typeof upcomingTrips[0]) => (
    <BlurView intensity={20} tint="dark" style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{trip.destination}</Text>
        <MaterialIcons name="arrow-forward-ios" size={16} color={DS.white} />
      </View>
      <Text style={styles.cardDate}>{trip.date}</Text>
      <View style={styles.statusContainer}>
        <MaterialIcons
          name={trip.status === 'Confirmed' ? 'check-circle' : trip.status === 'Pending' ? 'hourglass-empty' : 'done-all'}
          size={16}
          color={trip.status === 'Confirmed' ? DS.success : trip.status === 'Pending' ? DS.warning : DS.muted}
        />
        <Text style={[styles.cardStatus, { color: trip.status === 'Confirmed' ? DS.success : trip.status === 'Pending' ? DS.warning : DS.muted }]}>
          {trip.status}
        </Text>
      </View>
    </BlurView>
  );

  return (
    <ScreenWrapper title="Trip Hub" scrollable={true}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Trips</Text>
        {upcomingTrips.map(renderTripCard)}
        <TouchableOpacity style={styles.ctaButton}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.ctaButtonText}>Plan a New Trip</Text>
            <MaterialIcons name="add-circle-outline" size={20} color={DS.white} style={{ marginLeft: 8 }} />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Past Trips</Text>
        {pastTrips.map(renderTripCard)}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 20,
    color: DS.white,
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
  },
  cardDate: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.muted,
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardStatus: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
    marginLeft: 4,
  },
  ctaButton: {
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
  },
});
