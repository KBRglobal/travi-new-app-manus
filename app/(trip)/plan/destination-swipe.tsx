import { useState, useCallback } from 'react';
import { View, Text, Pressable, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';
import { useTripStore } from '@/stores/tripStore';
import * as Haptics from 'expo-haptics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 64;

const DESTINATIONS = [
  { id: 'dubai', name: 'Dubai', country: 'UAE', match: 94, price: 340, imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', match: 91, price: 520, imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800' },
  { id: 'barcelona', name: 'Barcelona', country: 'Spain', match: 87, price: 280, imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800' },
  { id: 'bali', name: 'Bali', country: 'Indonesia', match: 85, price: 410, imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800' },
  { id: 'iceland', name: 'Reykjavik', country: 'Iceland', match: 82, price: 480, imageUrl: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800' },
  { id: 'marrakech', name: 'Marrakech', country: 'Morocco', match: 80, price: 260, imageUrl: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800' },
  { id: 'santorini', name: 'Santorini', country: 'Greece', match: 78, price: 350, imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800' },
  { id: 'kyoto', name: 'Kyoto', country: 'Japan', match: 76, price: 490, imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800' },
  { id: 'lisbon', name: 'Lisbon', country: 'Portugal', match: 74, price: 220, imageUrl: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800' },
  { id: 'capetown', name: 'Cape Town', country: 'South Africa', match: 72, price: 380, imageUrl: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800' },
];

export default function DestinationSwipeScreen() {
  const router = useRouter();
  const setDestination = useTripStore((s) => s.setDestination);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<typeof DESTINATIONS>([]);
  const [showResults, setShowResults] = useState(false);

  const current = DESTINATIONS[currentIndex];
  const isFinished = currentIndex >= DESTINATIONS.length;

  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    if (isFinished) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (direction === 'right') {
      setLiked((prev) => [...prev, current]);
    }

    if (currentIndex + 1 >= DESTINATIONS.length) {
      setShowResults(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, current, isFinished]);

  const handleSelect = (dest: typeof DESTINATIONS[0]) => {
    setDestination({
      id: dest.id,
      name: dest.name,
      country: dest.country,
      imageUrl: dest.imageUrl,
      matchScore: dest.match,
    });
    router.push('/(trip)/plan/dates');
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setLiked([]);
    setShowResults(false);
  };

  const topResults = [...liked].sort((a, b) => b.match - a.match).slice(0, 3);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 56, paddingBottom: 16 }}>
        <Pressable onPress={() => router.back()} style={{ padding: 8, marginRight: 12 }}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </Pressable>
        <Text style={{ flex: 1, fontFamily: fonts.heading, fontSize: fontSizes.h2, color: colors.text.primary }}>Swipe Destinations</Text>
        {!showResults && (
          <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodySm, color: colors.text.muted }}>{currentIndex + 1} / {DESTINATIONS.length}</Text>
        )}
      </View>

      {/* Swipe Cards */}
      {!showResults && !isFinished && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 }}>
          {/* Card Stack (show current + next) */}
          {currentIndex + 1 < DESTINATIONS.length && (
            <View style={{ position: 'absolute', width: CARD_WIDTH - 16, height: 420, borderRadius: radius.card, backgroundColor: colors.bg.card, transform: [{ scale: 0.95 }], opacity: 0.5 }} />
          )}

          {/* Current Card */}
          <View style={{ width: CARD_WIDTH, height: 440, borderRadius: radius.card, overflow: 'hidden', ...shadows.card }}>
            <Image source={{ uri: current.imageUrl }} style={{ width: '100%', height: '100%', position: 'absolute' }} resizeMode="cover" />
            {/* Gradient overlay */}
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', backgroundColor: 'rgba(0,0,0,0.6)' }} />

            {/* Match badge */}
            <View style={{ position: 'absolute', top: 16, left: 16, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: 'rgba(249,68,152,0.9)', borderRadius: radius.pill }}>
              <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.caption, color: '#FFF' }}>✦ {current.match}% Match</Text>
            </View>

            {/* Bottom info */}
            <View style={{ position: 'absolute', bottom: 24, left: 20, right: 20 }}>
              <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h1, color: '#FFF' }}>{current.name}</Text>
              <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.body, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>{current.country}</Text>
              <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.bodySm, color: 'rgba(255,255,255,0.6)', marginTop: 8 }}>from €{current.price}</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 32, marginTop: 32 }}>
            <Pressable
              onPress={() => handleSwipe('left')}
              style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(248,113,113,0.15)', borderWidth: 2, borderColor: colors.error, justifyContent: 'center', alignItems: 'center' }}
            >
              <Ionicons name="close" size={32} color={colors.error} />
            </Pressable>
            <Pressable
              onPress={() => handleSwipe('right')}
              style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(74,222,128,0.15)', borderWidth: 2, borderColor: colors.success, justifyContent: 'center', alignItems: 'center' }}
            >
              <Ionicons name="heart" size={32} color={colors.success} />
            </Pressable>
          </View>

          {/* Swipe hints */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: CARD_WIDTH, marginTop: 16 }}>
            <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.caption, color: colors.error }}>← SKIP</Text>
            <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.caption, color: colors.success }}>LOVE IT →</Text>
          </View>
        </View>
      )}

      {/* Results */}
      {showResults && (
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 16 }}>
          <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h2, color: colors.text.primary, marginBottom: 4 }}>Your Top Destinations</Text>
          <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.bodySm, color: colors.text.secondary, marginBottom: 24 }}>Based on your swipes</Text>

          {topResults.length === 0 ? (
            <View style={{ alignItems: 'center', paddingVertical: 40 }}>
              <MaterialIcons name="sentiment-dissatisfied" size={64} color={colors.text.muted} />
              <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.text.secondary, marginTop: 16 }}>No likes yet</Text>
              <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.bodySm, color: colors.text.muted, marginTop: 4 }}>Try swiping again!</Text>
            </View>
          ) : (
            topResults.map((dest, index) => (
              <Pressable
                key={dest.id}
                onPress={() => handleSelect(dest)}
                style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bg.card, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border.default, padding: 16, marginBottom: 12, gap: 16 }}
              >
                <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h1, color: colors.text.muted, width: 32 }}>{index + 1}.</Text>
                <Image source={{ uri: dest.imageUrl }} style={{ width: 56, height: 56, borderRadius: 12 }} resizeMode="cover" />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.text.primary }}>{dest.name}, {dest.country}</Text>
                  <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.caption, color: colors.pink, marginTop: 2 }}>✦ {dest.match}% Match</Text>
                </View>
                <View style={{ paddingHorizontal: 14, paddingVertical: 8, backgroundColor: colors.primary, borderRadius: radius.button }}>
                  <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.caption, color: '#FFF' }}>Select →</Text>
                </View>
              </Pressable>
            ))
          )}

          <Pressable
            onPress={handleReset}
            style={{ height: 48, borderRadius: radius.button, justifyContent: 'center', alignItems: 'center', marginTop: 16, borderWidth: 1, borderColor: colors.border.strong }}
          >
            <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.text.primary }}>Swipe Again</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
