
import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming @expo/vector-icons is available for MaterialIcons
import { ScreenWrapper, DS } from '@/components/screen-wrapper'; // Assuming this path and export

// Custom Text components for typography
const ChillaxBold = (props: any) => <Text style={{ fontFamily: 'Chillax-Bold', color: DS.white, ...props.style }}>{props.children}</Text>;
const SatoshiMedium = (props: any) => <Text style={{ fontFamily: 'Satoshi-Medium', color: DS.white, ...props.style }}>{props.children}</Text>;
const SatoshiRegular = (props: any) => <Text style={{ fontFamily: 'Satoshi-Regular', color: DS.white, ...props.style }}>{props.children}</Text>;

const CommunityScreen = () => {
  const router = useRouter();
  return (
    <ScreenWrapper title="Community" scrollable={true}>
      <View style={styles.container}>
        {/* Section 1: Welcome and Description */}
        <View style={styles.section}>
          <ChillaxBold style={styles.sectionTitle}>Welcome to the TRAVI Community!</ChillaxBold>
          <SatoshiRegular style={styles.sectionDescription}>
            Connect with fellow travelers, share your experiences, and discover new adventures.
            This is your hub for all things travel. Let's explore the world together!
          </SatoshiRegular>
        </View>

        {/* Section 2: Quick Actions/Glass Cards */}
        <View style={styles.section}>
          <SatoshiMedium style={styles.sectionHeader}>Quick Actions</SatoshiMedium>
          <View style={styles.cardRow}>
            <BlurView intensity={20} tint="dark" style={styles.glassCard}>
              <TouchableOpacity style={styles.cardContent} onPress={() => router.push('/(social)/traveler-profile' as any)}>
                <MaterialIcons name="group" size={30} color={DS.purple} />
                <SatoshiMedium style={styles.cardTitle}>Find Groups</SatoshiMedium>
                <SatoshiRegular style={styles.cardDescription}>Join discussions & meetups</SatoshiRegular>
              </TouchableOpacity>
            </BlurView>
            <BlurView intensity={20} tint="dark" style={styles.glassCard}>
              <TouchableOpacity style={styles.cardContent}>
                <MaterialIcons name="event" size={30} color={DS.pink} />
                <SatoshiMedium style={styles.cardTitle}>Events</SatoshiMedium>
                <SatoshiRegular style={styles.cardDescription}>Discover upcoming events</SatoshiRegular>
              </TouchableOpacity>
            </BlurView>
          </View>
          <View style={styles.cardRow}>
            <BlurView intensity={20} tint="dark" style={styles.glassCard}>
              <TouchableOpacity style={styles.cardContent}>
                <MaterialIcons name="chat" size={30} color={DS.success} />
                <SatoshiMedium style={styles.cardTitle}>Chat</SatoshiMedium>
                <SatoshiRegular style={styles.cardDescription}>Instant messaging</SatoshiRegular>
              </TouchableOpacity>
            </BlurView>
            <BlurView intensity={20} tint="dark" style={styles.glassCard}>
              <TouchableOpacity style={styles.cardContent}>
                <MaterialIcons name="photo-library" size={30} color={DS.warning} />
                <SatoshiMedium style={styles.cardTitle}>Gallery</SatoshiMedium>
                <SatoshiRegular style={styles.cardDescription}>Share your travel photos</SatoshiRegular>
              </TouchableOpacity>
            </BlurView>
          </View>
        </View>

        {/* Section 3: Call to Action */}
        <View style={styles.section}>
          <SatoshiMedium style={styles.sectionHeader}>Ready to Connect?</SatoshiMedium>
          <TouchableOpacity style={styles.ctaButton} onPress={() => router.push('/(social)/discover' as any)}>
            <LinearGradient
              colors={[DS.purple, DS.pink] as const}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBackground}
            >
              <SatoshiMedium style={styles.ctaButtonText}>Start a New Discussion</SatoshiMedium>
              <MaterialIcons name="arrow-forward" size={20} color={DS.white} style={{ marginLeft: 10 }} />
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
    backgroundColor: DS.bg, // Ensure background is set if ScreenWrapper doesn't cover it fully or for inner views
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 28,
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: DS.muted,
    lineHeight: 24,
  },
  sectionHeader: {
    fontSize: 20,
    marginBottom: 15,
    color: DS.white,
    textAlign: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  glassCard: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 15,
    alignItems: 'center',
  },
  cardContent: {
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
    color: DS.white,
  },
  cardDescription: {
    fontSize: 12,
    color: DS.muted,
    textAlign: 'center',
  },
  ctaButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
  },
  gradientBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  ctaButtonText: {
    fontSize: 18,
    color: DS.white,
  },
});

export default CommunityScreen;
