import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
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

const PostTripGallery = () => {
  const router = useRouter();
  const photos = [
    'https://via.placeholder.com/150/FF0000/FFFFFF?text=Photo1',
    'https://via.placeholder.com/150/00FF00/FFFFFF?text=Photo2',
    'https://via.placeholder.com/150/0000FF/FFFFFF?text=Photo3',
    'https://via.placeholder.com/150/FFFF00/000000?text=Photo4',
    'https://via.placeholder.com/150/00FFFF/000000?text=Photo5',
  ];

  return (
    <ScreenWrapper title="Your Trip Gallery" scrollable={true}>
      <View style={styles.galleryContainer}>
        {photos.map((photo, index) => (
          <BlurView key={index} intensity={20} tint="dark" style={styles.glassCard}>
            <Image source={{ uri: photo }} style={styles.image} />
          </BlurView>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)/trips' as any)}>
        <LinearGradient
          colors={[DS.purple, DS.pink] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          <MaterialIcons name="share" size={20} color={DS.white} />
          <Text style={styles.buttonText}>Share Gallery</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  galleryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    margin: 8,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16, // Apply to image as well for consistency within the card
  },
  button: {
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradientButton: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  buttonText: {
    color: DS.white,
    fontSize: 18,
    fontFamily: 'Satoshi-Medium', // Assuming Satoshi-Medium for labels/buttons
  },
});

export default PostTripGallery;
