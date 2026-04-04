import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const RealEstateGuideScreen = () => {
  const guideData = [
    {
      id: '1',
      title: 'Understanding Property Types',
      description: 'Explore different types of properties like apartments, villas, and townhouses.',
      image: 'https://via.placeholder.com/150/6443F4/FFFFFF?text=Property+Types',
    },
    {
      id: '2',
      title: 'Financing Your Dream Home',
      description: 'Learn about mortgage options, interest rates, and financial planning.',
      image: 'https://via.placeholder.com/150/F94498/FFFFFF?text=Financing+Home',
    },
    {
      id: '3',
      title: 'Legal Aspects of Real Estate',
      description: 'Understand contracts, property laws, and legal procedures.',
      image: 'https://via.placeholder.com/150/02A65C/FFFFFF?text=Legal+Aspects',
    },
    {
      id: '4',
      title: 'Investment Opportunities',
      description: 'Discover lucrative real estate investment strategies and market trends.',
      image: 'https://via.placeholder.com/150/FF9327/FFFFFF?text=Investment',
    },
  ];

  return (
    <ScreenWrapper title="Real Estate Guide" scrollable={true}>
      <View style={styles.container}>
        {guideData.map((item) => (
          <BlurView key={item.id} intensity={20} tint="dark" style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
              <TouchableOpacity style={styles.readMoreButton}>
                <LinearGradient
                  colors={[DS.purple, DS.pink] as const}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientButton}
                >
                  <Text style={styles.readMoreButtonText}>Read More</Text>
                  <MaterialIcons name="arrow-forward" size={18} color={DS.white} />
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
    backgroundColor: DS.bg,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginBottom: 20,
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 20,
    color: DS.white,
    marginBottom: 8,
  },
  cardDescription: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.muted,
    marginBottom: 15,
  },
  readMoreButton: {
    marginTop: 10,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  readMoreButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
    marginRight: 5,
  },
});

export default RealEstateGuideScreen;
