import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { useRouter } from 'expo-router';

const EarnGuideScreen = () => {
  const router = useRouter();
  return (
    <ScreenWrapper title="Earn Points Guide" scrollable={true}>
      <View style={styles.container}>
        <Text style={styles.header}>How to Earn TRAVI Points</Text>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <MaterialIcons name="star" size={24} color={DS.purple} style={styles.icon} />
          <Text style={styles.cardTitle}>Complete Challenges</Text>
          <Text style={styles.cardDescription}>Participate in daily and weekly challenges to earn bonus points. Check the 'Challenges' section for more details.</Text>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <MaterialIcons name="flight" size={24} color={DS.pink} style={styles.icon} />
          <Text style={styles.cardTitle}>Book Travel</Text>
          <Text style={styles.cardDescription}>Earn points for every flight, hotel, and activity booking made through TRAVI. The more you travel, the more you earn!</Text>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <MaterialIcons name="group" size={24} color={DS.success} style={styles.icon} />
          <Text style={styles.cardTitle}>Refer Friends</Text>
          <Text style={styles.cardDescription}>Invite your friends to TRAVI and earn points when they make their first booking. Sharing is caring, and rewarding!</Text>
        </BlurView>

        <View style={styles.ctaContainer}>
          <TouchableOpacity onPress={() => router.push('/(trip)/plan' as any)} activeOpacity={0.85}>
            <LinearGradient
              colors={[DS.purple, DS.pink] as const}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.ctaButton}
            >
              <Text style={styles.ctaButtonText}>Start Earning Now</Text>
              <MaterialIcons name="arrow-forward" size={20} color={DS.white} />
            </LinearGradient>
          </TouchableOpacity>
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
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  cardTitle: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
    flex: 1,
  },
  cardDescription: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.muted,
    marginTop: 5,
    marginLeft: 39, // To align with cardTitle after icon
  },
  ctaContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '80%',
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
    marginRight: 10,
  },
});

export default EarnGuideScreen;
