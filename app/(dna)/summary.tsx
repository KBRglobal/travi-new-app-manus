import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const DS = {
  bg: '#0A0514',
  surface: 'rgba(36,16,62,0.55)',
  border: 'rgba(123,68,230,0.22)',
  purple: '#6443F4',
  pink: '#F94498',
  white: '#FFFFFF',
  muted: '#A79FB2',
  success: '#02A65C',
};

// Personality types based on answer patterns
const PERSONALITY_TYPES = [
  {
    type: 'The Explorer',
    emoji: '🗺️',
    tagline: 'You live for the unknown',
    description:
      'You crave adventure, spontaneity, and discovering hidden gems. You prefer off-the-beaten-path experiences over tourist traps, and you pack light because the world is your luggage.',
    traits: ['Adventurous', 'Spontaneous', 'Curious', 'Independent'],
    gradient: ['#6443F4', '#9B59B6'] as const,
    matchDestinations: ['Patagonia', 'Mongolia', 'Ethiopia', 'Nepal'],
  },
  {
    type: 'The Luxurist',
    emoji: '✨',
    tagline: 'Only the finest will do',
    description:
      'You believe travel should be indulgent and effortless. From Michelin-starred dinners to five-star suites, you invest in experiences that feel truly special and memorable.',
    traits: ['Refined', 'Detail-oriented', 'Comfort-seeker', 'Discerning'],
    gradient: ['#F94498', '#FF6B35'] as const,
    matchDestinations: ['Maldives', 'Monaco', 'Dubai', 'Santorini'],
  },
  {
    type: 'The Culture Seeker',
    emoji: '🏛️',
    tagline: 'History is your playground',
    description:
      'Museums, local markets, ancient ruins — you travel to understand the world. You connect deeply with local communities and return home with stories that last a lifetime.',
    traits: ['Intellectual', 'Empathetic', 'Thoughtful', 'Social'],
    gradient: ['#01BEFF', '#6443F4'] as const,
    matchDestinations: ['Rome', 'Kyoto', 'Cairo', 'Istanbul'],
  },
  {
    type: 'The Beach Lover',
    emoji: '🌊',
    tagline: 'Sun, sand, and total bliss',
    description:
      'You recharge by the ocean. Whether it\'s snorkeling in crystal waters or sipping cocktails at sunset, you know how to truly unwind and make every moment feel like paradise.',
    traits: ['Relaxed', 'Social', 'Fun-loving', 'Present'],
    gradient: ['#02A65C', '#01BEFF'] as const,
    matchDestinations: ['Bali', 'Maldives', 'Tulum', 'Phuket'],
  },
];

function computePersonality(answers: Record<number, string>): typeof PERSONALITY_TYPES[0] {
  // Simple scoring: count answer types
  const counts: Record<string, number> = { a: 0, b: 0, c: 0, d: 0 };
  Object.values(answers).forEach((ans) => {
    if (ans in counts) counts[ans]++;
  });

  const maxKey = Object.entries(counts).sort((x, y) => y[1] - x[1])[0][0];

  const map: Record<string, number> = { a: 0, b: 1, c: 2, d: 3 };
  return PERSONALITY_TYPES[map[maxKey] ?? 0];
}

