import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
];

const CurrencyConverterScreen = () => {
  const router = useRouter();
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState(currencies[0]);
  const [toCurrency, setToCurrency] = useState(currencies[1]);
  const [convertedAmount, setConvertedAmount] = useState('');

  const convertCurrency = () => {
    // This is a placeholder for actual currency conversion logic.
    // In a real app, you would fetch exchange rates from an API.
    const rate = 1.08; // Example rate: 1 USD = 1.08 EUR
    const result = parseFloat(amount) * rate;
    setConvertedAmount(result.toFixed(2));
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <ScreenWrapper title="Currency Converter" scrollable={true}>
      <View style={styles.container}>
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            placeholder="Enter amount"
            placeholderTextColor={DS.placeholder}
          />
        </BlurView>

        <View style={styles.currencySelectionContainer}>
          <BlurView intensity={20} tint="dark" style={styles.card}>
            <Text style={styles.label}>From</Text>
            <TouchableOpacity style={styles.currencyPicker} onPress={() => {}}>
              <Text style={styles.currencyText}>{fromCurrency.code}</Text>
              <MaterialIcons name="arrow-drop-down" size={24} color={DS.white} />
            </TouchableOpacity>
          </BlurView>

          <TouchableOpacity onPress={swapCurrencies} style={styles.swapButton}>
            <MaterialIcons name="swap-horiz" size={32} color={DS.purple} />
          </TouchableOpacity>

          <BlurView intensity={20} tint="dark" style={styles.card}>
            <Text style={styles.label}>To</Text>
            <TouchableOpacity style={styles.currencyPicker} onPress={() => {}}>
              <Text style={styles.currencyText}>{toCurrency.code}</Text>
              <MaterialIcons name="arrow-drop-down" size={24} color={DS.white} />
            </TouchableOpacity>
          </BlurView>
        </View>

        <TouchableOpacity onPress={convertCurrency} style={styles.ctaButton}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            <Text style={styles.ctaButtonText}>Convert</Text>
          </LinearGradient>
        </TouchableOpacity>

        {convertedAmount ? (
          <BlurView intensity={20} tint="dark" style={styles.resultCard}>
            <Text style={styles.resultLabel}>Converted Amount</Text>
            <Text style={styles.resultText}>
              {toCurrency.symbol} {convertedAmount}
            </Text>
            <Text style={styles.conversionDetails}>
              1 {fromCurrency.code} ≈ 1.08 {toCurrency.code} (example rate)
            </Text>
          </BlurView>
        ) : null}
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
    padding: 15,
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.muted,
    marginBottom: 8,
  },
  input: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 24,
    color: DS.white,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: DS.borderStrong,
  },
  currencySelectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  currencyPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  currencyText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 20,
    color: DS.white,
    marginRight: 10,
  },
  swapButton: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: DS.surfaceHigh,
    borderWidth: 1,
    borderColor: DS.borderStrong,
  },
  ctaButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
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
  resultCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
    alignItems: 'center',
  },
  resultLabel: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.muted,
    marginBottom: 10,
  },
  resultText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 36,
    color: DS.white,
    marginBottom: 5,
  },
  conversionDetails: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.secondary,
  },
});

export default CurrencyConverterScreen;
