import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const destinations = [
  {
    id: '1',
    name: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1502602898666-8f426107dd3d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'The City of Love, known for its iconic Eiffel Tower, Louvre Museum, and romantic ambiance.',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1542051841-38fdc1d2dd84?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Ancient temples, serene gardens, and traditional geisha districts.',
    rating: 4.7,
  },
  {
    id: '3',
    name: 'Rio de Janeiro, Brazil',
    image: 'https://images.unsplash.com/photo-1483729558449-99fd58385531?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Vibrant beaches, lush mountains, and the iconic Christ the Redeemer statue.',
    rating: 4.9,
  },
];

const DestinationSwipeScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % destinations.length);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + destinations.length) % destinations.length);
    }
  };

  const currentDestination = destinations[currentIndex];

  return (
    <ScreenWrapper title="Discover Destinations" scrollable={true}>
      <View style={styles.container}>
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <Image source={{ uri: currentDestination.image }} style={styles.image} />
          <View style={styles.infoContainer}>
            <Text style={styles.destinationName}>{currentDestination.name}</Text>
            <Text style={styles.destinationDescription}>{currentDestination.description}</Text>
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={16} color={DS.warning} />
              <Text style={styles.ratingText}>{currentDestination.rating}</Text>
            </View>
            <View style={styles.actionsContainer}>
              <TouchableOpacity onPress={() => handleSwipe('left')} style={styles.actionButton}>
                <LinearGradient colors={[DS.purple, DS.pink] as const} style={styles.gradientButton}>
                  <MaterialIcons name="close" size={24} color={DS.white} />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSwipe('right')} style={styles.actionButton}>
                <LinearGradient colors={[DS.purple, DS.pink] as const} style={styles.gradientButton}>
                  <MaterialIcons name="favorite" size={24} color={DS.white} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: width * 0.9,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    shadowColor: DS.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  image: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  infoContainer: {
    padding: 20,
  },
  destinationName: {
    fontFamily: 'Chillax-Bold',
    fontSize: 28,
    color: DS.white,
    marginBottom: 10,
  },
  destinationDescription: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
    marginBottom: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.warning,
    marginLeft: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  gradientButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DestinationSwipeScreen;
