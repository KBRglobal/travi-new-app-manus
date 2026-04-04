import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useDnaStore } from '../../stores/dnaStore';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const questions = [
  { id: 'q1', question: 'Your ideal morning starts with...', options: ['Sunrise hike', 'Sleeping in', 'Local breakfast spot', 'Yoga on the beach'], dimension: 'adventure' },
  { id: 'q2', question: 'When you travel, food is...', options: ['The main event', 'Nice but not essential', 'Street food only', 'Fine dining experience'], dimension: 'food' },
  { id: 'q3', question: 'Your perfect evening...', options: ['Rooftop bar with views', 'Quiet dinner & book', 'Night market exploration', 'Live music venue'], dimension: 'social' },
  { id: 'q4', question: 'Budget philosophy?', options: ['Save on flights, splurge on experiences', 'All-inclusive luxury', 'Backpacker life', 'Smart spending, best value'], dimension: 'budget' },
  { id: 'q5', question: 'Must-have in a destination?', options: ['Beautiful nature', 'Rich history', 'Great nightlife', 'Amazing food scene'], dimension: 'nature' },
];

export default function DNAQuestionsScreen() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { setQuizCompleted } = useDnaStore();

  const question = questions[currentQ];

  const handleAnswer = (option: string) => {
    const newAnswers = { ...answers, [question.id]: option };
    setAnswers(newAnswers);

    if (currentQ >= questions.length - 1) {
      setQuizCompleted(true);
      router.replace('/(auth)/dna-result');
    } else {
      setCurrentQ((prev) => prev + 1);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }} px-6 pt-safe">
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity onPress={() => currentQ > 0 ? setCurrentQ(currentQ - 1) : router.back()}>
          <Text className=" text-xl" style={{ color: colors.text.primary }}>‹ Back</Text>
        </TouchableOpacity>
        <Text className="text-[rgba(255,255,255,0.6)] text-[13px]">{currentQ + 1} / {questions.length}</Text>
      </View>

      <View className="h-1 bg-bg-surface rounded-full mb-8">
        <View className="h-full bg-[#6443F4] rounded-full" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
      </View>

      <Animated.View key={question.id} entering={FadeInRight.duration(300)} exiting={FadeOutLeft.duration(200)}>
        <Text className=" text-[22px] mb-8" style={{ color: colors.text.primary }}>{question.question}</Text>

        {question.options.map((option, i) => (
          <TouchableOpacity
            key={i}
            className="bg-[#120824] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-4 mb-3 active:border-[#6443F4] active:bg-[#6443F4]-light"
            onPress={() => handleAnswer(option)}
          >
            <Text className=" text-[15px]" style={{ color: colors.text.primary }}>{option}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
}
