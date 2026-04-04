import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const SurpriseTripScreen = () => {
  const tripDetails = {
    destination: 'Paris, France',
    date: 'October 26 - November 2, 2024',
    activity: 'Eiffel Tower Dinner Cruise',
    accommodation: 'Boutique Hotel Le Littré',
  };

  return (
    <ScreenWrapper title="Your Surprise Trip!" scrollable={true}>
      <View style={styles.container}>
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <MaterialIcons name="flight" size={32} color={DS.purple} style={styles.icon} />
          <Text style={styles.cardTitle}>Destination Revealed!</Text>
          <Text style={styles.cardText}>{tripDetails.destination}</Text>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <MaterialIcons name="calendar-today" size={32} color={DS.pink} style={styles.icon} />
          <Text style={styles.cardTitle}>When You're Going</Text>
          <Text style={styles.cardText}>{tripDetails.date}</Text>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <MaterialIcons name="local-activity" size={32} color={DS.success} style={styles.icon} />
          <Text style={styles.cardTitle}>Your Main Activity</Text>
          <Text style={styles.cardText}>{tripDetails.activity}</Text>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <MaterialIcons name="hotel" size={32} color={DS.warning} style={styles.icon} />
          <Text style={styles.cardTitle}>Where You'll Stay</Text>
          <Text style={styles.cardText}>{tripDetails.accommodation}</Text>
        </BlurView>

        <TouchableOpacity style={styles.ctaButton}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.ctaButtonText}>View Full Itinerary</Text>
            <MaterialIcons name="arrow-forward" size={20} color={DS.white} style={{ marginLeft: 8 }} />
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
    alignItems: 'center',
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 22,
    color: DS.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  cardText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
    textAlign: 'center',
  },
  ctaButton: {
    width: '100%',
    marginTop: 20,
    borderRadius: 16,
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
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
  },
});

export default SurpriseTripScreen;
