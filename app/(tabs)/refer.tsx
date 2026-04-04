import { useRouter } from 'expo-router';

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const ReferScreen = () => {
  const router = useRouter();
  const referralCode = 'TRAVI2024';
  const referralLink = 'https://travi.app/refer?code=' + referralCode;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          `Join TRAVI and get amazing travel deals! Use my referral code ${referralCode} or click the link: ${referralLink}`,
        url: referralLink,
        title: 'Refer a Friend to TRAVI',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <ScreenWrapper title="Refer a Friend" scrollable={true}>
      <View style={styles.container}>
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <MaterialIcons name="people-alt" size={48} color={DS.purple} style={styles.icon} />
          <Text style={styles.cardTitle}>Share the TRAVI Experience</Text>
          <Text style={styles.cardText}>Invite your friends to TRAVI and both of you get exclusive rewards on your next trip!</Text>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <Text style={styles.label}>Your Referral Code</Text>
          <View style={styles.referralCodeContainer}>
            <Text style={styles.referralCode}>{referralCode}</Text>
            <TouchableOpacity onPress={() => { /* Copy to clipboard logic */ }}>
              <MaterialIcons name="content-copy" size={24} color={DS.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Share Link</Text>
          <Text style={styles.referralLink}>{referralLink}</Text>
        </BlurView>

        <TouchableOpacity style={styles.ctaButton} onPress={onShare}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            <Text style={styles.ctaButtonText}>Invite Friends Now</Text>
            <MaterialIcons name="send" size={20} color={DS.white} style={styles.ctaIcon} />
          </LinearGradient>
        </TouchableOpacity>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <Text style={styles.cardTitle}>How it Works</Text>
          <View style={styles.stepItem}>
            <MaterialIcons name="looks-one" size={24} color={DS.pink} />
            <Text style={styles.stepText}>Share your unique referral code or link with friends.</Text>
          </View>
          <View style={styles.stepItem}>
            <MaterialIcons name="looks-two" size={24} color={DS.pink} />
            <Text style={styles.stepText}>Your friends sign up and book their first trip.</Text>
          </View>
          <View style={styles.stepItem}>
            <MaterialIcons name="looks-3" size={24} color={DS.pink} />
            <Text style={styles.stepText}>Both of you receive amazing travel credits!</Text>
          </View>
        </BlurView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 22,
    color: DS.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  cardText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  label: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
    color: DS.muted,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  referralCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: DS.surfaceHigh,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    width: '100%',
  },
  referralCode: {
    fontFamily: 'Chillax-Bold',
    fontSize: 20,
    color: DS.white,
  },
  referralLink: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.purple,
    textDecorationLine: 'underline',
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  ctaButton: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
  },
  gradientBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 10,
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
  },
  ctaIcon: {
    marginLeft: 5,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
    width: '100%',
  },
  stepText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.white,
    flex: 1,
  },
});

export default ReferScreen;
