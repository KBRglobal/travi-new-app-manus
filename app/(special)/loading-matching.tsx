import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const LoadingMatchingScreen = () => {
  const router = useRouter();
  useEffect(() => {
    const t = setTimeout(() => router.replace('/(social)/discover' as any), 3000);
    return () => clearTimeout(t);
  }, []);
  return (
    <ScreenWrapper title="Finding Your Match" scrollable={false}>
      <View style={styles.container}>
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <ActivityIndicator size="large" color={DS.purple} />
          <Text style={styles.headerText}>Searching for adventures...</Text>
          <Text style={styles.bodyText}>Please wait while we find the perfect travel companions for you.</Text>
        </BlurView>

        {/* Example of a CTA with LinearGradient, typically not on a loading screen but for demonstration */}
        <TouchableOpacity style={styles.ctaButton} onPress={() => router.back()}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            <MaterialIcons name="cancel" size={24} color={DS.white} />
            <Text style={styles.ctaButtonText}>Cancel Search</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 30,
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontFamily: 'Chillax-Bold', // Assuming Chillax-Bold is loaded and available
    fontSize: 24,
    color: DS.white,
    marginTop: 20,
    textAlign: 'center',
  },
  bodyText: {
    fontFamily: 'Satoshi-Regular', // Assuming Satoshi-Regular is loaded and available
    fontSize: 16,
    color: DS.muted,
    marginTop: 10,
    textAlign: 'center',
  },
  ctaButton: {
    width: '80%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradientBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium', // Assuming Satoshi-Medium is loaded and available
    fontSize: 18,
    color: DS.white,
    marginLeft: 10,
  },
});

export default LoadingMatchingScreen;
