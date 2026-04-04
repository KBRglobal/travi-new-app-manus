import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function DestinationGuide() {
  const router = useRouter();
  const destinations = [
    { id: '1', name: 'Paris, France', description: 'The City of Love', icon: 'location-city' },
    { id: '2', name: 'Kyoto, Japan', description: 'Ancient Traditions', icon: 'temple-Buddhist' },
    { id: '3', name: 'Rio de Janeiro, Brazil', description: 'Vibrant Culture', icon: 'beach-access' },
    { id: '4', name: 'Cairo, Egypt', description: 'Historical Wonders', icon: 'pyramid' },
  ];

  return (
    <ScreenWrapper title="Destination Guide" scrollable={true}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Explore Top Destinations</Text>

        {destinations.map((destination) => (
          <BlurView key={destination.id} intensity={20} style={styles.glassCard}>
            <View style={styles.cardContent}>
              <MaterialIcons name={destination.icon as any} size={24} color={DS.purple} style={styles.cardIcon} />
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{destination.name}</Text>
                <Text style={styles.cardDescription}>{destination.description}</Text>
              </View>
              <MaterialIcons name="arrow-forward-ios" size={18} color={DS.muted} />
            </View>
          </BlurView>
        ))}

        <TouchableOpacity activeOpacity={0.8} style={styles.ctaButton}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.ctaButtonText}>Discover More</Text>
            <MaterialIcons name="travel-explore" size={20} color={DS.white} style={styles.ctaIcon} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: DS.bg, // Ensure background is set for consistency
  },
  headerText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 28,
    color: DS.white,
    marginBottom: 25,
    textAlign: 'center',
  },
  glassCard: {
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
    justifyContent: 'space-between',
  },
  cardIcon: {
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
    marginBottom: 5,
  },
  cardDescription: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.muted,
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
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
    marginRight: 10,
  },
  ctaIcon: {
    marginLeft: 5,
  },
});
