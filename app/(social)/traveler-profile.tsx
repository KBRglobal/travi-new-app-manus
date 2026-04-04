import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper'; // Assuming DS is exported from ScreenWrapper
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const TravelerProfile = () => {
  const router = useRouter();
  // Dummy data for demonstration
  const traveler = {
    name: 'Alex Johnson',
    location: 'San Francisco, CA',
    profilePicture: 'https://via.placeholder.com/150/6443F4/FFFFFF?text=AJ',
    bio: 'Passionate explorer and digital nomad. Love discovering hidden gems and sharing travel stories. Always looking for the next adventure!',
    tripsCompleted: 25,
    countriesVisited: 15,
    reviewsGiven: 42,
  };

  const handleEditProfile = () => {
    router.push('/(social)/compatibility' as any);
  };

  const handleShareProfile = () => {
    router.push('/(social)/message-chat' as any);
  };

  return (
    <ScreenWrapper title="Traveler Profile" scrollable={true}>
      <View style={styles.container}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: traveler.profilePicture }} style={styles.profileImage} />
          <Text style={styles.travelerName}>{traveler.name}</Text>
          <View style={styles.locationContainer}>
            <MaterialIcons name="location-on" size={16} color={DS.muted} />
            <Text style={styles.travelerLocation}>{traveler.location}</Text>
          </View>
        </View>

        {/* Stats Section - Glass Card */}
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{traveler.tripsCompleted}</Text>
              <Text style={styles.statLabel}>Trips</Text>
            </View>
            <View style={styles.statSeparator} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{traveler.countriesVisited}</Text>
              <Text style={styles.statLabel}>Countries</Text>
            </View>
            <View style={styles.statSeparator} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{traveler.reviewsGiven}</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
          </View>
        </BlurView>

        {/* About Me Section - Glass Card */}
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.bioText}>{traveler.bio}</Text>
        </BlurView>

        {/* Action Buttons */}
        <TouchableOpacity onPress={handleEditProfile} style={styles.ctaButton}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <MaterialIcons name="edit" size={20} color={DS.white} />
            <Text style={styles.ctaButtonText}>Edit Profile</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleShareProfile} style={styles.ctaButton}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <MaterialIcons name="share" size={20} color={DS.white} />
            <Text style={styles.ctaButtonText}>Share Profile</Text>
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
    backgroundColor: DS.bg, // ScreenWrapper handles this, but good to have for consistency
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: DS.purple,
    marginBottom: 15,
  },
  travelerName: {
    fontFamily: 'Chillax-Bold',
    fontSize: 28,
    color: DS.white,
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  travelerLocation: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
    marginLeft: 5,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Chillax-Bold',
    fontSize: 24,
    color: DS.white,
  },
  statLabel: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
    color: DS.muted,
    marginTop: 4,
  },
  statSeparator: {
    width: 1,
    height: '80%',
    backgroundColor: DS.borderStrong,
  },
  sectionTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 20,
    color: DS.white,
    marginBottom: 10,
  },
  bioText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.secondary,
    lineHeight: 24,
  },
  ctaButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
    marginLeft: 10,
  },
});

export default TravelerProfile;
