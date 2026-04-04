import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

interface TripCardProps {
  destination: string;
  dates: string;
  price: string;
  image: string;
}

const tripData: TripCardProps[] = [
  {
    destination: 'Paris, France',
    dates: 'Oct 20 - Oct 27',
    price: '$1200',
    image: 'https://images.unsplash.com/photo-1502602898669-a356c934764b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    destination: 'Tokyo, Japan',
    dates: 'Nov 10 - Nov 17',
    price: '$1800',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabee68?q=80&w=2894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    destination: 'Rio de Janeiro, Brazil',
    dates: 'Dec 01 - Dec 08',
    price: '$1500',
    image: 'https://images.unsplash.com/photo-1483729558449-9355a07fcb24?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const SwipeScreen = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % tripData.length);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + tripData.length) % tripData.length);
    }
  };

  const currentTrip = tripData[currentIndex];

  return (
    <ScreenWrapper title="Discover Trips" scrollable={true}>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <BlurView intensity={20} tint="dark" style={styles.blurCard}>
            <View style={styles.cardContent}>
              <Text style={styles.destinationText}>{currentTrip.destination}</Text>
              <Text style={styles.datesText}>{currentTrip.dates}</Text>
              <Text style={styles.priceText}>{currentTrip.price}</Text>
            </View>
          </BlurView>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => handleSwipe('left')} style={styles.actionButton}>
            <LinearGradient
              colors={[DS.purple, DS.pink] as const}
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <MaterialIcons name="close" size={32} color={DS.white} />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSwipe('right')} style={styles.actionButton}>
            <LinearGradient
              colors={[DS.purple, DS.pink] as const}
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <MaterialIcons name="check" size={32} color={DS.white} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={{ marginTop: 24, marginHorizontal: 20, borderRadius: 16, overflow: 'hidden' }}
        onPress={() => router.push('/(trip)/itinerary-builder' as any)}
      >
        <LinearGradient
          colors={[DS.purple, DS.pink] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 18, alignItems: 'center' }}
        >
          <Text style={{ fontFamily: 'Chillax-Bold', fontSize: 18, color: DS.white }}>Build My Itinerary →</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  cardContainer: {
    width: width * 0.9,
    height: width * 1.2,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 30,
    backgroundColor: DS.surfaceHigh, // Placeholder for image background
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  blurCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
    width: '100%',
  },
  cardContent: {
    // Styles for content inside the blur card
  },
  destinationText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 28,
    color: DS.white,
    marginBottom: 5,
  },
  datesText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.muted,
    marginBottom: 10,
  },
  priceText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 22,
    color: DS.white,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
  },
  gradientButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SwipeScreen;
