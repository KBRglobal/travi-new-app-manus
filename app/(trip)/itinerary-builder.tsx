import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

// DS object exported from ScreenWrapper.tsx (for reference and direct use)

const ItineraryBuilder = () => {
  const router = useRouter();
  // Dummy data for itinerary items
  const itineraryItems = [
    { id: '1', title: 'Flight to Paris', time: '10:00 AM', location: 'CDG Airport' },
    { id: '2', title: 'Check-in at Hotel', time: '03:00 PM', location: 'The Parisian Hotel' },
    { id: '3', title: 'Eiffel Tower Visit', time: '06:00 PM', location: 'Champ de Mars' },
  ];

  return (
    <ScreenWrapper title="Build Your Itinerary" scrollable={true}>
      <View style={styles.container}>
        {/* Add New Item Section */}
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.cardContent}>
            <Text style={styles.label}>Add New Event</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="add-circle-outline" size={24} color={DS.muted} />
              <Text style={styles.inputPlaceholder}>Tap to add a new event or activity</Text>
            </View>
            <TouchableOpacity style={styles.ctaButton}>
              <LinearGradient
                colors={[DS.purple, DS.pink] as const}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBackground}
              >
                <Text style={styles.ctaButtonText}>Add Event</Text>
                <MaterialIcons name="arrow-forward" size={20} color={DS.white} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </BlurView>

        {/* Existing Itinerary Items */}
        <Text style={styles.sectionTitle}>Your Current Itinerary</Text>
        {itineraryItems.map((item) => (
          <BlurView key={item.id} intensity={20} tint="dark" style={styles.itineraryItemCard}>
            <View style={styles.itemContent}>
              <MaterialIcons name="event" size={24} color={DS.purple} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemTimeLocation}>{item.time} - {item.location}</Text>
              </View>
              <TouchableOpacity>
                <MaterialIcons name="edit" size={20} color={DS.muted} />
              </TouchableOpacity>
            </View>
          </BlurView>
        ))}

        {/* Final CTA */}
        <TouchableOpacity style={styles.bottomCtaButton} onPress={() => router.push('/(trip)/cart' as any)}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            <Text style={styles.ctaButtonText}>Finalize Itinerary</Text>
            <MaterialIcons name="check-circle-outline" size={20} color={DS.white} />
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
    backgroundColor: DS.bg, // Ensure background is set if ScreenWrapper doesn't cover it fully or for preview
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
  cardContent: {
    // Styles for content inside the glass card
  },
  label: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DS.surfaceHigh,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  inputPlaceholder: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.placeholder,
    marginLeft: 10,
  },
  ctaButton: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradientBackground: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10, // Ensure gradient also has border radius
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginRight: 10,
  },
  sectionTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 22,
    color: DS.white,
    marginBottom: 15,
    marginTop: 10,
  },
  itineraryItemCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: "hidden",
    marginBottom: 15,
    padding: 15,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemDetails: {
    marginLeft: 15,
    flex: 1,
  },
  itemTitle: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
  },
  itemTimeLocation: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 13,
    color: DS.muted,
    marginTop: 2,
  },
  bottomCtaButton: {
    marginTop: 30,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default ItineraryBuilder;
