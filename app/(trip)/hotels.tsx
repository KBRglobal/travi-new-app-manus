
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

// DS object exported from ScreenWrapper.tsx (as provided in the prompt)

const hotelsData = [
  {
    id: '1',
    name: 'Grand Hyatt Dubai',
    location: 'Dubai, UAE',
    price: '$300/night',
    rating: 4.5,
    imageUrl: 'https://via.placeholder.com/150/92c952',
  },
  {
    id: '2',
    name: 'Jumeirah Beach Hotel',
    location: 'Dubai, UAE',
    price: '$500/night',
    rating: 4.8,
    imageUrl: 'https://via.placeholder.com/150/771796',
  },
  {
    id: '3',
    name: 'Atlantis, The Palm',
    location: 'Dubai, UAE',
    price: '$700/night',
    rating: 4.7,
    imageUrl: 'https://via.placeholder.com/150/24f355',
  },
];

const HotelsScreen = () => {
  const router = useRouter();
  return (
    <ScreenWrapper title="Available Hotels" scrollable={true}>
      {hotelsData.map((hotel) => (
        <BlurView key={hotel.id} intensity={20} tint="dark" style={styles.card}>
          <Image source={{ uri: hotel.imageUrl }} style={styles.image} />
          <View style={styles.infoContainer}>
            <Text style={styles.hotelName}>{hotel.name}</Text>
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={16} color={DS.muted} />
              <Text style={styles.hotelLocation}>{hotel.location}</Text>
            </View>
            <Text style={styles.hotelPrice}>{hotel.price}</Text>
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={16} color={DS.warning} />
              <Text style={styles.hotelRating}>{hotel.rating}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/(trip)/swipe' as any)}>
              <LinearGradient
                colors={[DS.purple, DS.pink] as const}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>View Details</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </BlurView>
      ))}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  hotelName: {
    fontSize: 18,
    fontFamily: 'Chillax-Bold',
    color: DS.white,
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  hotelLocation: {
    fontSize: 14,
    fontFamily: 'Satoshi-Regular',
    color: DS.muted,
    marginLeft: 5,
  },
  hotelPrice: {
    fontSize: 16,
    fontFamily: 'Satoshi-Medium',
    color: DS.white,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  hotelRating: {
    fontSize: 14,
    fontFamily: 'Satoshi-Regular',
    color: DS.white,
    marginLeft: 5,
  },
  button: {
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 10,
  },
  gradientButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: DS.white,
    fontFamily: 'Satoshi-Medium',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HotelsScreen;
