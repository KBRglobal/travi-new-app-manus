import { useRouter } from 'expo-router';

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

// Assuming DS is exported from ScreenWrapper or a common design system file
// For this task, we'll define it here based on the provided values

const ActivityDetailLiveScreen = () => {
  const router = useRouter();
  // Dummy data for demonstration
  const activity = {
    title: "Skydiving Adventure",
    date: "April 20, 2026",
    time: "10:00 AM - 12:00 PM",
    location: "Dubai Skydive Center",
    price: "$599",
    status: "Confirmed",
    description: "Experience the thrill of a lifetime with a tandem skydive over the iconic Palm Jumeirah. Enjoy breathtaking views and an unforgettable freefall experience.",
    participants: [
      { name: "John Doe", avatar: "" },
      { name: "Jane Smith", avatar: "" },
    ],
  };

  return (
    <ScreenWrapper title="Activity Details" scrollable={true}>
      <View style={styles.container}>
        {/* Activity Header */}
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.headerContent}>
            <Text style={styles.activityTitle}>{activity.title}</Text>
            <View style={styles.detailRow}>
              <MaterialIcons name="event" size={18} color={DS.muted} />
              <Text style={styles.detailText}>{activity.date}</Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialIcons name="access-time" size={18} color={DS.muted} />
              <Text style={styles.detailText}>{activity.time}</Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialIcons name="location-on" size={18} color={DS.muted} />
              <Text style={styles.detailText}>{activity.location}</Text>
            </View>
          </View>
        </BlurView>

        {/* Description */}
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.bodyText}>{activity.description}</Text>
        </BlurView>

        {/* Participants */}
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <Text style={styles.sectionTitle}>Participants</Text>
          {activity.participants.map((p, index) => (
            <View key={index} style={styles.participantRow}>
              <MaterialIcons name="person" size={20} color={DS.white} />
              <Text style={styles.bodyText}>{p.name}</Text>
            </View>
          ))}
        </BlurView>

        {/* CTA */}
        <TouchableOpacity style={styles.ctaButton} onPress={() => router.push("/(live)/home" as any)}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            style={styles.gradientBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.ctaButtonText}>Book Now - {activity.price}</Text>
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
    backgroundColor: DS.bg, // Ensure background is set if not fully covered by ScreenWrapper
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: "hidden",
    marginBottom: 20,
    padding: 20,
  },
  headerContent: {
    marginBottom: 10,
  },
  activityTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 28,
    color: DS.white,
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
    marginLeft: 10,
  },
  sectionTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 22,
    color: DS.white,
    marginBottom: 15,
  },
  bodyText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.secondary,
    lineHeight: 24,
  },
  participantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ctaButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 20,
  },
  gradientBackground: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
  },
});

export default ActivityDetailLiveScreen;
