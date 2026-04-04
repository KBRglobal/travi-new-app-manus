import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons'; // For icons
import { ScreenWrapper, DS } from '@/components/screen-wrapper'; // Assuming DS is exported from ScreenWrapper

const WelcomeTourScreen = () => {
  const router = useRouter();
  // Placeholder data for the welcome tour
  const tourSteps = [
    {
      id: '1',
      title: 'Discover New Destinations',
      description: 'Explore a world of possibilities with personalized recommendations and curated travel guides.',
      icon: 'travel-explore',
    },
    {
      id: '2',
      title: 'Plan Your Perfect Trip',
      description: 'Effortlessly organize your itinerary, book flights and hotels, and manage all your bookings in one place.',
      icon: 'flight-takeoff',
    },
    {
      id: '3',
      title: 'Experience Seamless Journeys',
      description: 'Enjoy real-time updates, local insights, and 24/7 support to make every journey unforgettable.',
      icon: 'card-travel',
    },
  ];

  return (
    <ScreenWrapper title="Welcome to TRAVI" scrollable={true}>
      <View style={styles.container}>
        {tourSteps.map((step, index) => (
          <BlurView key={step.id} intensity={20} style={styles.card}>
            <View style={styles.cardContent}>
              <MaterialIcons name={step.icon as any} size={48} color={DS.purple} style={styles.icon} />
              <Text style={styles.cardTitle}>{step.title}</Text>
              <Text style={styles.cardDescription}>{step.description}</Text>
            </View>
          </BlurView>
        ))}

        <TouchableOpacity style={styles.ctaButton} onPress={() => router.push("/(auth)/welcome-travi" as any)}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.ctaButtonText}>Get Started</Text>
            <MaterialIcons name="arrow-forward" size={20} color={DS.white} />
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
    backgroundColor: DS.bg, // Ensure background is set, though ScreenWrapper should handle it
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginBottom: 20,
    padding: 20,
    alignItems: 'center',
  },
  cardContent: {
    alignItems: 'center',
  },
  icon: {
    marginBottom: 15,
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold', // Assuming fonts are loaded
    fontSize: 24,
    color: DS.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  cardDescription: {
    fontFamily: 'Satoshi-Regular', // Assuming fonts are loaded
    fontSize: 16,
    color: DS.muted,
    textAlign: 'center',
    lineHeight: 24,
  },
  ctaButton: {
    marginTop: 30,
    borderRadius: 16,
    overflow: 'hidden',
    width: '100%',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderRadius: 16,
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium', // Assuming fonts are loaded
    fontSize: 18,
    color: DS.white,
    marginRight: 10,
  },
});

export default WelcomeTourScreen;
