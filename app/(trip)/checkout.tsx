import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

// DS object exported from ScreenWrapper.tsx

const CheckoutScreen = () => {
  const router = useRouter();
  const tripDetails = {
    destination: "Paris, France",
    dates: "Oct 26 - Nov 02, 2024",
    travelers: "2 Adults",
    totalPrice: "$2,450.00",
  };

  const paymentDetails = {
    method: "Credit Card",
    cardNumber: "**** **** **** 1234",
    expiry: "12/26",
  };

  return (
    <ScreenWrapper title="Checkout" scrollable={true}>
      <View style={styles.container}>
        {/* Trip Summary Card */}
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <Text style={styles.cardTitle}>Trip Summary</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Destination:</Text>
            <Text style={styles.body}>{tripDetails.destination}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Dates:</Text>
            <Text style={styles.body}>{tripDetails.dates}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Travelers:</Text>
            <Text style={styles.body}>{tripDetails.travelers}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalPrice}>{tripDetails.totalPrice}</Text>
          </View>
        </BlurView>

        {/* Payment Method Card */}
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <Text style={styles.cardTitle}>Payment Method</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Method:</Text>
            <Text style={styles.body}>{paymentDetails.method}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Card Number:</Text>
            <Text style={styles.body}>{paymentDetails.cardNumber}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Expiry:</Text>
            <Text style={styles.body}>{paymentDetails.expiry}</Text>
          </View>
          <TouchableOpacity style={styles.changeButton} onPress={() => router.push('/(trip)/payment-modal' as any)}>
            <Text style={styles.changeButtonText}>Change Payment Method</Text>
            <MaterialIcons name="arrow-forward-ios" size={16} color={DS.purple} />
          </TouchableOpacity>
        </BlurView>

        {/* CTA Button */}
        <TouchableOpacity activeOpacity={0.8} style={styles.ctaButtonContainer} onPress={() => router.push('/(trip)/checkout-payment' as any)}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaButton}
          >
            <Text style={styles.ctaButtonText}>Confirm Booking</Text>
            <MaterialIcons name="check-circle-outline" size={24} color={DS.white} style={{ marginLeft: 10 }} />
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
    backgroundColor: DS.bg,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: "hidden",
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
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.muted,
  },
  body: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.white,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: DS.borderStrong,
  },
  totalLabel: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
  },
  totalPrice: {
    fontFamily: 'Chillax-Bold',
    fontSize: 20,
    color: DS.pink,
  },
  changeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
  changeButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
    color: DS.purple,
    marginRight: 5,
  },
  ctaButtonContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 20,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
  },
});

export default CheckoutScreen;