export default function DNASummaryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ answers?: string }>();

  const rawAnswers = params.answers ? JSON.parse(params.answers) : {};
  const personality = computePersonality(rawAnswers);

  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const traitAnims = useRef(personality.traits.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Stagger trait badges
      Animated.stagger(
        120,
        traitAnims.map((anim) =>
          Animated.spring(anim, {
            toValue: 1,
            tension: 80,
            friction: 8,
            useNativeDriver: true,
          })
        )
      ).start();
    });
  }, []);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Background glows */}
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Animated.View style={{ opacity: fadeAnim, alignItems: 'center', marginBottom: 32 }}>
          <Text style={styles.topLabel}>Your Travel DNA is ready</Text>
          <Text style={styles.topTitle}>We know who you are ✨</Text>
        </Animated.View>

        {/* Personality card */}
        <Animated.View
          style={[
            styles.personalityCard,
            { transform: [{ scale: scaleAnim }], opacity: fadeAnim },
          ]}
        >
          <LinearGradient
            colors={personality.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <Text style={styles.cardEmoji}>{personality.emoji}</Text>
            <Text style={styles.cardType}>{personality.type}</Text>
            <Text style={styles.cardTagline}>"{personality.tagline}"</Text>
          </LinearGradient>
        </Animated.View>

        {/* Description */}
        <Animated.View style={[styles.descCard, { opacity: fadeAnim }]}>
          <Text style={styles.descText}>{personality.description}</Text>
        </Animated.View>

        {/* Traits */}
        <View style={styles.traitsSection}>
          <Text style={styles.sectionTitle}>Your Travel Traits</Text>
          <View style={styles.traitsRow}>
            {personality.traits.map((trait, i) => (
              <Animated.View
                key={trait}
                style={[
                  styles.traitBadge,
                  {
                    opacity: traitAnims[i],
                    transform: [{ scale: traitAnims[i] }],
                  },
                ]}
              >
                <LinearGradient
                  colors={[DS.purple + '33', DS.pink + '22']}
                  style={styles.traitGradient}
                >
                  <Text style={styles.traitText}>{trait}</Text>
                </LinearGradient>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* Dream destinations */}
        <View style={styles.destSection}>
          <Text style={styles.sectionTitle}>Your Dream Destinations</Text>
          <View style={styles.destRow}>
            {personality.matchDestinations.map((dest) => (
              <View key={dest} style={styles.destChip}>
                <MaterialIcons name="place" size={14} color={DS.pink} />
                <Text style={styles.destText}>{dest}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* DNA match bar */}
        <View style={styles.matchSection}>
          <Text style={styles.sectionTitle}>DNA Match Accuracy</Text>
          <View style={styles.matchCard}>
            <View style={styles.matchRow}>
              <Text style={styles.matchLabel}>Profile Completeness</Text>
              <Text style={styles.matchPct}>92%</Text>
            </View>
            <View style={styles.matchTrack}>
              <LinearGradient
                colors={[DS.purple, DS.pink]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.matchFill, { width: '92%' }]}
              />
            </View>
            <Text style={styles.matchNote}>
              TRAVI will refine your profile as you explore and book trips
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* CTA */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity
          onPress={() => router.replace('/(tabs)' as any)}
          activeOpacity={0.88}
          style={styles.ctaBtn}
        >
          <LinearGradient
            colors={[DS.purple, DS.pink]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaGradient}
          >
            <Text style={styles.ctaText}>Start Exploring 🚀</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: DS.bg,
  },
  glowTop: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: DS.purple,
    opacity: 0.14,
  },
  glowBottom: {
    position: 'absolute',
    bottom: 60,
    left: -80,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: DS.pink,
    opacity: 0.1,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  topLabel: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.muted,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  topTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 28,
    color: DS.white,
    textAlign: 'center',
  },
  personalityCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: DS.purple,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  cardGradient: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  cardEmoji: {
    fontSize: 56,
    marginBottom: 12,
  },
  cardType: {
    fontFamily: 'Chillax-Bold',
    fontSize: 32,
    color: DS.white,
    marginBottom: 8,
  },
  cardTagline: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    fontStyle: 'italic',
  },
  descCard: {
    backgroundColor: 'rgba(100,67,244,0.1)',
    borderWidth: 1,
    borderColor: DS.border,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  descText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 15,
    color: DS.white,
    lineHeight: 24,
    textAlign: 'center',
  },
  sectionTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 17,
    color: DS.white,
    marginBottom: 14,
  },
  traitsSection: {
    marginBottom: 24,
  },
  traitsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  traitBadge: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: DS.border,
  },
  traitGradient: {
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  traitText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
    color: DS.white,
  },
  destSection: {
    marginBottom: 24,
  },
  destRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  destChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(249,68,152,0.12)',
    borderWidth: 1,
    borderColor: DS.pink + '44',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  destText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 13,
    color: DS.white,
  },
  matchSection: {
    marginBottom: 24,
  },
  matchCard: {
    backgroundColor: 'rgba(36,16,62,0.7)',
    borderWidth: 1,
    borderColor: DS.border,
    borderRadius: 16,
    padding: 18,
  },
  matchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  matchLabel: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
    color: DS.muted,
  },
  matchPct: {
    fontFamily: 'Chillax-Bold',
    fontSize: 16,
    color: DS.pink,
  },
  matchTrack: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
  },
  matchFill: {
    height: 6,
    borderRadius: 3,
  },
  matchNote: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 12,
    color: DS.muted,
    textAlign: 'center',
    lineHeight: 18,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    backgroundColor: DS.bg,
  },
  ctaBtn: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  ctaGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  ctaText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
  },
});
