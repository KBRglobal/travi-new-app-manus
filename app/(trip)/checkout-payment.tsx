import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const CheckoutPaymentScreen = () => {
  const router = useRouter();
  return (
    <ScreenWrapper title="Checkout & Payment" scrollable={true}>
      <View style={styles.contentContainer}>
        {/* Payment Details Card */}
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <Text style={styles.cardTitle}>Payment Details</Text>
          <View style={styles.detailRow}>
            <MaterialIcons name="credit-card" size={20} color={DS.muted} />
            <Text style={styles.cardText}>Card Number: **** **** **** 1234</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="date-range" size={20} color={DS.muted} />
            <Text style={styles.cardText}>Expiry Date: 12/25</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="lock" size={20} color={DS.muted} />
            <Text style={styles.cardText}>CVV: ***</Text>
          </View>
        </BlurView>

        {/* Billing Address Card */}
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <Text style={styles.cardTitle}>Billing Address</Text>
          <View style={styles.detailRow}>
            <MaterialIcons name="person" size={20} color={DS.muted} />
            <Text style={styles.cardText}>John Doe</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="location-on" size={20} color={DS.muted} />
            <Text style={styles.cardText}>123 Travi Street, Travel City, 12345</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="email" size={20} color={DS.muted} />
            <Text style={styles.cardText}>john.doe@example.com</Text>
          </View>
        </BlurView>

        {/* Confirm Payment CTA */}
        <TouchableOpacity onPress={() => router.push('/(special)/loading-payment' as any)} style={styles.ctaButton}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.ctaButtonText}>Confirm Payment</Text>
            <MaterialIcons name="arrow-forward" size={24} color={DS.white} style={styles.ctaIcon} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: DS.bg,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 20,
    color: DS.white,
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.secondary,
    marginLeft: 10,
  },
  ctaButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 20,
  },
  gradientButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginRight: 10,
  },
  ctaIcon: {
    marginLeft: 5,
  },
});

export default CheckoutPaymentScreen;
