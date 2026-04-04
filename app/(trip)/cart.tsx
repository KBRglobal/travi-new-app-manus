import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const CartScreen = () => {
  // Placeholder data for cart items
  const cartItems = [
    { id: '1', name: 'Flight to Paris', price: 1200, quantity: 1 },
    { id: '2', name: 'Hotel in Rome', price: 800, quantity: 1 },
    { id: '3', name: 'Travel Insurance', price: 50, quantity: 1 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  return (
    <ScreenWrapper title="Your Cart" scrollable={true}>
      <View style={styles.container}>
        {cartItems.map((item) => (
          <BlurView key={item.id} intensity={20} tint="dark" style={styles.card}>
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.itemQuantity}>
              <MaterialIcons name="remove-circle-outline" size={24} color={DS.muted} />
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <MaterialIcons name="add-circle-outline" size={24} color={DS.muted} />
            </View>
          </BlurView>
        ))}

        <BlurView intensity={20} tint="dark" style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax (5%)</Text>
            <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </BlurView>

        <TouchableOpacity activeOpacity={0.8} style={styles.checkoutButton}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            <MaterialIcons name="arrow-forward" size={24} color={DS.white} />
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
    overflow: 'hidden',
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginBottom: 5,
  },
  itemPrice: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
  },
  itemQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.white,
    marginHorizontal: 10,
  },
  summaryCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
  },
  summaryValue: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
  },
  totalLabel: {
    fontFamily: 'Chillax-Bold',
    fontSize: 20,
    color: DS.white,
  },
  totalValue: {
    fontFamily: 'Chillax-Bold',
    fontSize: 20,
    color: DS.white,
  },
  checkoutButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  checkoutButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginRight: 10,
  },
});

export default CartScreen;