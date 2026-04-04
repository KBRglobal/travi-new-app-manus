import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useDnaStore } from '../../stores/dnaStore';

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
    <View className="flex-1 bg-bg-primary px-6 pt-safe">
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity onPress={() => currentQ > 0 ? setCurrentQ(currentQ - 1) : router.back()}>
          <Text className="text-white text-xl">‹ Back</Text>
        </TouchableOpacity>
        <Text className="text-text-secondary text-body-sm">{currentQ + 1} / {questions.length}</Text>
      </View>

      <View className="h-1 bg-bg-surface rounded-full mb-8">
        <View className="h-full bg-primary rounded-full" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
      </View>

      <Animated.View key={question.id} entering={FadeInRight.duration(300)} exiting={FadeOutLeft.duration(200)}>
        <Text className="text-white text-heading-2 mb-8">{question.question}</Text>

        {question.options.map((option, i) => (
          <TouchableOpacity
            key={i}
            className="bg-bg-card border border-border rounded-card p-4 mb-3 active:border-primary active:bg-primary-light"
            onPress={() => handleAnswer(option)}
          >
            <Text className="text-white text-body">{option}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
}
