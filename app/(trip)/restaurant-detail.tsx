import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

// Assuming DS is exported from ScreenWrapper or a separate design system file

const RestaurantDetailScreen = () => {
  // Dummy data for the restaurant
  const restaurant = {
    name: "Gourmet Haven",
    description: "Experience exquisite dining with a modern twist. Our chefs craft culinary masterpieces using the freshest local ingredients.",
    address: "123 Culinary Lane, Foodie City",
    phone: "+1 (555) 123-4567",
    hours: "Mon-Fri: 11 AM - 10 PM, Sat-Sun: 10 AM - 11 PM",
    image: 'https://via.placeholder.com/400x200/6443F4/FFFFFF?text=Restaurant+Image',
    rating: 4.8,
    reviews: 245,
  };

  return (
    <ScreenWrapper title="Restaurant Details" scrollable={true}>
      <View style={styles.headerImageContainer}>
        <Image source={{ uri: restaurant.image }} style={styles.headerImage} />
        <BlurView intensity={20} tint="dark" style={styles.ratingCard}>
          <MaterialIcons name="star" size={16} color={DS.warning} />
          <Text style={styles.ratingText}>{restaurant.rating} ({restaurant.reviews})</Text>
        </BlurView>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{restaurant.name}</Text>
        <Text style={styles.description}>{restaurant.description}</Text>

        <BlurView intensity={20} tint="dark" style={styles.infoCard}>
          <View style={styles.infoItem}>
            <MaterialIcons name="location-on" size={20} color={DS.secondary} />
            <Text style={styles.infoText}>{restaurant.address}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="phone" size={20} color={DS.secondary} />
            <Text style={styles.infoText}>{restaurant.phone}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="access-time" size={20} color={DS.secondary} />
            <Text style={styles.infoText}>{restaurant.hours}</Text>
          </View>
        </BlurView>

        <TouchableOpacity style={styles.ctaButton}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.ctaButtonText}>Book a Table</Text>
            <MaterialIcons name="arrow-forward" size={20} color={DS.white} style={{ marginLeft: 8 }} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  headerImageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  ratingCard: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
  },
  ratingText: {
    fontFamily: 'Satoshi-Medium', // Placeholder for Satoshi-Medium
    fontSize: 14,
    color: DS.white,
    marginLeft: 5,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontFamily: 'Chillax-Bold', // Placeholder for Chillax-Bold
    fontSize: 28,
    color: DS.white,
    marginBottom: 10,
  },
  description: {
    fontFamily: 'Satoshi-Regular', // Placeholder for Satoshi-Regular
    fontSize: 16,
    color: DS.muted,
    lineHeight: 24,
    marginBottom: 20,
  },
  infoCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 15,
    marginBottom: 30,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontFamily: 'Satoshi-Regular', // Placeholder for Satoshi-Regular
    fontSize: 15,
    color: DS.secondary,
    marginLeft: 10,
  },
  ctaButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold', // Placeholder for Chillax-Bold
    fontSize: 18,
    color: DS.white,
  },
});

export default RestaurantDetailScreen;
