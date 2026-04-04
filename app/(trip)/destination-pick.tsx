import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const DestinationPickScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const popularDestinations = [
    { id: '1', name: 'Paris, France', image: 'https://via.placeholder.com/150/6443F4/FFFFFF?text=Paris' },
    { id: '2', name: 'Tokyo, Japan', image: 'https://via.placeholder.com/150/F94498/FFFFFF?text=Tokyo' },
    { id: '3', name: 'New York, USA', image: 'https://via.placeholder.com/150/02A65C/FFFFFF?text=New+York' },
    { id: '4', name: 'Sydney, Australia', image: 'https://via.placeholder.com/150/FF9327/FFFFFF?text=Sydney' },
  ];

  const handleSearch = () => {
    // Implement search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <ScreenWrapper title="Pick Your Destination" scrollable={true}>
      <View style={styles.searchContainer}>
        <BlurView intensity={20} tint="dark" style={styles.searchInputWrapper}>
          <MaterialIcons name="search" size={24} color={DS.muted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Where do you want to go?"
            placeholderTextColor={DS.placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
        </BlurView>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular Destinations</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.popularDestinationsContainer}>
        {popularDestinations.map((destination) => (
          <BlurView key={destination.id} intensity={20} tint="dark" style={styles.destinationCard}>
            <View style={styles.destinationImagePlaceholder} />
            <Text style={styles.destinationName}>{destination.name}</Text>
          </BlurView>
        ))}
      </ScrollView>

      <View style={styles.ctaContainer}>
        <TouchableOpacity onPress={() => console.log('Explore All Destinations')}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaButton}
          >
            <Text style={styles.ctaButtonText}>Explore All Destinations</Text>
            <MaterialIcons name="arrow-forward" size={20} color={DS.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: DS.white,
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 22,
    color: DS.white,
  },
  popularDestinationsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  destinationCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginRight: 15,
    width: 150,
    height: 180,
    justifyContent: 'flex-end',
    padding: 15,
  },
  destinationImagePlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.1)', // Placeholder for image
    borderRadius: 16,
  },
  destinationName: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
    marginTop: 10,
  },
  ctaContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    height: 55,
  },
  ctaButtonText: {
    color: DS.white,
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    marginRight: 10,
  },
});

export default DestinationPickScreen;
