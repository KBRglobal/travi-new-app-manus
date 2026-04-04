import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Assume fonts are loaded globally or via a custom font loader

const LiveDashboard = () => {
  // Dummy data for the live dashboard
  const tripData = {
    destination: 'Paris, France',
    currentActivity: 'Eiffel Tower Visit',
    nextActivity: 'Dinner at Le Jules Verne',
    timeRemaining: '2h 30m',
    notifications: [
      { id: '1', type: 'info', message: 'Your flight to Paris is on time.' },
      { id: '2', type: 'warning', message: 'Traffic ahead, consider alternative route to airport.' },
    ],
    upcomingEvents: [
      { id: '1', title: 'Louvre Museum', time: 'Tomorrow, 10:00 AM', icon: 'museum' },
      { id: '2', title: 'Seine River Cruise', time: 'Tomorrow, 07:00 PM', icon: 'boat' },
    ],
  };

  return (
    <ScreenWrapper title="Live Trip Dashboard" scrollable={true}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Trip Status</Text>
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.cardContent}>
            <Text style={styles.label}>Destination:</Text>
            <Text style={styles.value}>{tripData.destination}</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.label}>Current Activity:</Text>
            <Text style={styles.value}>{tripData.currentActivity}</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.label}>Next Activity:</Text>
            <Text style={styles.value}>{tripData.nextActivity}</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.label}>Time Remaining:</Text>
            <Text style={styles.value}>{tripData.timeRemaining}</Text>
          </View>
        </BlurView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        {tripData.notifications.map((notification) => (
          <BlurView key={notification.id} intensity={20} tint="dark" style={[styles.glassCard, styles.notificationCard]}>
            <MaterialIcons
              name={notification.type === 'info' ? 'info-outline' : 'warning'}
              size={20}
              color={notification.type === 'info' ? DS.info : DS.warning}
              style={styles.notificationIcon}
            />
            <Text style={[styles.bodyText, { color: notification.type === 'info' ? DS.info : DS.warning }]}>
              {notification.message}
            </Text>
          </BlurView>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        {tripData.upcomingEvents.map((event) => (
          <BlurView key={event.id} intensity={20} tint="dark" style={[styles.glassCard, styles.eventCard]}>
            <MaterialIcons name={event.icon as any} size={24} color={DS.purple} style={styles.eventIcon} />
            <View>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventTime}>{event.time}</Text>
            </View>
          </BlurView>
        ))}
      </View>

      <TouchableOpacity activeOpacity={0.8} style={styles.ctaButton}>
        <LinearGradient colors={[DS.purple, DS.pink] as const} style={styles.ctaGradient}>
          <Text style={styles.ctaText}>View Full Itinerary</Text>
          <MaterialIcons name="arrow-forward" size={20} color={DS.white} />
        </LinearGradient>
      </TouchableOpacity>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 22,
    color: DS.white,
    marginBottom: 15,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginBottom: 10,
    padding: 15,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
    color: DS.muted,
  },
  value: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.white,
    textAlign: 'right',
    flexShrink: 1,
    marginLeft: 10,
  },
  bodyText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.white,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  notificationIcon: {
    marginRight: 10,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  eventIcon: {
    marginRight: 15,
  },
  eventTitle: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
  },
  eventTime: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 12,
    color: DS.muted,
    marginTop: 2,
  },
  ctaButton: {
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 16,
    overflow: 'hidden',
  },
  ctaGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  ctaText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginRight: 10,
  },
});

export default LiveDashboard;
