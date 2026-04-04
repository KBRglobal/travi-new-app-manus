import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

// DS object as provided in the prompt

const PostBookingScreen = () => {
  return (
    <ScreenWrapper title="Booking Confirmed" scrollable={true}>
      <View style={styles.container}>
        {/* Confirmation Header */}
        <View style={styles.headerSection}>
          <MaterialIcons name="check-circle-outline" size={80} color={DS.success} />
          <Text style={styles.headerTitle}>Your Trip is Booked!</Text>
          <Text style={styles.headerSubtitle}>Get ready for an amazing adventure.</Text>
        </View>

        {/* Booking Details Card */}
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.cardRow}>
            <MaterialIcons name="flight" size={24} color={DS.muted} />
            <View style={styles.cardTextContent}>
              <Text style={styles.cardLabel}>Destination</Text>
              <Text style={styles.cardValue}>Paris, France</Text>
            </View>
          </View>
          <View style={styles.cardRow}>
            <MaterialIcons name="calendar-today" size={24} color={DS.muted} />
            <View style={styles.cardTextContent}>
              <Text style={styles.cardLabel}>Dates</Text>
              <Text style={styles.cardValue}>Oct 26 - Nov 02, 2024</Text>
            </View>
          </View>
          <View style={styles.cardRow}>
            <MaterialIcons name="person" size={24} color={DS.muted} />
            <View style={styles.cardTextContent}>
              <Text style={styles.cardLabel}>Travelers</Text>
              <Text style={styles.cardValue}>2 Adults</Text>
            </View>
          </View>
          <View style={styles.cardRowLast}>
            <MaterialIcons name="confirmation-number" size={24} color={DS.muted} />
            <View style={styles.cardTextContent}>
              <Text style={styles.cardLabel}>Booking ID</Text>
              <Text style={styles.cardValue}>TRV-789012345</Text>
            </View>
          </View>
        </BlurView>

        {/* Call to Action */}
        <TouchableOpacity style={styles.ctaButton}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            style={styles.gradientBackground}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          >
            <Text style={styles.ctaButtonText}>View My Trip Details</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryCtaButton}>
          <Text style={styles.secondaryCtaButtonText}>Explore More Destinations</Text>
        </TouchableOpacity>

      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DS.bg,
    padding: 20,
    alignItems: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  headerTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 28,
    color: DS.white,
    marginTop: 15,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
    marginTop: 5,
    textAlign: 'center',
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
    width: '100%',
    maxWidth: 400,
    marginBottom: 30,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardRowLast: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTextContent: {
    marginLeft: 15,
  },
  cardLabel: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
    color: DS.muted,
  },
  cardValue: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.white,
    marginTop: 2,
  },
  ctaButton: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
  },
  gradientBackground: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
  },
  secondaryCtaButton: {
    width: '100%',
    maxWidth: 400,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: DS.borderStrong,
    backgroundColor: DS.surfaceHigh,
  },
  secondaryCtaButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
  },
});

export default PostBookingScreen;
