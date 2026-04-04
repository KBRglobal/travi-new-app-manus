import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

// DS object as provided in the prompt

// Dummy data for hotels
const hotels = [
  { id: '1', name: 'Grand Hyatt', location: 'New York', price: '$350', rating: 4.5 },
  { id: '2', name: 'The Plaza Hotel', location: 'New York', price: '$500', rating: 4.8 },
  { id: '3', name: 'W Hotel', location: 'New York', price: '$280', rating: 4.2 },
  { id: '4', name: 'The St. Regis', location: 'New York', price: '$600', rating: 4.9 },
  { id: '5', name: 'Mandarin Oriental', location: 'New York', price: '$700', rating: 4.7 },
  { id: '6', name: 'The Peninsula', location: 'New York', price: '$550', rating: 4.6 },
];

const HotelSelectScreen = () => {
  return (
    <ScreenWrapper title="Select Hotel" scrollable={true}>
      <View style={styles.container}>
        {/* Search Input */}
        <BlurView intensity={20} tint="dark" style={styles.searchInputContainer}>
          <MaterialIcons name="search" size={20} color={DS.muted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for hotels..."
            placeholderTextColor={DS.placeholder}
          />
        </BlurView>

        {/* Hotel List */}
        {hotels.map((hotel) => (
          <BlurView key={hotel.id} intensity={20} tint="dark" style={styles.hotelCard}>
            <View style={styles.hotelInfo}>
              <Text style={styles.hotelName}>{hotel.name}</Text>
              <Text style={styles.hotelLocation}>{hotel.location}</Text>
              <View style={styles.ratingContainer}>
                <MaterialIcons name="star" size={16} color={DS.warning} />
                <Text style={styles.hotelRating}>{hotel.rating}</Text>
              </View>
            </View>
            <View style={styles.hotelActions}>
              <Text style={styles.hotelPrice}>{hotel.price}</Text>
              <TouchableOpacity style={styles.selectButton}>
                <LinearGradient
                  colors={[DS.purple, DS.pink] as const}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientButton}
                >
                  <Text style={styles.selectButtonText}>Select</Text>
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: DS.bg, // ScreenWrapper should handle this, but adding for clarity
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginBottom: 20,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: DS.white,
    fontFamily: 'Satoshi-Medium', // Assuming fonts are loaded
    fontSize: 16,
  },
  hotelCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginBottom: 15,
    padding: 15,
  },
  hotelInfo: {
    flex: 1,
  },
  hotelName: {
    fontFamily: 'Chillax-Bold', // Assuming fonts are loaded
    fontSize: 18,
    color: DS.white,
    marginBottom: 5,
  },
  hotelLocation: {
    fontFamily: 'Satoshi-Regular', // Assuming fonts are loaded
    fontSize: 14,
    color: DS.muted,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hotelRating: {
    fontFamily: 'Satoshi-Medium', // Assuming fonts are loaded
    fontSize: 14,
    color: DS.warning,
    marginLeft: 5,
  },
  hotelActions: {
    alignItems: 'flex-end',
  },
  hotelPrice: {
    fontFamily: 'Chillax-Bold', // Assuming fonts are loaded
    fontSize: 20,
    color: DS.white,
    marginBottom: 10,
  },
  selectButton: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectButtonText: {
    fontFamily: 'Satoshi-Medium', // Assuming fonts are loaded
    fontSize: 16,
    color: DS.white,
  },
});

export default HotelSelectScreen;
