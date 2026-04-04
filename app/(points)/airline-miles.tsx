import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const AirlineMilesScreen = () => {
  const router = useRouter();
  return (
    <ScreenWrapper title="Airline Miles" scrollable={true}>
      <View style={styles.container}>
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <Text style={styles.cardTitle}>Current Miles Balance</Text>
          <Text style={styles.milesAmount}>123,456</Text>
          <Text style={styles.milesLabel}>Total Miles Earned</Text>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <Text style={styles.cardTitle}>Recent Activity</Text>
          <View style={styles.activityItem}>
            <MaterialIcons name="flight-takeoff" size={24} color={DS.purple} />
            <View style={styles.activityText}>
              <Text style={styles.activityDescription}>Flight to New York</Text>
              <Text style={styles.activityDate}>March 28, 2026</Text>
            </View>
            <Text style={styles.activityMiles}>+15,000</Text>
          </View>
          <View style={styles.activityItem}>
            <MaterialIcons name="shopping-cart" size={24} color={DS.pink} />
            <View style={styles.activityText}>
              <Text style={styles.activityDescription}>Shopping at Duty-Free</Text>
              <Text style={styles.activityDate}>March 27, 2026</Text>
            </View>
            <Text style={styles.activityMiles}>+2,500</Text>
          </View>
        </BlurView>

        <TouchableOpacity style={styles.ctaButton} onPress={() => router.push("/(points)/partner-detail" as any)}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.ctaButtonText}>Redeem Miles</Text>
            <MaterialIcons name="chevron-right" size={24} color={DS.white} />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ctaButton} onPress={() => router.push('/(points)/redeem' as any)}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.ctaButtonText}>Link New Airline Program</Text>
            <MaterialIcons name="add" size={24} color={DS.white} />
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
    backgroundColor: DS.bg,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginBottom: 10,
  },
  milesAmount: {
    fontFamily: 'Chillax-Bold',
    fontSize: 48,
    color: DS.white,
    textAlign: 'center',
  },
  milesLabel: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.muted,
    textAlign: 'center',
    marginTop: 5,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: DS.border,
  },
  activityText: {
    flex: 1,
    marginLeft: 15,
  },
  activityDescription: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
  },
  activityDate: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.muted,
  },
  activityMiles: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.success,
  },
  ctaButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 15,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginRight: 10,
  },
});

export default AirlineMilesScreen;
