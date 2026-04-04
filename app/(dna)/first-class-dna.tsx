import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

// DS object exported from ScreenWrapper.tsx

const FirstClassDnaScreen = () => {
  return (
    <ScreenWrapper title="First Class DNA" scrollable={true}>
      <View style={styles.contentContainer}>
        <Text style={styles.header}>Unlocking Elite Travel Experiences</Text>
        <Text style={styles.bodyText}>
          Welcome to the pinnacle of travel. TRAVI's First Class DNA is meticulously crafted to offer unparalleled luxury, comfort, and personalized service. Discover a world where every journey is an experience in itself.
        </Text>

        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.cardContent}>
            <MaterialIcons name="star" size={24} color={DS.purple} />
            <Text style={styles.cardTitle}>Exclusive Benefits</Text>
            <Text style={styles.cardBody}>Access to private lounges, priority boarding, and bespoke concierge services tailored to your every need.</Text>
          </View>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.cardContent}>
            <MaterialIcons name="flight" size={24} color={DS.pink} />
            <Text style={styles.cardTitle}>Seamless Journeys</Text>
            <Text style={styles.cardBody}>From departure to arrival, enjoy a smooth and stress-free travel experience with dedicated support.</Text>
          </View>
        </BlurView>

        <TouchableOpacity activeOpacity={0.8} style={styles.ctaButton}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            <Text style={styles.ctaButtonText}>Explore First Class Perks</Text>
            <MaterialIcons name="arrow-forward" size={20} color={DS.white} style={{ marginLeft: 8 }} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    backgroundColor: DS.bg,
    flex: 1,
  },
  header: {
    fontFamily: 'Chillax-Bold',
    fontSize: 28,
    color: DS.white,
    marginBottom: 15,
    textAlign: 'center',
  },
  bodyText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginBottom: 20,
    padding: 20,
  },
  cardContent: {
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 20,
    color: DS.white,
    marginTop: 10,
    marginBottom: 5,
  },
  cardBody: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  ctaButton: {
    marginTop: 30,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
  },
});

export default FirstClassDnaScreen;
