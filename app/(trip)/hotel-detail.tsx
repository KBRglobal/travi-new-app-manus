import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const hotelData = {
  name: 'Grand Hyatt Bali',
  location: 'Nusa Dua, Bali, Indonesia',
  rating: 4.5,
  price: '$350/night',
  image: 'https://images.unsplash.com/photo-1566073771259-d34230f4e094?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  description: 'Nestled in the heart of Nusa Dua, Grand Hyatt Bali is a luxurious beachfront resort offering a blend of Balinese hospitality and modern amenities. Enjoy spacious rooms, multiple swimming pools, diverse dining options, and a serene spa.',
  amenities: ['Free Wi-Fi', 'Swimming Pool', 'Spa', 'Fitness Center', 'Restaurant', 'Bar', 'Beach Access'],
};

const HotelDetailScreen = () => {
  return (
    <ScreenWrapper title="Hotel Details" scrollable={true}>
      <View style={styles.container}>
        <Image source={{ uri: hotelData.image }} style={styles.hotelImage} />

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <Text style={styles.hotelName}>{hotelData.name}</Text>
          <View style={styles.locationContainer}>
            <MaterialIcons name="location-on" size={16} color={DS.muted} />
            <Text style={styles.hotelLocation}>{hotelData.location}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={16} color={DS.warning} />
            <Text style={styles.hotelRating}>{hotelData.rating}</Text>
          </View>
          <Text style={styles.hotelDescription}>{hotelData.description}</Text>

          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesContainer}>
            {hotelData.amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <MaterialIcons name="check-circle" size={16} color={DS.success} />
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Price:</Text>
            <Text style={styles.hotelPrice}>{hotelData.price}</Text>
          </View>

          <TouchableOpacity style={styles.ctaButton}>
            <LinearGradient
              colors={[DS.purple, DS.pink] as const}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              <Text style={styles.ctaButtonText}>Book Now</Text>
            </LinearGradient>
          </TouchableOpacity>
        </BlurView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DS.bg,
    paddingBottom: 20,
  },
  hotelImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginHorizontal: 20,
    padding: 20,
    marginBottom: 20,
  },
  hotelName: {
    fontFamily: 'Chillax-Bold',
    fontSize: 24,
    color: DS.white,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  hotelLocation: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.muted,
    marginLeft: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  hotelRating: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.warning,
    marginLeft: 5,
  },
  hotelDescription: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.secondary,
    lineHeight: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginBottom: 10,
  },
  amenitiesContainer: {
    marginBottom: 20,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  amenityText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.secondary,
    marginLeft: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  priceLabel: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.muted,
  },
  hotelPrice: {
    fontFamily: 'Chillax-Bold',
    fontSize: 22,
    color: DS.white,
  },
  ctaButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
  },
  gradientButton: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
  },
});

export default HotelDetailScreen;
