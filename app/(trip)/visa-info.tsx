import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper'; // Assuming this path and export structure

const VisaInfoScreen = () => {
  const router = useRouter();
  // Placeholder data for visa information
  const visaRequirements = [
    { country: 'United States', type: 'Tourist Visa', duration: 'Up to 6 months', required: true },
    { country: 'Canada', type: 'eTA', duration: 'Up to 6 months', required: true },
    { country: 'United Kingdom', type: 'Standard Visitor Visa', duration: 'Up to 6 months', required: true },
    { country: 'Schengen Area', type: 'Schengen Visa', duration: 'Up to 90 days', required: true },
    { country: 'Japan', type: 'Tourist Visa', duration: 'Up to 90 days', required: false },
  ];

  return (
    <ScreenWrapper title="Visa Information" scrollable={true}>
      <View style={styles.container}>
        <Text style={styles.header}>Your Visa Status</Text>

        {visaRequirements.map((visa, index) => (
          <BlurView key={index} intensity={20} style={styles.card}>
            <View style={styles.cardContent}>
              <MaterialIcons
                name={visa.required ? 'check-circle' : 'info'}
                size={24}
                color={visa.required ? DS.success : DS.warning}
                style={styles.icon}
              />
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{visa.country}</Text>
                <Text style={styles.cardLabel}>{visa.type}</Text>
                <Text style={styles.cardBody}>Duration: {visa.duration}</Text>
              </View>
              <TouchableOpacity style={styles.detailsButton} onPress={() => router.push('/(trip)/ai-chat' as any)}>
                <LinearGradient
                  colors={[DS.purple, DS.pink] as const}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientButton}
                >
                  <Text style={styles.buttonText}>Details</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </BlurView>
        ))}

        <TouchableOpacity style={styles.ctaButton} onPress={() => router.push("/(trip)/pre-trip-dashboard" as any)}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.ctaButtonText}>Apply for a New Visa</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: DS.bg,
  },
  header: {
    fontFamily: 'Chillax-Bold',
    fontSize: 28,
    color: DS.white,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginBottom: 15,
    padding: 15,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginBottom: 5,
  },
  cardLabel: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
    color: DS.secondary,
    marginBottom: 3,
  },
  cardBody: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 13,
    color: DS.muted,
  },
  detailsButton: {
    marginLeft: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Satoshi-Medium',
    color: DS.white,
    fontSize: 14,
  },
  ctaButton: {
    marginTop: 30,
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    color: DS.white,
    fontSize: 18,
    paddingVertical: 12,
  },
});

export default VisaInfoScreen;
