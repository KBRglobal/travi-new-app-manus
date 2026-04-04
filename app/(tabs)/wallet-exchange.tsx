import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

export default function WalletExchangeScreen() {
  const router = useRouter();
  const exchangeRate = 1.2345; // Example rate
  const walletBalance = 1234.56; // Example balance
  const selectedCurrency = 'USD'; // Example currency

  return (
    <ScreenWrapper title="Wallet Exchange" scrollable={true}>
      <View style={styles.cardContainer}>
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <Text style={styles.cardTitle}>Current Balance</Text>
          <Text style={styles.balanceText}>${walletBalance.toFixed(2)} {selectedCurrency}</Text>
        </BlurView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Exchange Rate</Text>
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.rateRow}>
            <Text style={styles.rateText}>1 {selectedCurrency} = {exchangeRate.toFixed(4)} EUR</Text>
            <MaterialIcons name="swap-horiz" size={24} color={DS.purple} />
          </View>
        </BlurView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Exchange Options</Text>
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <TouchableOpacity style={styles.optionButton} onPress={() => router.push('/(tabs)/wallet' as any)}>
            <MaterialIcons name="account-balance-wallet" size={20} color={DS.white} />
            <Text style={styles.optionButtonText}>Exchange to EUR</Text>
            <MaterialIcons name="chevron-right" size={20} color={DS.muted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={() => router.push('/(tabs)/wallet' as any)}>
            <MaterialIcons name="attach-money" size={20} color={DS.white} />
            <Text style={styles.optionButtonText}>Exchange to GBP</Text>
            <MaterialIcons name="chevron-right" size={20} color={DS.muted} />
          </TouchableOpacity>
        </BlurView>
      </View>

      <TouchableOpacity style={styles.ctaButton} onPress={() => router.push("/(tabs)/wallet" as any)}>
        <LinearGradient
          colors={[DS.purple, DS.pink] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientButton}
        >
          <Text style={styles.ctaButtonText}>Perform Exchange</Text>
          <MaterialIcons name="arrow-forward" size={20} color={DS.white} />
        </LinearGradient>
      </TouchableOpacity>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 20,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
  },
  cardTitle: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.muted,
    marginBottom: 5,
  },
  balanceText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 28,
    color: DS.white,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 20,
    color: DS.white,
    marginBottom: 10,
  },
  rateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rateText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 18,
    color: DS.white,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: DS.border,
  },
  optionButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
    marginLeft: 10,
    flex: 1,
  },
  ctaButton: {
    marginTop: 30,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginRight: 10,
  },
});
