import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const EnterpriseScreen = () => {
  const router = useRouter();
  return (
    <ScreenWrapper title="Enterprise Dashboard" scrollable={true}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <BlurView intensity={20} style={styles.glassCard}>
          <View style={styles.cardContent}>
            <MaterialIcons name="business-center" size={24} color={DS.purple} />
            <Text style={styles.cardText}>Total Bookings: 1,234</Text>
          </View>
        </BlurView>
        <BlurView intensity={20} style={styles.glassCard}>
          <View style={styles.cardContent}>
            <MaterialIcons name="attach-money" size={24} color={DS.success} />
            <Text style={styles.cardText}>Revenue: $123,456</Text>
          </View>
        </BlurView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity style={styles.ctaButton} onPress={() => router.push("/(tabs)/profile" as any)}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            style={styles.gradientBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <MaterialIcons name="add-circle-outline" size={20} color={DS.white} />
            <Text style={styles.ctaButtonText}>Create New Trip</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ctaButton}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            style={styles.gradientBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <MaterialIcons name="analytics" size={20} color={DS.white} />
            <Text style={styles.ctaButtonText}>View Analytics</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <BlurView intensity={20} style={styles.glassCard}>
          <View style={styles.activityItem}>
            <MaterialIcons name="event" size={20} color={DS.muted} />
            <Text style={styles.activityText}>Trip to Paris booked by John Doe</Text>
          </View>
        </BlurView>
        <BlurView intensity={20} style={styles.glassCard}>
          <View style={styles.activityItem}>
            <MaterialIcons name="update" size={20} color={DS.muted} />
            <Text style={styles.activityText}>Report generated for Q4 2025</Text>
          </View>
        </BlurView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 22,
    color: DS.white,
    marginBottom: 15,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginBottom: 10,
    padding: 15,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
    marginLeft: 10,
  },
  ctaButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 10,
  },
  gradientBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 16, // Ensure inner content also has rounded corners
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
    marginLeft: 10,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  activityText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.muted,
    marginLeft: 10,
  },
});

export default EnterpriseScreen;
