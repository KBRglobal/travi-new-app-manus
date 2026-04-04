import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// DS object exported from ScreenWrapper.tsx
const DS = {
  bg: "#0A0514", surface: "rgba(36,16,62,0.55)", surfaceHigh: "rgba(50,20,80,0.7)",
  border: "rgba(123,68,230,0.22)", borderStrong: "rgba(100,67,244,0.4)",
  purple: "#6443F4", pink: "#F94498", success: "#02A65C", warning: "#FF9327",
  error: "#FF6B6B", info: "#01BEFF", white: "#FFFFFF", secondary: "#D3CFD8",
  muted: "#A79FB2", placeholder: "#7B6A94", gradient: ["#6443F4", "#F94498"],
};

const { width } = Dimensions.get('window');

const mockTravelers = [
  {
    id: '1',
    name: 'Alice',
    age: 28,
    location: 'New York, USA',
    bio: 'Adventure seeker and foodie. Looking for travel buddies for my next trip to Japan!',
    imageUrl: 'https://picsum.photos/id/1005/400/600',
  },
  {
    id: '2',
    name: 'Bob',
    age: 32,
    location: 'London, UK',
    bio: 'Loves hiking and exploring historical sites. Planning a backpacking trip through Europe.',
    imageUrl: 'https://picsum.photos/id/1011/400/600',
  },
  {
    id: '3',
    name: 'Charlie',
    age: 25,
    location: 'Sydney, Australia',
    bio: 'Beach lover and surf enthusiast. Always up for a spontaneous road trip!',
    imageUrl: 'https://picsum.photos/id/1012/400/600',
  },
];

const SwipeTravelersScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    // In a real app, this would handle actual swipe logic and data fetching
    console.log(`Swiped ${direction} for ${mockTravelers[currentIndex].name}`);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mockTravelers.length);
  };

  const currentTraveler = mockTravelers[currentIndex];

  return (
    <ScreenWrapper title="Swipe Travelers" scrollable={false} contentStyle={styles.screenWrapper}>
      <View style={styles.container}>
        {currentTraveler ? (
          <BlurView intensity={20} tint="dark" style={styles.card}>
            <Image source={{ uri: currentTraveler.imageUrl }} style={styles.travelerImage} />
            <View style={styles.infoContainer}>
              <Text style={styles.nameText}>{currentTraveler.name}, {currentTraveler.age}</Text>
              <Text style={styles.locationText}>
                <MaterialIcons name="location-on" size={16} color={DS.muted} /> {currentTraveler.location}
              </Text>
              <Text style={styles.bioText}>{currentTraveler.bio}</Text>
            </View>
            <View style={styles.actionsContainer}>
              <TouchableOpacity onPress={() => handleSwipe('left')} style={styles.actionButton}>
                <LinearGradient colors={[DS.error, '#FF3D68']} style={styles.gradientButton}>
                  <MaterialIcons name="close" size={30} color={DS.white} />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSwipe('right')} style={styles.actionButton}>
                <LinearGradient colors={[DS.success, '#00C853']} style={styles.gradientButton}>
                  <MaterialIcons name="check" size={30} color={DS.white} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </BlurView>
        ) : (
          <Text style={styles.noTravelersText}>No more travelers to swipe!</Text>
        )}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    backgroundColor: DS.bg,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: DS.bg,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    width: width * 0.9,
    maxWidth: 400,
    aspectRatio: 0.7,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  travelerImage: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  infoContainer: {
    padding: 15,
  },
  nameText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 24,
    color: DS.white,
    marginBottom: 5,
  },
  locationText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bioText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.secondary,
    lineHeight: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  gradientButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTravelersText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.muted,
  },
});

export default SwipeTravelersScreen;
