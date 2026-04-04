import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const realEstateAgents = [
  {
    id: '1',
    name: 'Alice Johnson',
    company: 'Elite Properties',
    phone: '+1-555-123-4567',
    email: 'alice.johnson@example.com',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Bob Williams',
    company: 'Luxury Homes Inc.',
    phone: '+1-555-987-6543',
    email: 'bob.williams@example.com',
    rating: 4.5,
  },
  {
    id: '3',
    name: 'Charlie Brown',
    company: 'City Living Realty',
    phone: '+1-555-111-2222',
    email: 'charlie.brown@example.com',
    rating: 4.9,
  },
];

const RealEstateContacts = () => {
  return (
    <ScreenWrapper title="Real Estate Contacts" scrollable={true}>
      <View style={styles.container}>
        {realEstateAgents.map((agent) => (
          <BlurView key={agent.id} intensity={20} style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.agentName}>{agent.name}</Text>
              <Text style={styles.agentCompany}>{agent.company}</Text>
              <View style={styles.contactInfo}>
                <MaterialIcons name="phone" size={16} color={DS.muted} />
                <Text style={styles.contactText}>{agent.phone}</Text>
              </View>
              <View style={styles.contactInfo}>
                <MaterialIcons name="email" size={16} color={DS.muted} />
                <Text style={styles.contactText}>{agent.email}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <MaterialIcons name="star" size={16} color={DS.warning} />
                <Text style={styles.ratingText}>{agent.rating}</Text>
              </View>
              <TouchableOpacity style={styles.ctaButton}>
                <LinearGradient
                  colors={[DS.purple, DS.pink] as const}
                  style={styles.gradientButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.ctaButtonText}>Contact Agent</Text>
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
    marginBottom: 20,
    padding: 20,
  },
  cardContent: {
    // Add padding or other styles if needed inside the BlurView
  },
  agentName: {
    fontFamily: 'Chillax-Bold',
    fontSize: 20,
    color: DS.white,
    marginBottom: 5,
  },
  agentCompany: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.muted,
    marginBottom: 15,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  contactText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.white,
    marginLeft: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  ratingText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
    color: DS.warning,
    marginLeft: 5,
  },
  ctaButton: {
    marginTop: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
  },
});

export default RealEstateContacts;
