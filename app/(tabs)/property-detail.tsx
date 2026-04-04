import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

// Placeholder for custom fonts, assuming they are loaded globally or via a utility
// In a real app, you'd import them or ensure they are loaded.
const Fonts = {
  ChillaxBold: 'Chillax-Bold',
  SatoshiMedium: 'Satoshi-Medium',
  SatoshiRegular: 'Satoshi-Regular',
};

const PropertyDetailScreen = () => {
  const router = useRouter();
  // Placeholder data for a property
  const property = {
    id: '1',
    name: 'Luxury Beachfront Villa',
    location: 'Malibu, California',
    price: '$1,200 / night',
    rating: 4.8,
    reviews: 125,
    description: 'Experience unparalleled luxury in this stunning beachfront villa. Enjoy breathtaking ocean views, private beach access, and world-class amenities. Perfect for a serene getaway or an unforgettable family vacation.',
    amenities: ['Private Pool', 'Ocean View', 'Wi-Fi', 'Fully Equipped Kitchen', 'Air Conditioning', 'Parking'],
    images: [
      'https://via.placeholder.com/400x250/6443F4/FFFFFF?text=Property+Image+1',
      'https://via.placeholder.com/400x250/F94498/FFFFFF?text=Property+Image+2',
      'https://via.placeholder.com/400x250/0A0514/FFFFFF?text=Property+Image+3',
    ],
  };

  return (
    <ScreenWrapper title="Property Details" scrollable={true}>
      <View style={styles.container}>
        {/* Property Image Carousel (simplified) */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageCarousel}>
          {property.images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.propertyImage} />
          ))}
        </ScrollView>

        {/* Property Info Card */}
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <Text style={styles.propertyName}>{property.name}</Text>
          <View style={styles.locationRatingContainer}>
            <MaterialIcons name="location-on" size={18} color={DS.muted} />
            <Text style={styles.locationText}>{property.location}</Text>
            <MaterialIcons name="star" size={18} color={DS.warning} style={{ marginLeft: 10 }} />
            <Text style={styles.ratingText}>{property.rating} ({property.reviews} reviews)</Text>
          </View>
          <Text style={styles.priceText}>{property.price}</Text>
        </BlurView>

        {/* Description Card */}
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.bodyText}>{property.description}</Text>
        </BlurView>

        {/* Amenities Card */}
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesContainer}>
            {property.amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <MaterialIcons name="check-circle-outline" size={20} color={DS.success} />
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>
        </BlurView>

        {/* Call to Action Button */}
        <TouchableOpacity style={styles.ctaButtonContainer} onPress={() => router.push('/(trip)/checkout-payment' as any)}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaButtonGradient}
          >
            <Text style={styles.ctaButtonText}>Book Now</Text>
            <MaterialIcons name="arrow-forward" size={20} color={DS.white} style={{ marginLeft: 8 }} />
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
    backgroundColor: DS.bg, // Ensure background is set if not fully covered by ScreenWrapper
  },
  imageCarousel: {
    marginBottom: 20,
  },
  propertyImage: {
    width: 300,
    height: 200,
    borderRadius: 16,
    marginRight: 15,
    resizeMode: 'cover',
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
    marginBottom: 20,
  },
  propertyName: {
    fontFamily: Fonts.ChillaxBold,
    fontSize: 28,
    color: DS.white,
    marginBottom: 8,
  },
  locationRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  locationText: {
    fontFamily: Fonts.SatoshiRegular,
    fontSize: 16,
    color: DS.muted,
    marginLeft: 5,
  },
  ratingText: {
    fontFamily: Fonts.SatoshiRegular,
    fontSize: 16,
    color: DS.muted,
    marginLeft: 5,
  },
  priceText: {
    fontFamily: Fonts.ChillaxBold,
    fontSize: 24,
    color: DS.purple,
  },
  sectionTitle: {
    fontFamily: Fonts.ChillaxBold,
    fontSize: 22,
    color: DS.white,
    marginBottom: 10,
  },
  bodyText: {
    fontFamily: Fonts.SatoshiRegular,
    fontSize: 16,
    color: DS.secondary,
    lineHeight: 24,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 10,
  },
  amenityText: {
    fontFamily: Fonts.SatoshiRegular,
    fontSize: 15,
    color: DS.secondary,
    marginLeft: 5,
  },
  ctaButtonContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 20,
  },
  ctaButtonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  ctaButtonText: {
    fontFamily: Fonts.ChillaxBold,
    fontSize: 18,
    color: DS.white,
  },
});

export default PropertyDetailScreen;
