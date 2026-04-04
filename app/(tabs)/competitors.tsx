import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const CompetitorsScreen = () => {
  const router = useRouter();
  const competitors = [
    {
      id: '1',
      name: 'Global Travel Co.',
      marketShare: '25%',
      growth: '+5.2%',
      rating: 4.5,
      status: 'Leading',
    },
    {
      id: '2',
      name: 'Adventure Seekers',
      marketShare: '18%',
      growth: '+3.1%',
      rating: 4.2,
      status: 'Growing',
    },
    {
      id: '3',
      name: 'Voyage Planners',
      marketShare: '12%',
      growth: '-1.5%',
      rating: 3.8,
      status: 'Struggling',
    },
  ];

  return (
    <ScreenWrapper title="Competitors" scrollable={true}>
      <View style={styles.container}>
        {competitors.map((competitor) => (
          <BlurView key={competitor.id} intensity={20} tint="dark" style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.competitorName}>{competitor.name}</Text>
              <View style={styles.statusContainer}>
                <MaterialIcons
                  name={competitor.status === 'Leading' ? 'star' : competitor.status === 'Growing' ? 'trending-up' : 'trending-down'}
                  size={16}
                  color={competitor.status === 'Leading' ? DS.purple : competitor.status === 'Growing' ? DS.success : DS.warning}
                />
                <Text
                  style={[
                    styles.statusText,
                    {
                      color: competitor.status === 'Leading' ? DS.purple : competitor.status === 'Growing' ? DS.success : DS.warning,
                    },
                  ]}
                >
                  {competitor.status}
                </Text>
              </View>
            </View>

            <View style={styles.cardBody}>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Market Share</Text>
                <Text style={styles.metricValue}>{competitor.marketShare}</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Growth</Text>
                <Text style={styles.metricValue}>{competitor.growth}</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Rating</Text>
                <Text style={styles.metricValue}>{competitor.rating} <MaterialIcons name="star" size={14} color={DS.warning} /></Text>
              </View>
            </View>

            <TouchableOpacity style={styles.ctaButton} onPress={() => router.push("/(tabs)/explore" as any)}>
              <LinearGradient
                colors={[DS.purple, DS.pink] as const}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBackground}
              >
                <Text style={styles.ctaButtonText}>View Details</Text>
                <MaterialIcons name="arrow-forward" size={20} color={DS.white} />
              </LinearGradient>
            </TouchableOpacity>
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
    marginBottom: 20,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  competitorName: {
    fontFamily: 'Chillax-Bold',
    fontSize: 22,
    color: DS.white,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
    marginLeft: 5,
  },
  cardBody: {
    marginBottom: 20,
  },
  metricItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metricLabel: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
  },
  metricValue: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
  },
  ctaButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 10,
  },
  gradientBackground: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
    marginRight: 10,
  },
});

export default CompetitorsScreen;
