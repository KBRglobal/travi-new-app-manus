import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const CulturalGuideScreen = () => {
  const router = useRouter();
  return (
    <ScreenWrapper title="Cultural Guide" scrollable={true}>
      <View style={styles.contentContainer}>
        {/* Glass Card Example */}
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <Text style={styles.cardTitle}>Explore Local Traditions</Text>
          <Text style={styles.cardBody}>Immerse yourself in the rich cultural tapestry of your destination. Discover ancient rituals, vibrant festivals, and unique customs that define the local way of life.</Text>
          <TouchableOpacity style={styles.ctaButton} onPress={() => router.push("/(tabs)/explore" as any)}>
            <LinearGradient
              colors={[DS.purple, DS.pink] as const}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              <Text style={styles.ctaButtonText}>View Traditions</Text>
              <MaterialIcons name="arrow-forward" size={20} color={DS.white} style={styles.ctaIcon} />
            </LinearGradient>
          </TouchableOpacity>
        </BlurView>

        {/* Another Glass Card Example */}
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <Text style={styles.cardTitle}>Culinary Journey</Text>
          <Text style={styles.cardBody}>Embark on a gastronomic adventure. From street food delights to fine dining experiences, savor the authentic flavors and culinary heritage of the region.</Text>
          <TouchableOpacity style={styles.ctaButton} onPress={() => router.push('/(trip)/ai-chat' as any)}>
            <LinearGradient
              colors={[DS.purple, DS.pink] as const}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              <Text style={styles.ctaButtonText}>Discover Cuisine</Text>
              <MaterialIcons name="restaurant" size={20} color={DS.white} style={styles.ctaIcon} />
            </LinearGradient>
          </TouchableOpacity>
        </BlurView>

        {/* Placeholder for more content */}
        <View style={styles.placeholderContainer}>
          <MaterialIcons name="info-outline" size={40} color={DS.muted} />
          <Text style={styles.placeholderText}>More cultural insights coming soon!</Text>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    gap: 20,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 22,
    color: DS.white,
    marginBottom: 10,
  },
  cardBody: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
    marginBottom: 20,
    lineHeight: 24,
  },
  ctaButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 10,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
    marginRight: 8,
  },
  ctaIcon: {
    marginLeft: 5,
  },
  placeholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: DS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
  },
  placeholderText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
    marginTop: 10,
  },
});

export default CulturalGuideScreen;
