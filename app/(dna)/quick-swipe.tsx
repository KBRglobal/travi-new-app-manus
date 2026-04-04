import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

// DS object (assuming it's exported from ScreenWrapper or a similar design system file)
const DS = {
  bg: "#0A0514", surface: "rgba(36,16,62,0.55)", surfaceHigh: "rgba(50,20,80,0.7)",
  border: "rgba(123,68,230,0.22)", borderStrong: "rgba(100,67,244,0.4)",
  purple: "#6443F4", pink: "#F94498", success: "#02A65C", warning: "#FF9327",
  error: "#FF6B6B", info: "#01BEFF", white: "#FFFFFF", secondary: "#D3CFD8",
  muted: "#A79FB2", placeholder: "#7B6A94", gradient: ["#6443F4", "#F94498"],
};

interface CardData {
  id: string;
  title: string;
  description: string;
  image: string;
}

const initialCards: CardData[] = [
  {
    id: '1',
    title: 'Explore Paris',
    description: 'Romantic city with iconic landmarks and exquisite cuisine.',
    image: 'https://images.unsplash.com/photo-1502602898664-a31875f7000b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '2',
    title: 'Adventure in Bali',
    description: 'Tropical paradise with lush rice paddies and vibrant culture.',
    image: 'https://images.unsplash.com/photo-1537996194471-bd805c7f1fbd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '3',
    title: 'Relax in Maldives',
    description: 'Stunning overwater bungalows and crystal-clear waters.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export default function QuickSwipeScreen() {
  const router = useRouter();
  const [cards, setCards] = useState<CardData[]>(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    // In a real app, this would involve animation and actual swipe logic
    console.log(`Swiped ${direction} on card ${cards[currentIndex].title}`);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // All cards swiped - navigate to schedule
      router.push('/(dna)/schedule' as any);
    }
  };

  const currentCard = cards[currentIndex];

  return (
    <ScreenWrapper title="Quick Swipe" scrollable={false} contentStyle={styles.screenWrapper}>
      <View style={styles.container}>
        {currentCard ? (
          <BlurView intensity={20} tint="dark" style={styles.cardContainer}>
            <Image source={{ uri: currentCard.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{currentCard.title}</Text>
              <Text style={styles.cardDescription}>{currentCard.description}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleSwipe('left')} style={styles.actionButton}>
                <LinearGradient colors={[DS.purple, DS.pink] as const} style={styles.gradientButton}>
                  <MaterialIcons name="close" size={32} color={DS.white} />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSwipe('right')} style={styles.actionButton}>
                <LinearGradient colors={[DS.purple, DS.pink] as const} style={styles.gradientButton}>
                  <MaterialIcons name="favorite" size={32} color={DS.white} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </BlurView>
        ) : (
          <Text style={styles.noCardsText}>No more cards to display!</Text>
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    backgroundColor: DS.bg,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: DS.bg,
  },
  cardContainer: {
    width: '90%',
    aspectRatio: 0.7,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    shadowColor: DS.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  cardImage: {
    width: '100%',
    height: '70%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardContent: {
    padding: 15,
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 24,
    color: DS.white,
    marginBottom: 5,
  },
  cardDescription: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  gradientButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCardsText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
  },
});
