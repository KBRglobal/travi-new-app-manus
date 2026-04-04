import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

const currencies: Currency[] = [
  { code: 'USD', name: 'United States Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
];

const CurrencySelectorScreen = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(currencies[0]);

  const renderCurrencyItem = ({ item }: { item: Currency }) => (
    <TouchableOpacity
      style={styles.currencyItem}
      onPress={() => setSelectedCurrency(item)}
    >
      <BlurView intensity={20} tint="dark" style={styles.glassCard}>
        <View style={styles.currencyInfo}>
          <Text style={styles.currencySymbol}>{item.symbol}</Text>
          <View>
            <Text style={styles.currencyCode}>{item.code}</Text>
            <Text style={styles.currencyName}>{item.name}</Text>
          </View>
        </View>
        {selectedCurrency?.code === item.code && (
          <MaterialIcons name="check-circle" size={24} color={DS.success} />
        )}
      </BlurView>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper title="Select Currency" scrollable={true}>
      <FlatList
        data={currencies}
        renderItem={renderCurrencyItem}
        keyExtractor={(item) => item.code}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.buttonContainer}>
        <LinearGradient
          colors={[DS.purple, DS.pink] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientButton}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('Selected:', selectedCurrency?.code)}
          >
            <Text style={styles.buttonText}>Confirm Selection</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // To ensure button doesn't cover last item
  },
  currencyItem: {
    marginBottom: 10,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  currencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontFamily: 'Chillax-Bold',
    fontSize: 30,
    color: DS.white,
    marginRight: 15,
  },
  currencyCode: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
  },
  currencyName: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.muted,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: DS.bg, // Match background to blend in
  },
  gradientButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
  },
});

export default CurrencySelectorScreen;
