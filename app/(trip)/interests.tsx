import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const interestsData = [
  { id: '1', name: 'Adventure Sports', icon: 'hiking' },
  { id: '2', name: 'Cultural Exploration', icon: 'museum' },
  { id: '3', name: 'Relaxation & Wellness', icon: 'spa' },
  { id: '4', name: 'Food & Drink', icon: 'restaurant' },
  { id: '5', name: 'Nightlife', icon: 'local-bar' },
  { id: '6', name: 'Nature & Outdoors', icon: 'eco' },
  { id: '7', name: 'Shopping', icon: 'shopping-bag' },
  { id: '8', name: 'History', icon: 'history' },
];

const InterestsScreen = () => {
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = React.useState<string[]>([]);

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <ScreenWrapper title="Your Interests" scrollable={true}>
      <View style={styles.container}>
        <Text style={styles.headerText}>What are you passionate about?</Text>
        <Text style={styles.subHeaderText}>Select all that apply to personalize your travel experience.</Text>

        <View style={styles.interestsGrid}>
          {interestsData.map(interest => (
            <TouchableOpacity
              key={interest.id}
              style={styles.interestCardWrapper}
              onPress={() => toggleInterest(interest.id)}
            >
              <BlurView
                intensity={selectedInterests.includes(interest.id) ? 30 : 10}
                tint="dark"
                style={[
                  styles.interestCard,
                  selectedInterests.includes(interest.id) && styles.selectedInterestCard,
                ]}
              >
                <MaterialIcons
                  name={interest.icon as any}
                  size={32}
                  color={selectedInterests.includes(interest.id) ? DS.purple : DS.white}
                />
                <Text
                  style={[
                    styles.interestText,
                    selectedInterests.includes(interest.id) && styles.selectedInterestText,
                  ]}
                >
                  {interest.name}
                </Text>
              </BlurView>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.ctaButton} onPress={() => router.push("/(dna)/categories" as any)}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.ctaButtonText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 28,
    color: DS.white,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  subHeaderText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
    textAlign: 'center',
    marginBottom: 30,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  interestCardWrapper: {
    width: '48%',
    marginBottom: 15,
  },
  interestCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  selectedInterestCard: {
    borderColor: DS.borderStrong,
    backgroundColor: DS.surfaceHigh,
  },
  interestText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
    marginTop: 10,
    textAlign: 'center',
  },
  selectedInterestText: {
    color: DS.purple,
  },
  ctaButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 20,
  },
  gradientButton: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
  },
});

export default InterestsScreen;
