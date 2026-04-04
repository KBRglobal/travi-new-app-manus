import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const categoriesData = [
  { id: '1', name: 'Adventure', icon: 'hiking' },
  { id: '2', name: 'Relaxation', icon: 'spa' },
  { id: '3', name: 'Culture', icon: 'museum' },
  { id: '4', name: 'Food & Drink', icon: 'restaurant' },
  { id: '5', name: 'Nature', icon: 'forest' },
  { id: '6', name: 'City Breaks', icon: 'location-city' },
  { id: '7', name: 'Beach', icon: 'beach-access' },
  { id: '8', name: 'Skiing', icon: 'downhill-skiing' },
];

const CategoriesScreen = () => {
  const router = useRouter();
  return (
    <ScreenWrapper title="Explore Categories" scrollable={true}>
      <View style={styles.container}>
        {categoriesData.map((category) => (
          <TouchableOpacity key={category.id} style={styles.categoryCard}>
            <BlurView intensity={20} tint="dark" style={styles.blurContainer}>
              <View style={styles.cardContent}>
                <MaterialIcons name={category.icon as any} size={32} color={DS.purple} />
                <Text style={styles.categoryName}>{category.name}</Text>
              </View>
            </BlurView>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.ctaButton} onPress={() => router.push("/(dna)/quick-swipe" as any)}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.ctaButtonText}>Discover More</Text>
            <MaterialIcons name="arrow-forward" size={20} color={DS.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 16,
  },
  categoryCard: {
    width: '45%',
    height: 150,
    marginVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  blurContainer: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    alignItems: 'center',
  },
  categoryName: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
    marginTop: 8,
  },
  ctaButton: {
    width: '95%',
    height: 50,
    marginVertical: 16,
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradientButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginRight: 10,
  },
});

export default CategoriesScreen;
