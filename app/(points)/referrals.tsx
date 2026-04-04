import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

// DS object from ScreenWrapper.tsx (for reference, actual import is handled by ScreenWrapper)

const ReferralsScreen = () => {
  const router = useRouter();
  return (
    <ScreenWrapper title="Referrals" scrollable={true}>
      <View style={styles.container}>
        <Text style={styles.header}>Invite Friends, Earn Rewards!</Text>
        <Text style={styles.bodyText}>Share your unique referral code with friends and family. When they sign up and complete their first booking, you both get amazing rewards!</Text>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <MaterialIcons name="card-giftcard" size={30} color={DS.purple} />
          <Text style={styles.cardTitle}>Your Referral Code</Text>
          <Text style={styles.referralCode}>TRAVIREF123</Text>
          <TouchableOpacity onPress={() => console.log('Copy code')}>
            <LinearGradient
              colors={[DS.purple, DS.pink] as const}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>Copy Code</Text>
            </LinearGradient>
          </TouchableOpacity>
        </BlurView>

        <Text style={styles.sectionHeader}>How it Works</Text>
        <View style={styles.stepContainer}>
          <MaterialIcons name="share" size={24} color={DS.pink} style={styles.stepIcon} />
          <View>
            <Text style={styles.stepTitle}>1. Share Your Code</Text>
            <Text style={styles.bodyText}>Send your unique code to anyone who loves travel.</Text>
          </View>
        </View>
        <View style={styles.stepContainer}>
          <MaterialIcons name="person-add" size={24} color={DS.pink} style={styles.stepIcon} />
          <View>
            <Text style={styles.stepTitle}>2. Friend Signs Up</Text>
            <Text style={styles.bodyText}>They use your code when creating their TRAVI account.</Text>
          </View>
        </View>
        <View style={styles.stepContainer}>
          <MaterialIcons name="flight-takeoff" size={24} color={DS.pink} style={styles.stepIcon} />
          <View>
            <Text style={styles.stepTitle}>3. Both Get Rewarded!</Text>
            <Text style={styles.bodyText}>Once they complete their first booking, rewards are yours!</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => console.log('Refer now')}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.gradientButtonLarge}
          >
            <Text style={styles.buttonText}>Refer a Friend Now</Text>
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
  header: {
    fontFamily: 'Chillax-Bold',
    fontSize: 28,
    color: DS.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  bodyText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 24,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  cardTitle: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
    marginTop: 10,
    marginBottom: 5,
  },
  referralCode: {
    fontFamily: 'Chillax-Bold',
    fontSize: 24,
    color: DS.purple,
    marginBottom: 15,
  },
  gradientButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  gradientButtonLarge: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 30,
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
    textAlign: 'center',
  },
  sectionHeader: {
    fontFamily: 'Chillax-Bold',
    fontSize: 22,
    color: DS.white,
    marginTop: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  stepIcon: {
    marginRight: 15,
  },
  stepTitle: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 17,
    color: DS.white,
    marginBottom: 5,
  },
});

export default ReferralsScreen;
