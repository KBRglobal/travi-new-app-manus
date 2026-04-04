import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

// Assuming DS is exported from ScreenWrapper or a similar design system file

const SummaryScreen = () => {
  const router = useRouter();
  // Dummy data to simulate trip summary content
  const tripData = {
    name: "European Adventure",
    destination: "Paris, France",
    dates: "Oct 20 - Oct 27, 2026",
    totalCost: "$2,500",
    travelers: 2,
    status: "Confirmed",
  };

  return (
    <ScreenWrapper title="Trip Summary" scrollable={true}>
      <View style={styles.section}>
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <Text style={styles.cardTitle}>Trip Details</Text>
          <View style={styles.detailRow}>
            <MaterialIcons name="flight" size={20} color={DS.muted} />
            <Text style={styles.label}>Destination:</Text>
            <Text style={styles.bodyText}>{tripData.destination}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="calendar-today" size={20} color={DS.muted} />
            <Text style={styles.label}>Dates:</Text>
            <Text style={styles.bodyText}>{tripData.dates}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="people" size={20} color={DS.muted} />
            <Text style={styles.label}>Travelers:</Text>
            <Text style={styles.bodyText}>{tripData.travelers}</Text>
          </View>
        </BlurView>
      </View>

      <View style={styles.section}>
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <Text style={styles.cardTitle}>Financial Overview</Text>
          <View style={styles.detailRow}>
            <MaterialIcons name="attach-money" size={20} color={DS.muted} />
            <Text style={styles.label}>Total Cost:</Text>
            <Text style={styles.bodyText}>{tripData.totalCost}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="check-circle" size={20} color={DS.success} />
            <Text style={styles.label}>Status:</Text>
            <Text style={[styles.bodyText, { color: DS.success }]}>{tripData.status}</Text>
          </View>
        </BlurView>
      </View>

      <View style={styles.ctaContainer}>
        <TouchableOpacity activeOpacity={0.8}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaButton}
          >
            <MaterialIcons name="edit" size={20} color={DS.white} />
            <Text style={styles.ctaButtonText}>Edit Trip</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={{ marginTop: 10 }}>
          <LinearGradient
            colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaButton}
          >
            <MaterialIcons name="share" size={20} color={DS.white} />
            <Text style={styles.ctaButtonText}>Share Summary</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: "hidden",
    padding: 20,
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold', // Placeholder, assuming font is loaded globally
    fontSize: 22,
    color: DS.white,
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontFamily: 'Satoshi-Medium', // Placeholder, assuming font is loaded globally
    fontSize: 16,
    color: DS.muted,
    marginLeft: 10,
    marginRight: 5,
  },
  bodyText: {
    fontFamily: 'Satoshi-Regular', // Placeholder, assuming font is loaded globally
    fontSize: 16,
    color: DS.white,
    flex: 1,
    flexWrap: 'wrap',
  },
  ctaContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium', // Placeholder, assuming font is loaded globally
    fontSize: 18,
    color: DS.white,
    marginLeft: 10,
  },
});

export default SummaryScreen;
