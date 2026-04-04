import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const PartnerDetailScreen = () => {
  const router = useRouter();
  // Placeholder data for partner details
  const partner = {
    id: '1',
    name: 'TRAVI Rewards Partner',
    logo: 'https://via.placeholder.com/150/6443F4/FFFFFF?text=Partner',
    description: 'Earn exclusive points and rewards with our premium travel partner. Enjoy discounts on flights, hotels, and experiences worldwide.',
    pointsEarned: 1500,
    offers: [
      { id: '1', title: '20% off all flights', icon: 'flight' },
      { id: '2', title: 'Free hotel upgrade', icon: 'hotel' },
      { id: '3', title: 'Exclusive lounge access', icon: 'lounge' },
    ],
  };

  return (
    <ScreenWrapper title="Partner Details" scrollable={true}>
      <View style={styles.container}>
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.partnerHeader}>
            <Image source={{ uri: partner.logo }} style={styles.partnerLogo} />
            <Text style={styles.partnerName}>{partner.name}</Text>
          </View>
          <Text style={styles.partnerDescription}>{partner.description}</Text>
          <View style={styles.pointsContainer}>
            <MaterialIcons name="star" size={20} color={DS.warning} />
            <Text style={styles.pointsText}>{partner.pointsEarned} Points Earned</Text>
          </View>
        </BlurView>

        <Text style={styles.offersTitle}>Exclusive Offers</Text>
        {partner.offers.map((offer) => (
          <BlurView key={offer.id} intensity={20} tint="dark" style={styles.offerCard}>
            <MaterialIcons name={offer.icon as any} size={24} color={DS.purple} />
            <Text style={styles.offerText}>{offer.title}</Text>
          </BlurView>
        ))}

        <TouchableOpacity style={styles.ctaButton} onPress={() => router.push("/(points)/redeem-confirm" as any)}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.ctaButtonText}>View Partner Website</Text>
            <MaterialIcons name="arrow-forward" size={20} color={DS.white} style={{ marginLeft: 8 }} />
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
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
    marginBottom: 20,
  },
  partnerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  partnerLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 1,
    borderColor: DS.borderStrong,
  },
  partnerName: {
    fontFamily: 'Chillax-Bold',
    fontSize: 24,
    color: DS.white,
  },
  partnerDescription: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.secondary,
    marginBottom: 15,
    lineHeight: 22,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  pointsText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.warning,
    marginLeft: 8,
  },
  offersTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 20,
    color: DS.white,
    marginBottom: 15,
    marginTop: 10,
  },
  offerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 15,
    marginBottom: 10,
  },
  offerText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
    marginLeft: 15,
  },
  ctaButton: {
    marginTop: 30,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
  },
});

export default PartnerDetailScreen;
