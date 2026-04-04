import { useRouter } from 'expo-router';

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const SupportScreen = () => {
  const router = useRouter();
  const supportOptions = [
    {
      icon: 'help-outline',
      title: 'Frequently Asked Questions',
      description: 'Find answers to common questions about TRAVI.',
      action: () => console.log('Navigate to FAQ'),
    },
    {
      icon: 'email',
      title: 'Email Support',
      description: 'Send us an email and we will get back to you.',
      action: () => Linking.openURL('mailto:support@travi.com'),
    },
    {
      icon: 'phone',
      title: 'Call Support',
      description: 'Speak directly with our support team.',
      action: () => Linking.openURL('tel:+1234567890'),
    },
    {
      icon: 'chat',
      title: 'Live Chat',
      description: 'Chat with a support agent in real-time.',
      action: () => console.log('Open live chat'),
    },
  ];

  return (
    <ScreenWrapper title="Support" scrollable={true}>
      <View style={styles.container}>
        <Text style={styles.header}>How can we help you?</Text>
        <Text style={styles.subHeader}>Choose an option below to get assistance.</Text>

        {supportOptions.map((option, index) => (
          <TouchableOpacity key={index} style={styles.optionCard} onPress={option.action}>
            <BlurView intensity={20} tint="dark" style={styles.blurContainer}>
              <View style={styles.optionContent}>
                <MaterialIcons name={option.icon as any} size={28} color={DS.purple} />
                <View style={styles.textContainer}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </View>
                <MaterialIcons name="arrow-forward-ios" size={20} color={DS.muted} />
              </View>
            </BlurView>
          </TouchableOpacity>
        ))}

        <View style={styles.contactInfo}>
          <Text style={styles.contactText}>Need immediate help?</Text>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <TouchableOpacity style={styles.buttonContent} onPress={() => Linking.openURL('tel:+1234567890')}>
              <MaterialIcons name="call" size={20} color={DS.white} />
              <Text style={styles.buttonText}>Call Us Now</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
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
  header: {
    fontFamily: 'Chillax-Bold',
    fontSize: 28,
    color: DS.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeader: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
    textAlign: 'center',
    marginBottom: 30,
  },
  optionCard: {
    marginBottom: 15,
    borderRadius: 16,
    overflow: 'hidden',
  },
  blurContainer: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  optionTitle: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
    marginBottom: 5,
  },
  optionDescription: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.muted,
  },
  contactInfo: {
    marginTop: 30,
    alignItems: 'center',
  },
  contactText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
    marginBottom: 15,
  },
  gradientButton: {
    borderRadius: 10,
    width: '80%',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  buttonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginLeft: 10,
  },
});

export default SupportScreen;
