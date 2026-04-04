import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const regulationsData = [
  {
    id: '1',
    title: 'Travel Visa Requirements',
    status: 'Active',
    description: 'Check the latest visa requirements for your destination country. Ensure all documents are up-to-date.',
    category: 'Visa',
    impact: 'High',
  },
  {
    id: '2',
    title: 'Customs Declarations',
    status: 'Upcoming',
    description: 'Understand the customs declaration process and restricted items for international travel.',
    category: 'Customs',
    impact: 'Medium',
  },
  {
    id: '3',
    title: 'Health & Safety Guidelines',
    status: 'Active',
    description: 'Review health advisories, vaccination requirements, and safety protocols for your trip.',
    category: 'Health',
    impact: 'High',
  },
  {
    id: '4',
    title: 'Currency Exchange Limits',
    status: 'Active',
    description: 'Information on maximum currency amounts allowed for import and export.',
    category: 'Finance',
    impact: 'Low',
  },
  {
    id: '5',
    title: 'Luggage Restrictions',
    status: 'Active',
    description: 'Guidelines on baggage size, weight, and prohibited items for flights.',
    category: 'Logistics',
    impact: 'Medium',
  },
];

const RegulationsTracker = () => {
  const router = useRouter();
  return (
    <ScreenWrapper title="Regulations Tracker" scrollable={true}>
      <View style={styles.container}>
        {regulationsData.map((regulation) => (
          <BlurView key={regulation.id} intensity={20} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{regulation.title}</Text>
              <View style={[styles.statusBadge, regulation.status === 'Active' ? styles.statusActive : styles.statusUpcoming]}>
                <Text style={styles.statusText}>{regulation.status}</Text>
              </View>
            </View>
            <Text style={styles.cardDescription}>{regulation.description}</Text>
            <View style={styles.cardFooter}>
              <View style={styles.categoryContainer}>
                <MaterialIcons name="category" size={16} color={DS.muted} />
                <Text style={styles.categoryText}>{regulation.category}</Text>
              </View>
              <View style={styles.impactContainer}>
                <MaterialIcons name="warning" size={16} color={DS.warning} />
                <Text style={styles.impactText}>Impact: {regulation.impact}</Text>
              </View>
            </View>
          </BlurView>
        ))}

        <TouchableOpacity activeOpacity={0.8} style={styles.ctaButton}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            <MaterialIcons name="add-circle-outline" size={20} color={DS.white} />
            <Text style={styles.ctaButtonText}>Add New Regulation</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    flexShrink: 1,
    marginRight: 10,
  },
  statusBadge: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  statusActive: {
    backgroundColor: DS.success,
  },
  statusUpcoming: {
    backgroundColor: DS.muted,
  },
  statusText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 12,
    color: DS.white,
  },
  cardDescription: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.secondary,
    marginBottom: 15,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 12,
    color: DS.muted,
    marginLeft: 5,
  },
  impactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  impactText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 12,
    color: DS.warning,
    marginLeft: 5,
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
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
    marginLeft: 10,
  },
});

export default RegulationsTracker;
