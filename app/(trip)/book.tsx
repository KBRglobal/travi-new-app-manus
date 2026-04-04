import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

// DS object as provided in the prompt

const BookScreen = () => {
  const router = useRouter();
  return (
    <ScreenWrapper title="Book Your Trip" scrollable={true}>
      <View style={styles.contentContainer}>

        {/* Destination Card */}
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="flight" size={24} color={DS.purple} />
            <Text style={styles.cardTitle}>Destination</Text>
          </View>
          <Text style={styles.cardBody}>Paris, France</Text>
        </BlurView>

        {/* Date Card */}
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="calendar-today" size={24} color={DS.pink} />
            <Text style={styles.cardTitle}>Travel Date</Text>
          </View>
          <Text style={styles.cardBody}>December 25, 2024</Text>
        </BlurView>

        {/* Booking Details Card */}
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="info-outline" size={24} color={DS.info} />
            <Text style={styles.cardTitle}>Booking Details</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Passengers:</Text>
            <Text style={styles.detailValue}>2 Adults</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Class:</Text>
            <Text style={styles.detailValue}>Economy</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Price:</Text>
            <Text style={styles.detailValue}>$1200.00</Text>
          </View>
        </BlurView>

        {/* Confirm Booking CTA */}
        <TouchableOpacity onPress={() => router.push('/(trip)/checkout-payment' as any)} style={styles.ctaButtonContainer}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaButtonGradient}
          >
            <Text style={styles.ctaButtonText}>Confirm Booking</Text>
            <MaterialIcons name="arrow-forward" size={20} color={DS.white} style={styles.ctaIcon} />
          </LinearGradient>
        </TouchableOpacity>

      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    gap: 20,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: "hidden",
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold', // Assuming Chillax-Bold is loaded
    fontSize: 20,
    color: DS.white,
    marginLeft: 10,
  },
  cardBody: {
    fontFamily: 'Satoshi-Regular', // Assuming Satoshi-Regular is loaded
    fontSize: 16,
    color: DS.secondary,
    marginTop: 5,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  detailLabel: {
    fontFamily: 'Satoshi-Medium', // Assuming Satoshi-Medium is loaded
    fontSize: 15,
    color: DS.muted,
  },
  detailValue: {
    fontFamily: 'Satoshi-Regular', // Assuming Satoshi-Regular is loaded
    fontSize: 15,
    color: DS.white,
  },
  ctaButtonContainer: {
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  ctaButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 25,
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold', // Assuming Chillax-Bold is loaded
    fontSize: 18,
    color: DS.white,
    marginRight: 10,
  },
  ctaIcon: {
    // No specific style needed, color is set directly
  },
});

export default BookScreen;
