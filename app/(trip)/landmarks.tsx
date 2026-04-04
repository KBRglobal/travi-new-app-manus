import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper'; // Assuming DS is exported from ScreenWrapper
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // Assuming MaterialIcons are available

// Placeholder for custom font loading - in a real app, these would be loaded globally
// For this task, we'll assume they are available by name.
const Fonts = {
  ChillaxBold: 'Chillax-Bold',
  SatoshiMedium: 'Satoshi-Medium',
  SatoshiRegular: 'Satoshi-Regular',
};

const landmarksData = [
  {
    id: '1',
    name: 'Eiffel Tower',
    description: 'A famous landmark in Paris, France. An iconic symbol of French culture and a global landmark.',
    image: 'https://example.com/eiffel_tower.jpg', // Placeholder image
  },
  {
    id: '2',
    name: 'Statue of Liberty',
    description: 'A colossal neoclassical sculpture on Liberty Island in New York Harbor in New York City, in the United States.',
    image: 'https://example.com/statue_of_liberty.jpg', // Placeholder image
  },
  {
    id: '3',
    name: 'Colosseum',
    description: 'An oval amphitheatre in the centre of the city of Rome, Italy. The largest ancient amphitheatre ever built.',
    image: 'https://example.com/colosseum.jpg', // Placeholder image
  },
];

const LandmarksScreen = () => {
  return (
    <ScreenWrapper title="Landmarks" scrollable={true}>
      <View style={styles.contentContainer}>
        {landmarksData.map((landmark) => (
          <BlurView
            key={landmark.id}
            intensity={20}
            tint="dark"
            style={styles.cardBlurView}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{landmark.name}</Text>
              <Text style={styles.cardDescription}>{landmark.description}</Text>
              <TouchableOpacity style={styles.ctaButton}>
                <LinearGradient
                  colors={[DS.purple, DS.pink] as const}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientButton}
                >
                  <Text style={styles.ctaButtonText}>View Details</Text>
                  <MaterialIcons name="arrow-forward" size={20} color={DS.white} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </BlurView>
        ))}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cardBlurView: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginBottom: 15,
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontFamily: Fonts.ChillaxBold,
    fontSize: 22,
    color: DS.white,
    marginBottom: 8,
  },
  cardDescription: {
    fontFamily: Fonts.SatoshiRegular,
    fontSize: 16,
    color: DS.muted,
    marginBottom: 15,
    lineHeight: 22,
  },
  ctaButton: {
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  ctaButtonText: {
    fontFamily: Fonts.SatoshiMedium,
    fontSize: 16,
    color: DS.white,
    marginRight: 8,
  },
});

export default LandmarksScreen;
