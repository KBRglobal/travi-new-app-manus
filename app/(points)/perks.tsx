import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

// Assuming DS tokens are exported from ScreenWrapper or a common design system file
// For this task, we'll define them here for clarity and self-containment

const perksData = [
  {
    id: '1',
    title: 'Exclusive Lounge Access',
    description: 'Enjoy complimentary access to premium airport lounges worldwide.',
    icon: 'flight-takeoff',
    cta: 'Explore Lounges',
  },
  {
    id: '2',
    title: 'Priority Boarding',
    description: 'Skip the lines and board your flights first with priority access.',
    icon: 'card-travel',
    cta: 'View Benefits',
  },
  {
    id: '3',
    title: 'Travel Insurance',
    description: 'Comprehensive travel insurance for peace of mind on every journey.',
    icon: 'security',
    cta: 'Learn More',
  },
  {
    id: '4',
    title: 'Bonus Points on Stays',
    description: 'Earn extra points on hotel bookings and unlock more rewards.',
    icon: 'star',
    cta: 'Find Hotels',
  },
];

const PerksScreen = () => {
  return (
    <ScreenWrapper title="Your Exclusive Perks" scrollable={true}>
      <View style={styles.container}>
        {perksData.map((perk) => (
          <BlurView key={perk.id} intensity={20} tint="dark" style={styles.perkCard}>
            <View style={styles.cardContent}>
              <MaterialIcons name={perk.icon as any} size={30} color={DS.purple} />
              <View style={styles.textContainer}>
                <Text style={styles.perkTitle}>{perk.title}</Text>
                <Text style={styles.perkDescription}>{perk.description}</Text>
              </View>
            </View>
            <TouchableOpacity activeOpacity={0.8}>
              <LinearGradient
                colors={[DS.purple, DS.pink] as const}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.ctaButton}
              >
                <Text style={styles.ctaButtonText}>{perk.cta}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </BlurView>
        ))}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: DS.bg, // Ensure background is set if ScreenWrapper doesn't cover it fully
  },
  perkCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginBottom: 15,
    padding: 15,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  textContainer: {
    marginLeft: 15,
    flex: 1,
  },
  perkTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginBottom: 5,
  },
  perkDescription: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.muted,
  },
  ctaButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
  },
});

export default PerksScreen;
