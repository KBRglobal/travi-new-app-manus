import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

// DS object (assuming it's available globally or passed via context/props in a real app)
// For this exercise, we'll define it here as per the prompt's instruction

const ConnectFlow = () => {
  const router = useRouter();
  return (
    <ScreenWrapper title="Connect with Friends" scrollable={true}>
      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Find your friends on TRAVI to share your travel experiences!</Text>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <MaterialIcons name="photo-camera" size={24} color={DS.white} />
            <Text style={styles.buttonText}>Connect Instagram</Text>
          </TouchableOpacity>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <MaterialIcons name="facebook" size={24} color={DS.white} />
            <Text style={styles.buttonText}>Connect Facebook</Text>
          </TouchableOpacity>
        </BlurView>

        <TouchableOpacity onPress={() => {}} style={styles.skipButton}>
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  subtitle: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
    marginLeft: 10,
  },
  skipButton: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  skipButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.secondary,
  },
});

export default ConnectFlow;
