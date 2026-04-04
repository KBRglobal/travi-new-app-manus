import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const FirstSwipeTutorial = () => {
  const router = useRouter();
  return (
    <ScreenWrapper title="First Swipe Tutorial" scrollable={true}>
      <View style={styles.container}>
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <MaterialIcons name="touch-app" size={60} color={DS.purple} style={styles.icon} />
          <Text style={styles.title}>Discover Your Next Adventure</Text>
          <Text style={styles.description}>
            Swipe left to pass, swipe right to like. It's that simple to find your perfect travel match.
          </Text>
          <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}>
            <LinearGradient
              colors={[DS.purple, DS.pink] as const}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Start Swiping</Text>
              <MaterialIcons name="arrow-forward" size={20} color={DS.white} style={styles.buttonIcon} />
            </LinearGradient>
          </TouchableOpacity>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <MaterialIcons name="flight-takeoff" size={60} color={DS.pink} style={styles.icon} />
          <Text style={styles.title}>Personalized Recommendations</Text>
          <Text style={styles.description}>
            Our smart algorithm learns your preferences to show you destinations you'll truly love.
          </Text>
          <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}>
            <LinearGradient
              colors={[DS.purple, DS.pink] as const}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Learn More</Text>
              <MaterialIcons name="info-outline" size={20} color={DS.white} style={styles.buttonIcon} />
            </LinearGradient>
          </TouchableOpacity>
        </BlurView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: DS.bg, // Ensure background is dark
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
    marginVertical: 10,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 15,
  },
  title: {
    fontFamily: 'Chillax-Bold',
    fontSize: 24,
    color: DS.white,
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
  buttonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
    marginRight: 10,
  },
  buttonIcon: {
    marginLeft: 5,
  },
});

export default FirstSwipeTutorial;
