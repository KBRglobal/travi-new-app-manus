import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  location: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}

const scheduleData: ScheduleItem[] = [
  {
    id: '1',
    title: 'Flight to Paris',
    time: '08:00 AM',
    location: 'JFK Airport, Terminal 4',
    icon: 'flight-takeoff',
  },
  {
    id: '2',
    title: 'Hotel Check-in',
    time: '03:00 PM',
    location: 'The Parisian Hotel',
    icon: 'hotel',
  },
  {
    id: '3',
    title: 'Eiffel Tower Tour',
    time: '06:00 PM',
    location: 'Eiffel Tower, Paris',
    icon: 'tour',
  },
  {
    id: '4',
    title: 'Dinner Reservation',
    time: '08:30 PM',
    location: 'Le Jules Verne',
    icon: 'restaurant',
  },
];

const ScheduleScreen = () => {
  const renderScheduleItem = ({ item }: { item: ScheduleItem }) => (
    <BlurView intensity={20} style={styles.card}>
      <View style={styles.cardContent}>
        <MaterialIcons name={item.icon} size={24} color={DS.purple} style={styles.cardIcon} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardTimeLocation}>{item.time} - {item.location}</Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color={DS.muted} />
      </View>
    </BlurView>
  );

  return (
    <ScreenWrapper title="My Schedule" scrollable={true}>
      <FlatList
        data={scheduleData}
        renderItem={renderScheduleItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity activeOpacity={0.8} style={styles.ctaButton}>
        <LinearGradient
          colors={[DS.purple, DS.pink] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBackground}
        >
          <Text style={styles.ctaButtonText}>Add New Event</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // To ensure CTA doesn't cover last item
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginBottom: 15,
    padding: 15,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginBottom: 5,
  },
  cardTimeLocation: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.muted,
  },
  ctaButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientBackground: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
  },
});

export default ScheduleScreen;
