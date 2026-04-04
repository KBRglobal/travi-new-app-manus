import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

// Assuming DS is exported from ScreenWrapper or a separate design system file
// For this task, we'll define it here based on the provided structure

const TripCompanions = () => {
  const companions = [
    { id: '1', name: 'Alice Smith', status: 'Confirmed' },
    { id: '2', name: 'Bob Johnson', status: 'Pending' },
    { id: '3', name: 'Charlie Brown', status: 'Confirmed' },
    { id: '4', name: 'Diana Prince', status: 'Pending' },
  ];

  return (
    <ScreenWrapper title="Trip Companions" scrollable={true}>
      <View style={styles.container}>
        {companions.map((companion) => (
          <BlurView key={companion.id} intensity={20} tint="dark" style={styles.card}>
            <View style={styles.cardContent}>
              <MaterialIcons name="person" size={24} color={DS.white} style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={styles.companionName}>{companion.name}</Text>
                <Text style={[styles.companionStatus, { color: companion.status === 'Confirmed' ? DS.success : DS.warning }]}>
                  {companion.status}
                </Text>
              </View>
              <TouchableOpacity>
                <MaterialIcons name="more-vert" size={24} color={DS.muted} />
              </TouchableOpacity>
            </View>
          </BlurView>
        ))}

        <TouchableOpacity style={styles.ctaButton}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            <MaterialIcons name="add" size={24} color={DS.white} />
            <Text style={styles.ctaButtonText}>Add New Companion</Text>
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
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  companionName: {
    fontFamily: 'Chillax-Bold', // Assuming Chillax-Bold is loaded
    fontSize: 18,
    color: DS.white,
    marginBottom: 5,
  },
  companionStatus: {
    fontFamily: 'Satoshi-Medium', // Assuming Satoshi-Medium is loaded
    fontSize: 14,
  },
  ctaButton: {
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradientBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium', // Assuming Satoshi-Medium is loaded
    fontSize: 16,
    color: DS.white,
    marginLeft: 10,
  },
});

export default TripCompanions;
