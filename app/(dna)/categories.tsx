import { useRouter } from 'expo-router';
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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
  surfaceHigh: 'rgba(50,20,80,0.7)',
  border: 'rgba(123,68,230,0.22)',
  borderStrong: 'rgba(100,67,244,0.4)',
  purple: '#6443F4',
  pink: '#F94498',
  white: '#FFFFFF',
  muted: '#A79FB2',
};

const DNA_QUESTIONS = [
  {
    id: 1,
    emoji: '✈️',
    question: 'What kind of trip excites you most?',
    answers: [
      { id: 'a', text: 'Adventure & Extreme Sports', icon: 'terrain' },
      { id: 'b', text: 'Relaxing Beach Getaway', icon: 'beach-access' },
      { id: 'c', text: 'Cultural City Exploration', icon: 'museum' },
      { id: 'd', text: 'Nature & Wildlife Safari', icon: 'forest' },
    ],
  },
  {
    id: 2,
    emoji: '🏨',
    question: 'Where do you prefer to stay?',
    answers: [
      { id: 'a', text: 'Luxury 5-Star Hotel', icon: 'star' },
      { id: 'b', text: 'Cozy Boutique Hotel', icon: 'cottage' },
      { id: 'c', text: 'Local Airbnb / Apartment', icon: 'home' },
      { id: 'd', text: 'Budget Hostel & Meet People', icon: 'people' },
    ],
  },
  {
    id: 3,
    emoji: '🍽️',
    question: 'How do you approach food while traveling?',
    answers: [
      { id: 'a', text: 'Fine Dining & Michelin Stars', icon: 'restaurant' },
      { id: 'b', text: 'Street Food & Local Markets', icon: 'storefront' },
      { id: 'c', text: 'Familiar Comfort Food', icon: 'fastfood' },
      { id: 'd', text: 'Food Tours & Cooking Classes', icon: 'school' },
    ],
  },
  {
    id: 4,
    emoji: '👥',
    question: 'Who do you usually travel with?',
    answers: [
      { id: 'a', text: 'Solo — Just Me', icon: 'person' },
      { id: 'b', text: 'Partner / Romantic Trip', icon: 'favorite' },
      { id: 'c', text: 'Family with Kids', icon: 'family-restroom' },
      { id: 'd', text: 'Group of Friends', icon: 'group' },
    ],
  },
  {
    id: 5,
    emoji: '📅',
    question: 'How do you plan your trips?',
    answers: [
      { id: 'a', text: 'Every Hour Planned in Advance', icon: 'event-note' },
      { id: 'b', text: 'Key Spots, Rest is Flexible', icon: 'map' },
      { id: 'c', text: 'Mostly Spontaneous', icon: 'bolt' },
      { id: 'd', text: 'Go with the Flow Completely', icon: 'air' },
    ],
  },
  {
    id: 6,
    emoji: '💰',
    question: 'What is your travel budget style?',
    answers: [
      { id: 'a', text: 'Luxury — Money is No Object', icon: 'diamond' },
      { id: 'b', text: 'Comfort — Worth the Splurge', icon: 'credit-card' },
      { id: 'c', text: 'Smart — Best Value for Money', icon: 'savings' },
      { id: 'd', text: 'Budget — Keep it Minimal', icon: 'attach-money' },
    ],
  },
  {
    id: 7,
    emoji: '🌍',
    question: 'What destination type appeals to you?',
    answers: [
      { id: 'a', text: 'Tropical Islands & Beaches', icon: 'wb-sunny' },
      { id: 'b', text: 'Mountains & Ski Resorts', icon: 'ac-unit' },
      { id: 'c', text: 'Historic Cities & Ruins', icon: 'account-balance' },
      { id: 'd', text: 'Exotic & Off-the-Beaten-Path', icon: 'explore' },
    ],
  },
  {
    id: 8,
    emoji: '📸',
    question: 'What is your travel photography style?',
    answers: [
      { id: 'a', text: 'Every Moment Documented', icon: 'camera-alt' },
      { id: 'b', text: 'Just the Highlights', icon: 'photo-camera' },
      { id: 'c', text: 'Live in the Moment, Few Photos', icon: 'visibility' },
      { id: 'd', text: 'I Prefer Video & Stories', icon: 'videocam' },
    ],
  },
  {
    id: 9,
    emoji: '🎒',
    question: 'How do you pack for a trip?',
    answers: [
      { id: 'a', text: 'Overpacker — Bring Everything', icon: 'luggage' },
      { id: 'b', text: 'Organized with a Packing List', icon: 'checklist' },
      { id: 'c', text: 'Light Carry-On Only', icon: 'backpack' },
      { id: 'd', text: 'Buy What I Need There', icon: 'shopping-bag' },
    ],
  },
  {
    id: 10,
    emoji: '🌙',
    question: 'What is your ideal evening while traveling?',
    answers: [
      { id: 'a', text: 'Rooftop Bar & Nightlife', icon: 'nightlife' },
      { id: 'b', text: 'Local Restaurant & Wine', icon: 'local-bar' },
      { id: 'c', text: 'Cultural Show or Theater', icon: 'theater-comedy' },
      { id: 'd', text: 'Quiet Night In / Early Sleep', icon: 'bedtime' },
    ],
  },
];

