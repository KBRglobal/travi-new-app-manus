import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const MemoryHubScreen = () => {
  const router = useRouter();
  const memories = [
    {
      id: '1',
      title: 'Paris Adventure',
      date: 'Oct 24, 2023',
      description: 'Explored the Eiffel Tower and enjoyed croissants.',
      icon: 'travel-explore',
    },
    {
      id: '2',
      title: 'Mountain Hike',
      date: 'Sep 10, 2023',
      description: 'Challenging hike with breathtaking views.',
      icon: 'landscape',
    },
    {
      id: '3',
      title: 'Beach Getaway',
      date: 'Aug 01, 2023',
      description: 'Relaxing days by the ocean, sun and sand.',
      icon: 'beach-access',
    },
  ];

  return (
    <ScreenWrapper title="Memory Hub" scrollable={true}>
      <View style={styles.container}>
        {memories.map((memory) => (
          <BlurView key={memory.id} intensity={20} style={styles.card}>
            <View style={styles.cardContent}>
              <MaterialIcons name={memory.icon as any} size={30} color={DS.purple} style={styles.cardIcon} />
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{memory.title}</Text>
                <Text style={styles.cardDate}>{memory.date}</Text>
                <Text style={styles.cardDescription}>{memory.description}</Text>
              </View>
              <TouchableOpacity style={styles.viewDetailsButton}>
                <LinearGradient
                  colors={[DS.purple, DS.pink] as const}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientButton}
                >
                  <Text style={styles.viewDetailsButtonText}>View Details</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </BlurView>
        ))}
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
    marginBottom: 10,
  },
  cardIcon: {
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginBottom: 5,
  },
  cardDate: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
    color: DS.muted,
    marginBottom: 5,
  },
  cardDescription: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.secondary,
  },
  viewDetailsButton: {
    marginLeft: 'auto',
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  viewDetailsButtonText: {
    fontFamily: 'Satoshi-Medium',
    color: DS.white,
    fontSize: 14,
  },
});

export default MemoryHubScreen;
