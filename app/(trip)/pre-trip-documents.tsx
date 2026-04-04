import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

// Dummy data for demonstration
const tripDocuments = [
  { id: '1', name: 'Flight Tickets', icon: 'airplane-ticket', status: 'Completed' },
  { id: '2', name: 'Hotel Booking', icon: 'hotel', status: 'Pending' },
  { id: '3', name: 'Visa Application', icon: 'description', status: 'Completed' },
  { id: '4', name: 'Travel Insurance', icon: 'health-and-safety', status: 'Pending' },
  { id: '5', name: 'Passport Copy', icon: 'passport', status: 'Completed' },
  { id: '6', name: 'Itinerary', icon: 'map', status: 'Completed' },
];

const PreTripDocumentsScreen = () => {
  return (
    <ScreenWrapper title="Pre-Trip Documents" scrollable={true}>
      <View style={styles.container}>
        {tripDocuments.map((doc) => (
          <BlurView key={doc.id} intensity={20} tint="dark" style={styles.card}>
            <View style={styles.cardContent}>
              <MaterialIcons name={doc.icon as any} size={24} color={DS.purple} />
              <Text style={styles.documentName}>{doc.name}</Text>
              <Text style={[styles.documentStatus, { color: doc.status === 'Completed' ? DS.success : DS.warning }]}>
                {doc.status}
              </Text>
            </View>
          </BlurView>
        ))}

        <LinearGradient colors={[DS.purple, DS.pink] as const} style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Upload New Document</Text>
          <MaterialIcons name="cloud-upload" size={20} color={DS.white} />
        </LinearGradient>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
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
  documentName: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
    flex: 1,
    marginLeft: 10,
  },
  documentStatus: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
  },
  ctaButton: {
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginRight: 10,
  },
});

export default PreTripDocumentsScreen;
