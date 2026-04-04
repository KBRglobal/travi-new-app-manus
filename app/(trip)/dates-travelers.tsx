import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const DatesTravelersScreen = () => {
  const router = useRouter();
  const [selectedDates, setSelectedDates] = useState('Select Dates');
  const [travelers, setTravelers] = useState(1);

  const handleDateSelection = () => {
    // In a real app, this would navigate to a date picker or open a modal
    alert('Date picker would open here!');
  };

  const handleTravelerChange = (change: number) => {
    setTravelers(prev => Math.max(1, prev + change));
  };

  return (
    <ScreenWrapper title="Dates & Travelers" scrollable={true}>
      <View style={styles.cardContainer}>
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <Text style={styles.label}>Dates</Text>
          <TouchableOpacity onPress={handleDateSelection} style={styles.datePickerButton}>
            <Text style={styles.bodyText}>{selectedDates}</Text>
            <MaterialIcons name="calendar-today" size={20} color={DS.muted} />
          </TouchableOpacity>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <Text style={styles.label}>Travelers</Text>
          <View style={styles.travelerControl}>
            <TouchableOpacity onPress={() => handleTravelerChange(-1)} style={styles.travelerButton}>
              <MaterialIcons name="remove" size={24} color={DS.white} />
            </TouchableOpacity>
            <Text style={styles.travelerCount}>{travelers}</Text>
            <TouchableOpacity onPress={() => handleTravelerChange(1)} style={styles.travelerButton}>
              <MaterialIcons name="add" size={24} color={DS.white} />
            </TouchableOpacity>
          </View>
        </BlurView>
      </View>

      <TouchableOpacity style={styles.ctaButton} onPress={() => router.push('/(trip)/flights' as any)}>
        <LinearGradient
          colors={[DS.purple, DS.pink] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBackground}
        >
          <Text style={styles.ctaButtonText}>Confirm Selection</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 20,
    gap: 16,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
  },
  label: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.muted,
    marginBottom: 8,
  },
  bodyText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 18,
    color: DS.white,
  },
  datePickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  travelerControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  travelerButton: {
    backgroundColor: DS.surfaceHigh,
    borderRadius: 8,
    padding: 8,
  },
  travelerCount: {
    fontFamily: 'Chillax-Bold',
    fontSize: 24,
    color: DS.white,
  },
  ctaButton: {
    marginTop: 30,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradientBackground: {
    padding: 18,
    alignItems: 'center',
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
  },
});

export default DatesTravelersScreen;
