import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const CompletionScreen = () => {
  const router = useRouter();
  return (
    <ScreenWrapper title="Trip Completion" scrollable={true}>
      <View style={styles.container}>
        {/* Glass Card Example */}
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <MaterialIcons name="check-circle" size={48} color={DS.success} style={styles.icon} />
          <Text style={styles.header}>Trip Completed!</Text>
          <Text style={styles.label}>Thank you for choosing TRAVI.</Text>
          <Text style={styles.body}>We hope you had a fantastic journey. Your feedback is important to us.</Text>
        </BlurView>

        {/* CTA Example */}
        <LinearGradient
          colors={[DS.purple, DS.pink] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.ctaButton}
        >
          <Text style={styles.ctaText}>Rate Your Trip</Text>
          <MaterialIcons name="star" size={20} color={DS.white} style={styles.ctaIcon} />
        </LinearGradient>

        {/* Another Glass Card for details */}
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <Text style={styles.header}>Trip Summary</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Destination:</Text>
            <Text style={styles.body}>Paris, France</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Duration:</Text>
            <Text style={styles.body}>7 Days</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Total Cost:</Text>
            <Text style={styles.body}>$1,500</Text>
          </View>
        </BlurView>

        {/* Another CTA */}
        <LinearGradient
          colors={[DS.purple, DS.pink] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.ctaButton}
        >
          <Text style={styles.ctaText}>View Past Trips</Text>
          <MaterialIcons name="history" size={20} color={DS.white} style={styles.ctaIcon} />
        </LinearGradient>

      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: DS.bg, // Ensure background is set by ScreenWrapper, but good to have for standalone components
  },
  glassCard: {
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
    marginBottom: 10,
  },
  header: {
    fontFamily: 'Chillax-Bold',
    fontSize: 24,
    color: DS.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  label: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.muted,
    marginBottom: 5,
    textAlign: 'center',
  },
  body: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.secondary,
    textAlign: 'center',
    marginBottom: 10,
  },
  ctaButton: {
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginVertical: 10,
    width: '100%',
    maxWidth: 400,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginRight: 10,
  },
  ctaIcon: {
    marginLeft: 5,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
    paddingHorizontal: 10,
  },
});

export default CompletionScreen;
