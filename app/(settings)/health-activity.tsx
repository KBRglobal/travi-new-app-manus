import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const HealthActivityScreen = () => {
  return (
    <ScreenWrapper title="Health & Activity" scrollable={true}>
      <View style={styles.container}>
        {/* Daily Activity Summary */}
        <Text style={styles.sectionTitle}>Daily Summary</Text>
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.cardContent}>
            <MaterialIcons name="directions-run" size={24} color={DS.purple} />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Steps Today</Text>
              <Text style={styles.cardValue}>8,500 <Text style={styles.cardUnit}>steps</Text></Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <MaterialIcons name="local-fire-department" size={24} color={DS.pink} />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Calories Burned</Text>
              <Text style={styles.cardValue}>450 <Text style={styles.cardUnit}>kcal</Text></Text>
            </View>
          </View>
        </BlurView>

        {/* Health Goals */}
        <Text style={styles.sectionTitle}>Your Goals</Text>
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.cardContent}>
            <MaterialIcons name="fitness-center" size={24} color={DS.success} />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Weekly Exercise</Text>
              <Text style={styles.cardValue}>3/5 <Text style={styles.cardUnit}>sessions</Text></Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <MaterialIcons name="hotel" size={24} color={DS.info} />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Sleep Quality</Text>
              <Text style={styles.cardValue}>Good <Text style={styles.cardUnit}>(7.5h)</Text></Text>
            </View>
          </View>
        </BlurView>

        {/* CTA */}
        <TouchableOpacity style={styles.ctaButton}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            style={styles.gradientBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.ctaButtonText}>View Detailed Activity</Text>
            <MaterialIcons name="arrow-forward" size={20} color={DS.white} style={{ marginLeft: 8 }} />
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
  sectionTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 22,
    color: DS.white,
    marginBottom: 15,
    marginTop: 25,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginBottom: 20,
    padding: 15,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  cardTextContainer: {
    marginLeft: 15,
  },
  cardTitle: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.muted,
  },
  cardValue: {
    fontFamily: 'Chillax-Bold',
    fontSize: 20,
    color: DS.white,
    marginTop: 2,
  },
  cardUnit: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.muted,
  },
  ctaButton: {
    marginTop: 30,
    borderRadius: 12,
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
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
  },
});

export default HealthActivityScreen;
