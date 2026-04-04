import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

// Assuming DS is exported from ScreenWrapper or a separate design system file

const GiftCardsScreen = () => {
  const router = useRouter();
  return (
    <ScreenWrapper title="Gift Cards" scrollable={true}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Your Gift Cards</Text>
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.cardContent}>
            <MaterialIcons name="card-giftcard" size={32} color={DS.purple} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.cardTitle}>TRAVI Platinum Card</Text>
              <Text style={styles.cardSubtitle}>Balance: $500.00</Text>
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            <LinearGradient
              colors={[DS.purple, DS.pink] as const}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.ctaButton}
            >
              <Text style={styles.ctaButtonText}>Redeem Now</Text>
            </LinearGradient>
          </TouchableOpacity>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.cardContent}>
            <MaterialIcons name="card-giftcard" size={32} color={DS.pink} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.cardTitle}>Travel Voucher</Text>
              <Text style={styles.cardSubtitle}>Balance: $100.00</Text>
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            <LinearGradient
              colors={[DS.purple, DS.pink] as const}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.ctaButton}
            >
              <Text style={styles.ctaButtonText}>View Details</Text>
            </LinearGradient>
          </TouchableOpacity>
        </BlurView>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Add New Gift Card</Text>
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.addCardContent}>
            <MaterialIcons name="add-circle-outline" size={40} color={DS.white} />
            <Text style={styles.addCardText}>Tap to add a new gift card</Text>
          </View>
        </BlurView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 20,
    color: DS.white,
    marginBottom: 15,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 15,
    marginBottom: 15,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
  },
  cardSubtitle: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.muted,
    marginTop: 5,
  },
  ctaButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
  },
  addCardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  addCardText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
    marginTop: 10,
  },
});

export default GiftCardsScreen;