export default function DNAQuestionnaire() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const question = DNA_QUESTIONS[currentQ];
  const progress = (currentQ / DNA_QUESTIONS.length) * 100;
  const isLast = currentQ === DNA_QUESTIONS.length - 1;

  const handleSelect = (answerId: string) => {
    setSelected(answerId);
  };

  const handleNext = () => {
    if (!selected) return;
    const newAnswers = { ...answers, [question.id]: selected };
    setAnswers(newAnswers);

    if (isLast) {
      // Navigate to summary with answers
      router.push({
        pathname: '/(dna)/summary' as any,
        params: { answers: JSON.stringify(newAnswers) },
      });
      return;
    }

    // Animate transition
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleBack = () => {
    if (currentQ === 0) {
      router.back();
      return;
    }
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setCurrentQ((q) => q - 1);
      setSelected(answers[DNA_QUESTIONS[currentQ - 1].id] ?? null);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Background glow */}
      <View style={styles.glowPurple} />
      <View style={styles.glowPink} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={22} color={DS.white} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Travel DNA</Text>
          <Text style={styles.headerSub}>
            {currentQ + 1} of {DNA_QUESTIONS.length}
          </Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <LinearGradient
          colors={[DS.purple, DS.pink]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.progressFill, { width: `${progress + 10}%` as any }]}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Question card */}
          <View style={styles.questionCard}>
            <Text style={styles.questionEmoji}>{question.emoji}</Text>
            <Text style={styles.questionText}>{question.question}</Text>
          </View>

          {/* Answer options */}
          <View style={styles.answersContainer}>
            {question.answers.map((answer) => {
              const isActive = selected === answer.id;
              return (
                <TouchableOpacity
                  key={answer.id}
                  onPress={() => handleSelect(answer.id)}
                  activeOpacity={0.85}
                  style={[styles.answerBtn, isActive && styles.answerBtnActive]}
                >
                  {isActive && (
                    <LinearGradient
                      colors={[DS.purple, DS.pink]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={StyleSheet.absoluteFillObject}
                    />
                  )}
                  <View style={[styles.answerIcon, isActive && styles.answerIconActive]}>
                    <MaterialIcons
                      name={answer.icon as any}
                      size={20}
                      color={isActive ? DS.white : DS.purple}
                    />
                  </View>
                  <Text style={[styles.answerText, isActive && styles.answerTextActive]}>
                    {answer.text}
                  </Text>
                  {isActive && (
                    <MaterialIcons name="check-circle" size={20} color={DS.white} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Next button */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={selected ? 0.85 : 1}
          style={[styles.nextBtn, !selected && styles.nextBtnDisabled]}
        >
          <LinearGradient
            colors={selected ? [DS.purple, DS.pink] : ['#2a1a4a', '#2a1a4a']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nextGradient}
          >
            <Text style={[styles.nextText, !selected && styles.nextTextDisabled]}>
              {isLast ? 'See My Travel DNA ✨' : 'Next Question'}
            </Text>
            {!isLast && (
              <MaterialIcons
                name="arrow-forward"
                size={20}
                color={selected ? DS.white : DS.muted}
              />
            )}
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
  glowPurple: {
    position: 'absolute',
    top: -60,
    left: -60,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: DS.purple,
    opacity: 0.12,
  },
  glowPink: {
    position: 'absolute',
    bottom: 100,
    right: -80,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: DS.pink,
    opacity: 0.1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    letterSpacing: 0.5,
  },
  headerSub: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 12,
    color: DS.muted,
    marginTop: 2,
  },
  progressTrack: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginHorizontal: 20,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 20,
  },
  questionCard: {
    backgroundColor: 'rgba(100,67,244,0.12)',
    borderWidth: 1,
    borderColor: DS.border,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 28,
  },
  questionEmoji: {
    fontSize: 44,
    marginBottom: 14,
  },
  questionText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 22,
    color: DS.white,
    textAlign: 'center',
    lineHeight: 30,
  },
  answersContainer: {
    gap: 12,
  },
  answerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(36,16,62,0.7)',
    borderWidth: 1,
    borderColor: DS.border,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    gap: 14,
    overflow: 'hidden',
  },
  answerBtnActive: {
    borderColor: DS.pink,
  },
  answerIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(100,67,244,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerIconActive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  answerText: {
    flex: 1,
    fontFamily: 'Satoshi-Medium',
    fontSize: 15,
    color: DS.white,
    lineHeight: 20,
  },
  answerTextActive: {
    color: DS.white,
    fontFamily: 'Satoshi-Bold',
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    backgroundColor: DS.bg,
  },
  nextBtn: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  nextBtnDisabled: {
    opacity: 0.5,
  },
  nextGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    gap: 8,
  },
  nextText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 17,
    color: DS.white,
  },
  nextTextDisabled: {
    color: DS.muted,
  },
});
