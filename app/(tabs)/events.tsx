import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const eventsData = [
  {
    id: '1',
    title: 'TRAVI Conference 2024',
    date: 'Oct 26, 2024',
    location: 'Virtual Event',
    description: 'Join us for the annual TRAVI Conference, featuring industry leaders and innovators.',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Global Travel Summit',
    date: 'Nov 15, 2024',
    location: 'New York, USA',
    description: 'Explore the future of travel with experts from around the globe.',
    isFeatured: false,
  },
  {
    id: '3',
    title: 'Adventure Expo',
    date: 'Dec 01, 2024',
    location: 'Denver, USA',
    description: 'Discover new destinations and gear for your next adventure.',
    isFeatured: false,
  },
];

export default function EventsScreen() {
  const router = useRouter();
  return (
    <ScreenWrapper title="Upcoming Events" scrollable={true}>
      {eventsData.map((event) => (
        <BlurView key={event.id} intensity={20} tint="dark" style={styles.card}>
          <View style={styles.cardContent}>
            <View>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDetails}>
                <MaterialIcons name="calendar-today" size={14} color={DS.muted} /> {event.date}
              </Text>
              <Text style={styles.eventDetails}>
                <MaterialIcons name="location-on" size={14} color={DS.muted} /> {event.location}
              </Text>
              <Text style={styles.eventDescription}>{event.description}</Text>
            </View>
            {event.isFeatured && (
              <LinearGradient colors={[DS.purple, DS.pink] as const} style={styles.featuredBadge}>
                <Text style={styles.featuredText}>Featured</Text>
              </LinearGradient>
            )}
          </View>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/explore' as any)}>
            <LinearGradient colors={[DS.purple, DS.pink] as const} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>View Details</Text>
              <MaterialIcons name="arrow-forward" size={20} color={DS.white} style={styles.buttonIcon} />
            </LinearGradient>
          </TouchableOpacity>
        </BlurView>
      ))}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginBottom: 20,
    padding: 20,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  eventTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 20,
    color: DS.white,
    marginBottom: 5,
  },
  eventDetails: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
    color: DS.muted,
    marginBottom: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventDescription: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.secondary,
    marginTop: 10,
  },
  featuredBadge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  featuredText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 12,
    color: DS.white,
  },
  button: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
    marginRight: 5,
  },
  buttonIcon: {
    marginLeft: 5,
  },
});
