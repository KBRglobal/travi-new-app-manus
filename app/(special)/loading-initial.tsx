import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const LoadingInitialScreen = () => {
  const router = useRouter();
  useEffect(() => {
    const t = setTimeout(() => router.replace('/(tabs)' as any), 2000);
    return () => clearTimeout(t);
  }, []);
  return (
    <ScreenWrapper title="Loading" scrollable={false}>
      <View style={styles.container}>
        <BlurView intensity={20} tint="dark" style={styles.blurCard}>
          <ActivityIndicator size="large" color={DS.purple} />
          <Text style={styles.loadingText}>Preparing your journey...</Text>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <MaterialIcons name="flight-takeoff" size={24} color={DS.white} />
            <Text style={styles.buttonText}>TRAVI is loading</Text>
          </LinearGradient>
        </BlurView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DS.bg,
  },
  blurCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
    marginTop: 20,
    marginBottom: 30,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    gap: 10,
  },
  buttonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 16,
    color: DS.white,
  },
});

export default LoadingInitialScreen;
