import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

// Dummy data for the live timeline
const timelineEvents = [
  {
    id: '1',
    time: '08:00 AM',
    title: 'Flight Departure',
    description: 'Your flight to Paris (AF123) departs from Gate A12.',
    icon: 'flight-takeoff',
    status: 'success',
  },
  {
    id: '2',
    time: '11:30 AM',
    title: 'Arrival in Paris',
    description: 'Welcome to Paris! Proceed to baggage claim.',
    icon: 'flight-land',
    status: 'info',
  },
  {
    id: '3',
    time: '12:30 PM',
    title: 'Hotel Check-in',
    description: 'Check-in at The Parisian Hotel, 123 Rue de la Paix.',
    icon: 'hotel',
    status: 'warning',
  },
  {
    id: '4',
    time: '02:00 PM',
    title: 'Eiffel Tower Visit',
    description: 'Meet your guide at the base of the Eiffel Tower.',
    icon: 'tour',
    status: 'muted',
  },
  {
    id: '5',
    time: '07:00 PM',
    title: 'Dinner Reservation',
    description: 'Dinner at Le Jules Verne, Eiffel Tower.',
    icon: 'restaurant',
    status: 'muted',
  },
];

const LiveTimelineScreen = () => {
  const router = useRouter();
  return (
    <ScreenWrapper title="Live Trip Timeline" scrollable={true}>
      <View style={styles.container}>
        {timelineEvents.map((event, index) => (
          <View key={event.id} style={styles.eventCardContainer}>
            <BlurView intensity={20} tint="dark" style={styles.blurView}>
              <View style={styles.eventContent}>
                <View style={styles.iconTimeContainer}>
                  <MaterialIcons
                    name={event.icon as any}
                    size={24}
                    color={DS.white}
                    style={styles.eventIcon}
                  />
                  <Text style={styles.eventTime}>{event.time}</Text>
                </View>
                <View style={styles.eventDetails}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDescription}>{event.description}</Text>
                </View>
              </View>
              {index === 0 && (
                <LinearGradient
                  colors={[DS.purple, DS.pink] as const}
                  start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                  style={styles.ctaButton}
                >
                  <Text style={styles.ctaButtonText}>View Details</Text>
                </LinearGradient>
              )}
            </BlurView>
          </View>
        ))}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  eventCardContainer: {
    marginBottom: 15,
    borderRadius: 16,
    overflow: 'hidden',
  },
  blurView: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 15,
  },
  eventContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  iconTimeContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  eventIcon: {
    marginBottom: 5,
  },
  eventTime: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 12,
    color: DS.muted,
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginBottom: 5,
  },
  eventDescription: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.secondary,
  },
  ctaButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
  },
});

export default LiveTimelineScreen;
