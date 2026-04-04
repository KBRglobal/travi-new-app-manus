import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const PaymentModal = () => {
  const router = useRouter();
  return (
    <ScreenWrapper title="Payment Options" scrollable={true}>
      <View style={styles.contentContainer}>
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <TouchableOpacity style={styles.paymentOption}>
            <MaterialIcons name="credit-card" size={24} color={DS.white} />
            <Text style={styles.paymentOptionText}>Credit Card</Text>
            <MaterialIcons name="chevron-right" size={24} color={DS.muted} />
          </TouchableOpacity>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <TouchableOpacity style={styles.paymentOption}>
            <MaterialIcons name="account-balance-wallet" size={24} color={DS.white} />
            <Text style={styles.paymentOptionText}>PayPal</Text>
            <MaterialIcons name="chevron-right" size={24} color={DS.muted} />
          </TouchableOpacity>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <TouchableOpacity style={styles.paymentOption}>
            <MaterialIcons name="phone-iphone" size={24} color={DS.white} />
            <Text style={styles.paymentOptionText}>Apple Pay</Text>
            <MaterialIcons name="chevron-right" size={24} color={DS.muted} />
          </TouchableOpacity>
        </BlurView>

        <LinearGradient
          colors={[DS.purple, DS.pink] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.ctaButtonGradient}
        >
          <TouchableOpacity style={styles.ctaButton} onPress={() => router.push("/(trip)/checkout" as any)}>
            <Text style={styles.ctaButtonText}>Add New Payment Method</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    width: '100%',
    marginBottom: 15,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    justifyContent: 'space-between',
  },
  paymentOptionText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
    flex: 1,
    marginLeft: 15,
  },
  ctaButtonGradient: {
    borderRadius: 10,
    width: '100%',
    marginTop: 20,
  },
  ctaButton: {
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 18,
    color: DS.white,
  },
});

export default PaymentModal;
