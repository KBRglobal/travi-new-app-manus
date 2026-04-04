import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

// Assuming these fonts are loaded and available globally or via a custom font loader
// For this example, we'll just define the font families.
const fontFamilies = {
  ChillaxBold: 'Chillax-Bold',
  SatoshiMedium: 'Satoshi-Medium',
  SatoshiRegular: 'Satoshi-Regular',
};

const BadgesLeaderboardScreen = () => {
  const router = useRouter();
  const userRank = {
    position: 1,
    name: 'You',
    points: 1250,
    badges: 15,
  };

  const leaderboardData = [
    { position: 1, name: 'Alice', points: 1500, badges: 20 },
    { position: 2, name: 'Bob', points: 1400, badges: 18 },
    { position: 3, name: 'Charlie', points: 1350, badges: 17 },
    { position: 4, name: 'David', points: 1200, badges: 14 },
    { position: 5, name: 'Eve', points: 1100, badges: 12 },
  ];

  return (
    <ScreenWrapper title="Badges Leaderboard" scrollable={true}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Rank</Text>
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.rankItem}>
            <Text style={styles.rankPosition}>{userRank.position}</Text>
            <View style={styles.rankInfo}>
              <Text style={styles.rankName}>{userRank.name}</Text>
              <Text style={styles.rankDetails}>{userRank.points} Points | {userRank.badges} Badges</Text>
            </View>
            <MaterialIcons name="star" size={24} color={DS.warning} />
          </View>
        </BlurView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Players</Text>
        {leaderboardData.map((player, index) => (
          <BlurView key={index} intensity={20} tint="dark" style={styles.glassCardMargin}>
            <View style={styles.rankItem}>
              <Text style={styles.rankPosition}>{player.position}</Text>
              <View style={styles.rankInfo}>
                <Text style={styles.rankName}>{player.name}</Text>
                <Text style={styles.rankDetails}>{player.points} Points | {player.badges} Badges</Text>
              </View>
              {player.position <= 3 && <MaterialIcons name="emoji-events" size={24} color={DS.purple} />}
            </View>
          </BlurView>
        ))}
      </View>

      <TouchableOpacity activeOpacity={0.8} style={styles.ctaButtonContainer}>
        <LinearGradient
          colors={[DS.purple, DS.pink] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.ctaButton}
        >
          <Text style={styles.ctaButtonText}>View My Badges</Text>
          <MaterialIcons name="arrow-forward" size={20} color={DS.white} style={{ marginLeft: 8 }} />
        </LinearGradient>
      </TouchableOpacity>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: fontFamilies.ChillaxBold,
    fontSize: 22,
    color: DS.white,
    marginBottom: 15,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 15,
  },
  glassCardMargin: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 15,
    marginBottom: 10,
  },
  rankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rankPosition: {
    fontFamily: fontFamilies.ChillaxBold,
    fontSize: 28,
    color: DS.purple,
    marginRight: 15,
    width: 40,
    textAlign: 'center',
  },
  rankInfo: {
    flex: 1,
  },
  rankName: {
    fontFamily: fontFamilies.SatoshiMedium,
    fontSize: 18,
    color: DS.white,
  },
  rankDetails: {
    fontFamily: fontFamilies.SatoshiRegular,
    fontSize: 14,
    color: DS.muted,
    marginTop: 2,
  },
  ctaButtonContainer: {
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  ctaButtonText: {
    fontFamily: fontFamilies.SatoshiMedium,
    fontSize: 18,
    color: DS.white,
  },
});

export default BadgesLeaderboardScreen;
