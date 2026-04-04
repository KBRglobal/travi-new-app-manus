import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

interface Destination {
  id: string;
  name: string;
  country: string;
}

const dummyDestinations: Destination[] = [
  { id: '1', name: 'Paris', country: 'France' },
  { id: '2', name: 'Tokyo', country: 'Japan' },
  { id: '3', name: 'New York', country: 'USA' },
  { id: '4', name: 'London', country: 'UK' },
  { id: '5', name: 'Sydney', country: 'Australia' },
];

const DestinationSelectScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const filteredDestinations = dummyDestinations.filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderDestinationItem = ({ item }: { item: Destination }) => (
    <TouchableOpacity
      style={styles.destinationItem}
      onPress={() => setSelectedDestination(item)}
    >
      <BlurView intensity={20} tint="dark" style={styles.glassCard}>
        <View style={styles.destinationContent}>
          <MaterialIcons name="location-city" size={24} color={DS.purple} />
          <View style={styles.destinationText}>
            <Text style={styles.destinationName}>{item.name}</Text>
            <Text style={styles.destinationCountry}>{item.country}</Text>
          </View>
          {selectedDestination?.id === item.id && (
            <MaterialIcons name="check-circle" size={24} color={DS.success} style={styles.selectedIcon} />
          )}
        </View>
      </BlurView>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper title="Select Destination" scrollable={true}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a destination..."
          placeholderTextColor={DS.placeholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <FlatList
          data={filteredDestinations}
          renderItem={renderDestinationItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />

        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => console.log('Proceed with:', selectedDestination?.name)}
          disabled={!selectedDestination}
        >
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            style={styles.gradientBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.ctaButtonText}>Proceed</Text>
            <MaterialIcons name="arrow-forward" size={20} color={DS.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchInput: {
    height: 50,
    backgroundColor: DS.surface,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: DS.white,
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    borderWidth: 1,
    borderColor: DS.border,
  },
  listContent: {
    paddingBottom: 100, // To ensure CTA button doesn't overlap last item
  },
  destinationItem: {
    marginBottom: 15,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 15,
  },
  destinationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  destinationText: {
    marginLeft: 15,
    flex: 1,
  },
  destinationName: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
  },
  destinationCountry: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.muted,
    marginTop: 2,
  },
  selectedIcon: {
    marginLeft: 'auto',
  },
  ctaButton: {
    marginTop: 30,
    borderRadius: 12,
    overflow: 'hidden',
    alignSelf: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 20,
  },
  gradientBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginRight: 10,
  },
});

export default DestinationSelectScreen;
