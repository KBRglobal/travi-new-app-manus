import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const WalletWithdraw = () => {
  const router = useRouter();
  return (
    <ScreenWrapper title="Withdraw Funds" scrollable={true}>
      <View style={styles.container}>
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <Text style={styles.label}>Available Balance</Text>
          <Text style={styles.balance}>$1,234.56</Text>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <Text style={styles.label}>Amount to Withdraw</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            placeholderTextColor={DS.placeholder}
            keyboardType="numeric"
          />
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <Text style={styles.label}>Withdrawal Method</Text>
          <TouchableOpacity style={styles.methodButton} onPress={() => router.push('/(trip)/payment-modal' as any)}>
            <MaterialIcons name="account-balance" size={24} color={DS.white} />
            <Text style={styles.methodText}>Bank Account</Text>
            <MaterialIcons name="chevron-right" size={24} color={DS.muted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.methodButton} onPress={() => router.push('/(trip)/payment-modal' as any)}>
            <MaterialIcons name="credit-card" size={24} color={DS.white} />
            <Text style={styles.methodText}>Credit/Debit Card</Text>
            <MaterialIcons name="chevron-right" size={24} color={DS.muted} />
          </TouchableOpacity>
        </BlurView>

        <LinearGradient
          colors={[DS.purple, DS.pink] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.ctaButton}
        >
          <TouchableOpacity onPress={() => router.replace('/(tabs)/wallet' as any)}>
            <Text style={styles.ctaButtonText}>Withdraw Now</Text>
          </TouchableOpacity>
        </LinearGradient>
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
    overflow: 'hidden',
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.muted,
    marginBottom: 8,
  },
  balance: {
    fontFamily: 'Chillax-Bold',
    fontSize: 32,
    color: DS.white,
  },
  input: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 20,
    color: DS.white,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: DS.borderStrong,
  },
  methodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: DS.border,
  },
  methodText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 18,
    color: DS.white,
    flex: 1,
    marginLeft: 10,
  },
  ctaButton: {
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginTop: 30,
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 20,
    color: DS.white,
  },
});

export default WalletWithdraw;
