import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const EmergencyScreen = () => {
  const router = useRouter();
  const contacts = [
    { title: 'Local Police', number: '911', icon: 'local-police' },
    { title: 'Emergency Services', number: '911', icon: 'medical-services' },
    { title: 'Embassy Contact', number: '+1-202-555-0100', icon: 'account-balance' },
  ];

  return (
    <ScreenWrapper title="Emergency Contacts" scrollable={true}>
      {contacts.map((contact, index) => (
        <BlurView key={index} intensity={20} style={styles.cardContainer}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{contact.title}</Text>
            <Text style={styles.cardNumber}>{contact.number}</Text>
            <TouchableOpacity style={styles.button} onPress={() => { /* Implement call functionality */ }}>
              <LinearGradient
                colors={[DS.purple, DS.pink] as const}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <MaterialIcons name="call" size={20} color={DS.white} />
                <Text style={styles.buttonText}>Call Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </BlurView>
      ))}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginBottom: 15,
    marginHorizontal: 20,
    padding: 20,
  },
  cardContent: {
    // Flex properties for content alignment if needed
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 20,
    color: DS.white,
    marginBottom: 5,
  },
  cardNumber: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
    marginBottom: 15,
  },
  button: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
    marginLeft: 8,
  },
});

export default EmergencyScreen;
