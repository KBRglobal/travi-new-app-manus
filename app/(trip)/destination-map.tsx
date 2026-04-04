import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper'; // Assuming ScreenWrapper exports DS
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

// Assuming custom fonts are loaded globally or via a font loader
// For this example, we'll use generic fallbacks and add comments for TRAVI fonts

const DestinationMapScreen = () => {
  const router = useRouter();
  // Mock data for destinations
  const destinations = [
    { id: '1', name: 'Eiffel Tower', distance: '2.5 km', image: 'https://via.placeholder.com/150/6443F4/FFFFFF?text=Eiffel' },
    { id: '2', name: 'Louvre Museum', distance: '4.1 km', image: 'https://via.placeholder.com/150/F94498/FFFFFF?text=Louvre' },
    { id: '3', name: 'Notre Dame', distance: '1.8 km', image: 'https://via.placeholder.com/150/02A65C/FFFFFF?text=NotreDame' },
  ];

  return (
    <ScreenWrapper title="Destination Map" scrollable={true}>
      <View style={styles.mapContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/800x400/0A0514/A79FB2?text=Map+View' }}
          style={styles.mapImage}
          resizeMode="cover"
        />
        <BlurView intensity={20} tint="dark" style={styles.currentLocationCard}>
          <View style={styles.locationHeader}>
            <MaterialIcons name="location-on" size={20} color={DS.purple} />
            <Text style={styles.locationHeaderText}>Current Location</Text>
          </View>
          <Text style={styles.locationAddress}>123 Main St, Paris, France</Text>
        </BlurView>
      </View>

      <View style={styles.destinationList}>
        <Text style={styles.listTitle}>Nearby Destinations</Text>
        {destinations.map((destination) => (
          <BlurView key={destination.id} intensity={20} tint="dark" style={styles.destinationCard}>
            <Image source={{ uri: destination.image }} style={styles.destinationImage} />
            <View style={styles.destinationInfo}>
              <Text style={styles.destinationName}>{destination.name}</Text>
              <Text style={styles.destinationDistance}>{destination.distance}</Text>
            </View>
            <TouchableOpacity style={styles.navigateButton} onPress={() => {}}>
              <LinearGradient
                colors={[DS.purple, DS.pink] as const}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientButton}
              >
                <MaterialIcons name="navigation" size={24} color={DS.white} />
              </LinearGradient>
            </TouchableOpacity>
          </BlurView>
        ))}
      </View>

      <TouchableOpacity style={styles.viewAllButton} onPress={() => router.push('/(live)/map' as any)}>
        <LinearGradient
          colors={[DS.purple, DS.pink] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientButtonFullWidth}
        >
          <Text style={styles.viewAllButtonText}>View All Destinations</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: 250,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  currentLocationCard: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 16,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationHeaderText: {
    color: DS.white,
    fontSize: 16,
    marginLeft: 8,
    // fontFamily: 'Satoshi-Medium',
  },
  locationAddress: {
    color: DS.muted,
    fontSize: 14,
    // fontFamily: 'Satoshi-Regular',
  },
  destinationList: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  listTitle: {
    fontSize: 20,
    color: DS.white,
    marginBottom: 16,
    // fontFamily: 'Chillax-Bold',
  },
  destinationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 12,
    marginBottom: 12,
  },
  destinationImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
  },
  destinationInfo: {
    flex: 1,
  },
  destinationName: {
    color: DS.white,
    fontSize: 16,
    marginBottom: 4,
    // fontFamily: 'Satoshi-Medium',
  },
  destinationDistance: {
    color: DS.muted,
    fontSize: 14,
    // fontFamily: 'Satoshi-Regular',
  },
  navigateButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    marginLeft: 12,
  },
  gradientButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewAllButton: {
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  gradientButtonFullWidth: {
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewAllButtonText: {
    color: DS.white,
    fontSize: 18,
    // fontFamily: 'Chillax-Bold',
  },
});

export default DestinationMapScreen;
