import { useRouter } from 'expo-router';

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

// Dummy data for the packing list
const initialPackingList = [
  { id: '1', item: 'Passport', packed: false, category: 'Documents' },
  { id: '2', item: 'Flight Tickets', packed: false, category: 'Documents' },
  { id: '3', item: 'Travel Insurance', packed: false, category: 'Documents' },
  { id: '4', item: 'Phone Charger', packed: false, category: 'Electronics' },
  { id: '5', item: 'Power Bank', packed: false, category: 'Electronics' },
  { id: '6', item: 'Headphones', packed: false, category: 'Electronics' },
  { id: '7', item: 'T-shirts (5)', packed: false, category: 'Clothing' },
  { id: '8', item: 'Pants (2)', packed: false, category: 'Clothing' },
  { id: '9', item: 'Socks (7)', packed: false, category: 'Clothing' },
  { id: '10', item: 'Underwear (7)', packed: false, category: 'Clothing' },
  { id: '11', item: 'Toothbrush', packed: false, category: 'Toiletries' },
  { id: '12', item: 'Toothpaste', packed: false, category: 'Toiletries' },
  { id: '13', item: 'Shampoo', packed: false, category: 'Toiletries' },
  { id: '14', item: 'Sunscreen', packed: false, category: 'Toiletries' },
  { id: '15', item: 'Book', packed: false, category: 'Miscellaneous' },
  { id: '16', item: 'Snacks', packed: false, category: 'Miscellaneous' },
];

const PackingListScreen = () => {
  const router = useRouter();
  const [packingList, setPackingList] = useState(initialPackingList);

  const togglePacked = (id: string) => {
    setPackingList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const categories = Array.from(new Set(packingList.map((item) => item.category)));

  return (
    <ScreenWrapper title="Packing List" scrollable={true}>
      <View style={styles.container}>
        {categories.map((category) => (
          <View key={category} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category}</Text>
            {packingList
              .filter((item) => item.category === category)
              .map((item) => (
                <BlurView
                  key={item.id}
                  intensity={20}
                  tint="dark"
                  style={styles.glassCard}
                >
                  <TouchableOpacity
                    onPress={() => togglePacked(item.id)}
                    style={styles.itemRow}
                  >
                    <MaterialIcons
                      name={item.packed ? 'check-box' : 'check-box-outline-blank'}
                      size={24}
                      color={item.packed ? DS.success : DS.white}
                    />
                    <Text
                      style={[
                        styles.itemText,
                        item.packed && styles.itemTextPacked,
                      ]}
                    >
                      {item.item}
                    </Text>
                  </TouchableOpacity>
                </BlurView>
              ))}
          </View>
        ))}

        <TouchableOpacity style={styles.ctaButton} onPress={() => router.push("/(trip)/pre-trip-dashboard" as any)}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            <Text style={styles.ctaButtonText}>Add New Item</Text>
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
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 22,
    color: DS.white,
    marginBottom: 15,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginBottom: 10,
    padding: 15,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.white,
    marginLeft: 10,
    flex: 1,
  },
  itemTextPacked: {
    textDecorationLine: 'line-through',
    color: DS.muted,
  },
  ctaButton: {
    marginTop: 30,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradientBackground: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
  },
});

export default PackingListScreen;
