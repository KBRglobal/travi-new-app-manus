
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const { width } = Dimensions.get('window');

const RealEstateAnalysisScreen = () => {
  return (
    <ScreenWrapper title="Real Estate Analysis" scrollable={true}>
      <View style={styles.container}>
        {/* Overview Card */}
        <BlurView intensity={20} style={styles.glassCard}>
          <Text style={styles.cardTitle}>Market Overview</Text>
          <View style={styles.metricRow}>
            <MaterialIcons name="trending-up" size={20} color={DS.success} />
            <Text style={styles.metricLabel}>Average Price:</Text>
            <Text style={styles.metricValue}>$450,000</Text>
          </View>
          <View style={styles.metricRow}>
            <MaterialIcons name="house" size={20} color={DS.purple} />
            <Text style={styles.metricLabel}>Properties Listed:</Text>
            <Text style={styles.metricValue}>1,234</Text>
          </View>
          <View style={styles.metricRow}>
            <MaterialIcons name="access-time" size={20} color={DS.warning} />
            <Text style={styles.metricLabel}>Avg. Days on Market:</Text>
            <Text style={styles.metricValue}>65</Text>
          </View>
        </BlurView>

        {/* Investment Insights Card */}
        <BlurView intensity={20} style={styles.glassCard}>
          <Text style={styles.cardTitle}>Investment Insights</Text>
          <View style={styles.metricRow}>
            <MaterialIcons name="attach-money" size={20} color={DS.success} />
            <Text style={styles.metricLabel}>Rental Yield:</Text>
            <Text style={styles.metricValue}>5.2%</Text>
          </View>
          <View style={styles.metricRow}>
            <MaterialIcons name="show-chart" size={20} color={DS.pink} />
            <Text style={styles.metricLabel}>Growth Forecast (5Y):</Text>
            <Text style={styles.metricValue}>+15%</Text>
          </View>
          <View style={styles.metricRow}>
            <MaterialIcons name="star" size={20} color={DS.info} />
            <Text style={styles.metricLabel}>Risk Level:</Text>
            <Text style={styles.metricValue}>Moderate</Text>
          </View>
        </BlurView>

        {/* Call to Action */}
        <LinearGradient
          colors={[DS.purple, DS.pink] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.ctaButton}
        >
          <Text style={styles.ctaButtonText}>Explore Properties</Text>
          <MaterialIcons name="arrow-forward" size={20} color={DS.white} style={{ marginLeft: 10 }} />
        </LinearGradient>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  glassCard: {
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
    fontSize: 20,
    color: DS.white,
    marginBottom: 15,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  metricLabel: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.muted,
    marginLeft: 10,
    flex: 1,
  },
  metricValue: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.white,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
  },
});

export default RealEstateAnalysisScreen;
