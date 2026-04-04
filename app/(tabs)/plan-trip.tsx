import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const PlanTripScreen = () => {
  return (
    <ScreenWrapper title="Plan Your Next Adventure" scrollable={true}>
      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Where do you want to go?</Text>

        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.cardContent}>
            <MaterialIcons name="location-on" size={24} color={DS.purple} />
            <Text style={styles.cardTitle}>Destination</Text>
            <Text style={styles.cardBody}>Enter your desired location</Text>
          </View>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.cardContent}>
            <MaterialIcons name="calendar-today" size={24} color={DS.pink} />
            <Text style={styles.cardTitle}>Dates</Text>
            <Text style={styles.cardBody}>Select your travel dates</Text>
          </View>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.cardContent}>
            <MaterialIcons name="people" size={24} color={DS.success} />
            <Text style={styles.cardTitle}>Travelers</Text>
            <Text style={styles.cardBody}>Number of people</Text>
          </View>
        </BlurView>

        <TouchableOpacity activeOpacity={0.8}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaButton}
          >
            <Text style={styles.ctaButtonText}>Start Planning</Text>
            <MaterialIcons name="arrow-forward" size={20} color={DS.white} style={{ marginLeft: 8 }} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  subtitle: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
    marginBottom: 20,
    textAlign: 'center',
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginBottom: 15,
    padding: 20,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginLeft: 10,
    flex: 1,
  },
  cardBody: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.muted,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 30,
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
  },
});

export default PlanTripScreen;
