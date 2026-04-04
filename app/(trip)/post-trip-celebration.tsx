import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const PostTripCelebration = () => {
  const router = useRouter();
  return (
    <ScreenWrapper title="Trip Celebration" scrollable={true}>
      <View style={styles.container}>
        <MaterialIcons name="celebration" size={80} color={DS.purple} style={styles.icon} />
        <Text style={styles.header}>Congratulations!</Text>
        <Text style={styles.subHeader}>You've completed an amazing trip!</Text>

        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <Text style={styles.cardTitle}>Your Trip Highlights</Text>
          <View style={styles.highlightItem}>
            <MaterialIcons name="location-on" size={20} color={DS.pink} />
            <Text style={styles.highlightText}>Visited 5 new cities</Text>
          </View>
          <View style={styles.highlightItem}>
            <MaterialIcons name="flight-takeoff" size={20} color={DS.pink} />
            <Text style={styles.highlightText}>Flew over 10,000 miles</Text>
          </View>
          <View style={styles.highlightItem}>
            <MaterialIcons name="camera-alt" size={20} color={DS.pink} />
            <Text style={styles.highlightText}>Captured 200+ memories</Text>
          </View>
        </BlurView>

        <LinearGradient
          colors={[DS.purple, DS.pink] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.ctaButton}
        >
          <Text style={styles.ctaButtonText}>Share Your Experience</Text>
        </LinearGradient>

        <LinearGradient
          colors={[DS.purple, DS.pink] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.ctaButton}
        >
          <Text style={styles.ctaButtonText}>Plan Your Next Adventure</Text>
        </LinearGradient>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: DS.bg,
  },
  icon: {
    marginBottom: 20,
  },
  header: {
    fontFamily: 'Chillax-Bold',
    fontSize: 32,
    color: DS.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeader: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.muted,
    marginBottom: 30,
    textAlign: 'center',
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
    width: '100%',
    maxWidth: 400,
    marginBottom: 30,
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 22,
    color: DS.white,
    marginBottom: 15,
    textAlign: 'center',
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  highlightText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.secondary,
    marginLeft: 10,
  },
  ctaButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    marginBottom: 15,
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
  },
});

export default PostTripCelebration;
