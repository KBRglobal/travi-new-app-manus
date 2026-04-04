import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

// DS object as provided in the prompt
const DS = {
  bg: "#0A0514", surface: "rgba(36,16,62,0.55)", surfaceHigh: "rgba(50,20,80,0.7)",
  border: "rgba(123,68,230,0.22)", borderStrong: "rgba(100,67,244,0.4)",
  purple: "#6443F4", pink: "#F94498", success: "#02A65C", warning: "#FF9327",
  error: "#FF6B6B", info: "#01BEFF", white: "#FFFFFF", secondary: "#D3CFD8",
  muted: "#A79FB2", placeholder: "#7B6A94", gradient: ["#6443F4", "#F94498"],
};

// Custom fonts (assuming these are loaded and available)
const Typography = StyleSheet.create({
  chillaxBold: {
    fontFamily: 'Chillax-Bold',
    color: DS.white,
  },
  satoshiMedium: {
    fontFamily: 'Satoshi-Medium',
    color: DS.secondary,
  },
  satoshiRegular: {
    fontFamily: 'Satoshi-Regular',
    color: DS.muted,
  },
});

const memoriesData = [
  {
    id: '1',
    title: 'Summer in Paris',
    date: 'July 2023',
    image: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Paris',
    description: 'A wonderful trip to the city of love, exploring historical sites and enjoying local cuisine.',
  },
  {
    id: '2',
    title: 'Mountain Adventure',
    date: 'September 2022',
    image: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Mountains',
    description: 'Hiking through breathtaking trails and camping under the stars.',
  },
  {
    id: '3',
    title: 'Beach Getaway',
    date: 'April 2022',
    image: 'https://via.placeholder.com/150/008000/FFFFFF?text=Beach',
    description: 'Relaxing by the ocean, swimming, and enjoying the sun.',
  },
];

export default function MemoriesScreen() {
  const router = useRouter();
  return (
    <ScreenWrapper title="Your Memories" scrollable={true}>
      <View style={styles.contentContainer}>
        {memoriesData.map((memory) => (
          <BlurView key={memory.id} intensity={20} tint="dark" style={styles.memoryCard}>
            <Image source={{ uri: memory.image }} style={styles.memoryImage} />
            <View style={styles.memoryDetails}>
              <Text style={[Typography.chillaxBold, styles.memoryTitle]}>{memory.title}</Text>
              <Text style={[Typography.satoshiMedium, styles.memoryDate]}>{memory.date}</Text>
              <Text style={[Typography.satoshiRegular, styles.memoryDescription]}>{memory.description}</Text>
            </View>
          </BlurView>
        ))}

        <TouchableOpacity activeOpacity={0.8} style={styles.ctaButton}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            <MaterialIcons name="add-circle-outline" size={24} color={DS.white} />
            <Text style={[Typography.satoshiMedium, styles.ctaButtonText]}>Add New Memory</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  memoryCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginBottom: 20,
    padding: 15,
  },
  memoryImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 15,
  },
  memoryDetails: {
    // Styles for text details
  },
  memoryTitle: {
    fontSize: 20,
    marginBottom: 8,
  },
  memoryDate: {
    fontSize: 14,
    marginBottom: 5,
    opacity: 0.8,
  },
  memoryDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.7,
  },
  ctaButton: {
    marginTop: 30,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradientBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    minHeight: 56,
  },
  ctaButtonText: {
    fontSize: 16,
    color: DS.white,
    marginLeft: 10,
  },
});
