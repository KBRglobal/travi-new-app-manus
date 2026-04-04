import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const RealEstateScreen = () => {
  return (
    <ScreenWrapper title="Real Estate" scrollable={true}>
      <View style={styles.contentContainer}>
        {/* Header Section */}
        <Text style={styles.headerTitle}>Explore Properties</Text>

        {/* Search Bar Placeholder */}
        <BlurView intensity={20} style={styles.glassCard}>
          <View style={styles.searchBar}>
            <MaterialIcons name="search" size={24} color={DS.muted} />
            <Text style={styles.searchText}>Search for properties...</Text>
          </View>
        </BlurView>

        {/* Property Listing Cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {[1, 2, 3].map((item) => (
            <BlurView key={item} intensity={20} style={styles.propertyCard}>
              <View style={styles.propertyImagePlaceholder} />
              <Text style={styles.propertyName}>Modern Apartment {item}</Text>
              <Text style={styles.propertyLocation}>New York, USA</Text>
              <Text style={styles.propertyPrice}>$1,200,000</Text>
              <LinearGradient
                colors={[DS.purple, DS.pink] as const}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.ctaButton}
              >
                <Text style={styles.ctaButtonText}>View Details</Text>
              </LinearGradient>
            </BlurView>
          ))}
        </ScrollView>

        {/* Featured Properties Section */}
        <Text style={styles.sectionTitle}>Featured Listings</Text>
        {[4, 5].map((item) => (
          <BlurView key={item} intensity={20} style={styles.featuredPropertyCard}>
            <View style={styles.featuredPropertyImagePlaceholder} />
            <View style={styles.featuredPropertyDetails}>
              <Text style={styles.propertyName}>Luxury Villa {item}</Text>
              <Text style={styles.propertyLocation}>Miami, USA</Text>
              <Text style={styles.propertyPrice}>$3,500,000</Text>
              <LinearGradient
                colors={[DS.purple, DS.pink] as const}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.ctaButton}
              >
                <Text style={styles.ctaButtonText}>View Details</Text>
              </LinearGradient>
            </View>
          </BlurView>
        ))}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 28,
    color: DS.white,
    marginBottom: 20,
    marginTop: 10,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  searchText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.muted,
    marginLeft: 10,
  },
  horizontalScroll: {
    marginBottom: 30,
  },
  propertyCard: {
    width: 200,
    marginRight: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 15,
    alignItems: 'center',
  },
  propertyImagePlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: DS.placeholder,
    borderRadius: 10,
    marginBottom: 10,
  },
  propertyName: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    textAlign: 'center',
    marginBottom: 5,
  },
  propertyLocation: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.muted,
    textAlign: 'center',
    marginBottom: 10,
  },
  propertyPrice: {
    fontFamily: 'Chillax-Bold',
    fontSize: 20,
    color: DS.success,
    marginBottom: 15,
  },
  ctaButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
  },
  sectionTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 24,
    color: DS.white,
    marginBottom: 20,
  },
  featuredPropertyCard: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  featuredPropertyImagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: DS.placeholder,
    borderRadius: 10,
    marginRight: 15,
  },
  featuredPropertyDetails: {
    flex: 1,
  },
});

export default RealEstateScreen;
