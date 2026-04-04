import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

// IMPORTANT: The DS object is already exported from ScreenWrapper.tsx

const SubscriptionScreen = () => {
  const router = useRouter();
  return (
    <ScreenWrapper title="My Subscription" scrollable={true}>
      <View style={styles.container}>
        {/* Subscription Card */}
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <MaterialIcons name="workspace-premium" size={48} color={DS.purple} style={styles.icon} />
          <Text style={styles.cardTitle}>Premium Plan</Text>
          <Text style={styles.cardPrice}>$9.99 / month</Text>
          <Text style={styles.cardDescription}>
            Enjoy unlimited access to all TRAVI features, exclusive deals, and priority support.
          </Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={18} color={DS.success} />
              <Text style={styles.featureText}>Ad-free experience</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={18} color={DS.success} />
              <Text style={styles.featureText}>Offline access to guides</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={18} color={DS.success} />
              <Text style={styles.featureText}>24/7 Customer Support</Text>
            </View>
          </View>
        </BlurView>

        {/* Call to Action Button */}
        <TouchableOpacity style={styles.ctaButton} onPress={() => router.push("/(tabs)/membership" as any)}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            <Text style={styles.ctaButtonText}>Manage Subscription</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Additional Info */}
        <Text style={styles.infoText}>
          Your subscription will automatically renew unless cancelled at least 24 hours before the end of the current period.
        </Text>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: DS.bg, // Ensure background is set for the container within ScreenWrapper
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 24,
    color: DS.white,
    marginBottom: 5,
  },
  cardPrice: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
    marginBottom: 15,
  },
  cardDescription: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.muted,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  featureList: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.white,
    marginLeft: 10,
  },
  ctaButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  gradientBackground: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 16,
    color: DS.white,
  },
  infoText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 12,
    color: DS.muted,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default SubscriptionScreen;
