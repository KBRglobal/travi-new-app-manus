import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

// DS object exported from ScreenWrapper.tsx (included here for self-containment as per prompt)

const RateReviewScreen = () => {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleRating = (star: number) => {
    setRating(star);
  };

  const handleSubmit = () => {
    console.log('Rating:', rating, 'Review:', reviewText);
    // Implement actual submission logic here
  };

  return (
    <ScreenWrapper title="Rate Your Trip" scrollable={true}>
      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>How was your experience?</Text>

        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <Text style={styles.label}>Overall Rating</Text>
          <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => handleRating(star)}>
                <MaterialIcons
                  name={rating >= star ? 'star' : 'star-border'}
                  size={32}
                  color={DS.warning}
                />
              </TouchableOpacity>
            ))}
          </View>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <Text style={styles.label}>Leave a Review</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Share your thoughts about the trip..."
            placeholderTextColor={DS.placeholder}
            multiline
            numberOfLines={4}
            value={reviewText}
            onChangeText={setReviewText}
          />
        </BlurView>

        <TouchableOpacity onPress={handleSubmit} style={styles.ctaButton}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            <Text style={styles.ctaButtonText}>Submit Review</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    gap: 20,
  },
  subtitle: {
    fontFamily: 'Satoshi-Medium', // Assuming Satoshi-Medium is loaded
    fontSize: 18,
    color: DS.white,
    textAlign: 'center',
    marginBottom: 10,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
    gap: 15,
  },
  label: {
    fontFamily: 'Satoshi-Medium', // Assuming Satoshi-Medium is loaded
    fontSize: 16,
    color: DS.muted,
    marginBottom: 5,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  textInput: {
    fontFamily: 'Satoshi-Regular', // Assuming Satoshi-Regular is loaded
    fontSize: 16,
    color: DS.white,
    backgroundColor: DS.surfaceHigh,
    borderRadius: 8,
    padding: 15,
    textAlignVertical: 'top',
    minHeight: 120,
    borderColor: DS.borderStrong,
    borderWidth: 1,
  },
  ctaButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 20,
  },
  gradientBackground: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold', // Assuming Chillax-Bold is loaded
    fontSize: 18,
    color: DS.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default RateReviewScreen;
