import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const ActivitySelectScreen = () => {
  const router = useRouter();
  const activities = [
    {
      id: '1',
      title: 'Explore Ancient Ruins',
      description: 'Discover the mysteries of forgotten civilizations with expert guides.',
      icon: 'castle',
    },
    {
      id: '2',
      title: 'Underwater Adventure',
      description: 'Dive into crystal-clear waters and explore vibrant marine life.',
      icon: 'scuba-diving',
    },
    {
      id: '3',
      title: 'Mountain Trekking',
      description: 'Conquer majestic peaks and witness breathtaking panoramic views.',
      icon: 'terrain',
    },
  ];

  const renderActivityCard = (activity: typeof activities[0]) => (
    <BlurView intensity={20} tint="dark" style={styles.cardContainer} key={activity.id}>
      <View style={styles.cardContent}>
        <MaterialIcons name={activity.icon as any} size={30} color={DS.purple} style={styles.cardIcon} />
        <View style={styles.cardTextContent}>
          <Text style={styles.cardTitle}>{activity.title}</Text>
          <Text style={styles.cardDescription}>{activity.description}</Text>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.8} style={styles.selectButton}>
        <LinearGradient
          colors={[DS.purple, DS.pink] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientButton}
        >
          <Text style={styles.buttonText}>Select Activity</Text>
          <MaterialIcons name="arrow-forward" size={20} color={DS.white} />
        </LinearGradient>
      </TouchableOpacity>
    </BlurView>
  );

  return (
    <ScreenWrapper title="Select Your Activity" scrollable={true}>
      <View style={styles.screenPadding}>
        {activities.map(renderActivityCard)}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenPadding: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cardContainer: {
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
    marginBottom: 15,
  },
  cardIcon: {
    marginRight: 15,
  },
  cardTextContent: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold', // Assuming Chillax-Bold is loaded
    fontSize: 18,
    color: DS.white,
    marginBottom: 5,
  },
  cardDescription: {
    fontFamily: 'Satoshi-Regular', // Assuming Satoshi-Regular is loaded
    fontSize: 14,
    color: DS.muted,
  },
  selectButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12, // Ensure inner content also has border radius
  },
  buttonText: {
    fontFamily: 'Satoshi-Medium', // Assuming Satoshi-Medium is loaded
    fontSize: 16,
    color: DS.white,
    marginRight: 10,
  },
});

export default ActivitySelectScreen;
