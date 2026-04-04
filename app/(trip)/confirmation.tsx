import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';


const ConfirmationScreen = () => {
  const router = useRouter();
  return (
    <ScreenWrapper title="Trip Confirmation" scrollable={true}>
      <View style={styles.contentContainer}>
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <MaterialIcons name="check-circle-outline" size={60} color={DS.success} style={styles.icon} />
          <Text style={styles.title}>Your Trip is Confirmed!</Text>
          <Text style={styles.message}>Thank you for booking with TRAVI. We've sent a detailed itinerary to your email address.</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.label}>Destination:</Text>
            <Text style={styles.value}>Paris, France</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Dates:</Text>
            <Text style={styles.value}>Oct 26 - Nov 02, 2024</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Total Price:</Text>
            <Text style={styles.value}>$1,250.00</Text>
          </View>
        </BlurView>

        <TouchableOpacity style={styles.ctaButton} onPress={() => router.replace('/(tabs)/trips' as any)}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.ctaButtonText}>View Itinerary</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    marginBottom: 30,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Chillax-Bold', // Placeholder, assuming fonts are loaded globally or via a custom hook
    fontSize: 28,
    color: DS.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontFamily: 'Satoshi-Regular', // Placeholder
    fontSize: 16,
    color: DS.muted,
    textAlign: 'center',
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  label: {
    fontFamily: 'Satoshi-Medium', // Placeholder
    fontSize: 16,
    color: DS.secondary,
  },
  value: {
    fontFamily: 'Satoshi-Regular', // Placeholder
    fontSize: 16,
    color: DS.white,
  },
  ctaButton: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
  },
  gradientButton: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium', // Placeholder
    fontSize: 18,
    color: DS.white,
  },
  secondaryButton: {
    width: '100%',
    maxWidth: 400,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: DS.borderStrong,
  },
  secondaryButtonText: {
    fontFamily: 'Satoshi-Medium', // Placeholder
    fontSize: 16,
    color: DS.purple,
  },
});

export default ConfirmationScreen;
