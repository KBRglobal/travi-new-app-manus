import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper'; // Assuming DS is exported from here
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const ItineraryScreen = () => {
  const router = useRouter();
  const itineraryData = [
    {
      id: '1',
      title: 'Day 1: Arrival in Paris',
      details: [
        '- Arrive at Charles de Gaulle Airport (CDG)',
        '- Check into Hotel Le Grand Paris',
        '- Evening: Eiffel Tower visit',
      ],
    },
    {
      id: '2',
      title: 'Day 2: Louvre Museum & Seine River Cruise',
      details: [
        '- Morning: Louvre Museum tour',
        '- Afternoon: Seine River cruise',
        '- Evening: Dinner in Montmartre',
      ],
    },
    {
      id: '3',
      title: 'Day 3: Versailles Palace & Montmartre',
      details: [
        '- Morning: Day trip to Versailles Palace',
        '- Afternoon: Explore Montmartre and Sacré-Cœur Basilica',
        '- Evening: Cabaret show at Moulin Rouge',
      ],
    },
    {
      id: '4',
      title: 'Day 4: Departure',
      details: [
        '- Morning: Last-minute souvenir shopping',
        '- Afternoon: Transfer to Charles de Gaulle Airport (CDG)',
        '- Depart from Paris',
      ],
    },
  ];

  return (
    <ScreenWrapper title="Your Trip Itinerary" scrollable={true}>
      <View style={styles.container}>
        {itineraryData.map((day) => (
          <BlurView key={day.id} intensity={20} style={styles.card}>
            <Text style={styles.cardTitle}>{day.title}</Text>
            {day.details.map((detail, index) => (
              <View key={index} style={styles.detailRow}>
                <MaterialIcons name="check-circle-outline" size={16} color={DS.success} style={styles.detailIcon} />
                <Text style={styles.cardText}>{detail}</Text>
              </View>
            ))}
          </BlurView>
        ))}

        <TouchableOpacity activeOpacity={0.8} style={styles.ctaButton}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            <Text style={styles.ctaButtonText}>View Trip Details</Text>
            <MaterialIcons name="arrow-forward" size={20} color={DS.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
    marginBottom: 15,
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 20,
    color: DS.white,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailIcon: {
    marginRight: 8,
  },
  cardText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
    flexShrink: 1,
  },
  ctaButton: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
    marginRight: 10,
  },
});

export default ItineraryScreen;
