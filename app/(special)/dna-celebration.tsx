import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// DS object exported from ScreenWrapper.tsx (for local use in styling)

const DnaCelebrationScreen = () => {
  return (
    <ScreenWrapper title="DNA Celebration" scrollable={true}>
      <View style={styles.contentContainer}>
        <MaterialIcons name="star" size={60} color={DS.pink} style={styles.icon} />
        <Text style={styles.title}>Your Unique Travel DNA</Text>
        <Text style={styles.description}>
          Discover the essence of your travel style and celebrate the journeys that make you, YOU.
          Every adventure shapes your unique DNA, guiding you to new horizons.
        </Text>

        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <Text style={styles.cardTitle}>DNA Insights</Text>
          <Text style={styles.cardText}>
            Your travel DNA reveals a strong preference for adventurous explorations and cultural immersions.
            You thrive in dynamic environments and seek authentic experiences.
          </Text>
          <View style={styles.dnaAttribute}>
            <MaterialIcons name="explore" size={20} color={DS.purple} />
            <Text style={styles.attributeText}>Adventure Seeker</Text>
          </View>
          <View style={styles.dnaAttribute}>
            <MaterialIcons name="palette" size={20} color={DS.purple} />
            <Text style={styles.attributeText}>Cultural Enthusiast</Text>
          </View>
        </BlurView>

        <TouchableOpacity style={styles.ctaButton}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            <Text style={styles.ctaButtonText}>Explore More DNA Journeys</Text>
            <MaterialIcons name="arrow-forward" size={20} color={DS.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Chillax-Bold',
    fontSize: 28,
    color: DS.white,
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
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
    padding: 20,
    width: '100%',
    marginBottom: 30,
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 22,
    color: DS.white,
    marginBottom: 15,
    textAlign: 'center',
  },
  cardText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 15,
    color: DS.secondary,
    marginBottom: 20,
    lineHeight: 22,
  },
  dnaAttribute: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  attributeText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
    marginLeft: 10,
  },
  ctaButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientBackground: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
    marginRight: 10,
  },
});

export default DnaCelebrationScreen;
