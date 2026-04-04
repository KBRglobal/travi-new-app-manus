import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

// DS object exported from ScreenWrapper.tsx

const EmergencyScreen = () => {
  const handleCall = (number: string) => {
    console.log(`Calling ${number}`);
    // In a real app, you would use Linking.openURL(`tel:${number}`);
  };

  const EmergencyContactCard = ({ name, number, relationship }: { name: string; number: string; relationship: string }) => (
    <BlurView intensity={20} tint="dark" style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.contactName}>{name}</Text>
          <Text style={styles.contactRelationship}>{relationship}</Text>
          <Text style={styles.contactNumber}>{number}</Text>
        </View>
        <TouchableOpacity onPress={() => handleCall(number)} style={styles.callButton}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <MaterialIcons name="call" size={20} color={DS.white} />
            <Text style={styles.callButtonText}>Call</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </BlurView>
  );

  return (
    <ScreenWrapper title="Emergency Contacts" scrollable={true}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Your safety is our priority. Here are your emergency contacts.</Text>
        
        <EmergencyContactCard
          name="John Doe"
          number="+1-555-123-4567"
          relationship="Family Member"
        />
        <EmergencyContactCard
          name="Jane Smith"
          number="+1-555-987-6543"
          relationship="Friend"
        />
        <EmergencyContactCard
          name="Local Police"
          number="911"
          relationship="Emergency Services"
        />
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
  headerText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  cardContainer: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginBottom: 15,
    padding: 20,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactName: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginBottom: 5,
  },
  contactRelationship: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
    color: DS.secondary,
    marginBottom: 2,
  },
  contactNumber: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.white,
  },
  callButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    gap: 8,
  },
  callButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
  },
});

export default EmergencyScreen;
