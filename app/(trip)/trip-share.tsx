import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Assuming fonts are loaded and available globally or via a custom hook
// For demonstration, we'll define basic font styles.
const FontStyles = StyleSheet.create({
  chillaxBold: {
    fontFamily: 'Chillax-Bold',
    fontSize: 28,
    color: DS.white,
  },
  satoshiMedium: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.secondary,
  },
  satoshiRegular: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.white,
  },
});

const TripShareScreen = () => {
  const router = useRouter();
  const tripDetails = {
    title: 'Adventure in Bali',
    date: 'Oct 26 - Nov 02, 2024',
    imageUrl: 'https://picsum.photos/seed/bali/700/400',
    shareCode: 'TRVBALI2024',
  };

  const handleShare = () => {
    console.log('Share button pressed');
    // Implement actual sharing logic here
  };

  return (
    <ScreenWrapper title="Share Your Trip" scrollable={true}>
      <View style={styles.container}>
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <View style={styles.cardContent}>
            <Image source={{ uri: tripDetails.imageUrl }} style={styles.tripImage} />
            <Text style={[FontStyles.chillaxBold, styles.tripTitle]}>{tripDetails.title}</Text>
            <Text style={[FontStyles.satoshiMedium, styles.tripDate]}>{tripDetails.date}</Text>

            <View style={styles.shareCodeContainer}>
              <Text style={FontStyles.satoshiRegular}>Share Code:</Text>
              <Text style={[FontStyles.chillaxBold, styles.codeText]}>{tripDetails.shareCode}</Text>
              <TouchableOpacity onPress={() => console.log('Copy code')}>
                <MaterialIcons name="content-copy" size={20} color={DS.white} />
              </TouchableOpacity>
            </View>

            <LinearGradient
              colors={[DS.purple, DS.pink] as const}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.shareButtonGradient}
            >
              <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
                <MaterialIcons name="share" size={20} color={DS.white} />
                <Text style={[FontStyles.satoshiMedium, styles.shareButtonText]}>Share Now</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </BlurView>

        <View style={styles.socialShareContainer}>
          <Text style={[FontStyles.satoshiMedium, styles.socialShareTitle]}>Share via Social Media</Text>
          <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.socialIcon}>
              <MaterialIcons name="facebook" size={30} color={DS.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <MaterialIcons name="chat" size={30} color={DS.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <MaterialIcons name="mail" size={30} color={DS.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <MaterialIcons name="more-horiz" size={30} color={DS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 400,
    padding: 20,
    marginBottom: 30,
  },
  cardContent: {
    alignItems: 'center',
  },
  tripImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  tripTitle: {
    marginBottom: 5,
    textAlign: 'center',
  },
  tripDate: {
    marginBottom: 20,
    textAlign: 'center',
  },
  shareCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DS.surfaceHigh,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  codeText: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 18,
  },
  shareButtonGradient: {
    borderRadius: 10,
    width: '100%',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  shareButtonText: {
    marginLeft: 10,
    color: DS.white,
    fontSize: 18,
  },
  socialShareContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  socialShareTitle: {
    marginBottom: 15,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  socialIcon: {
    padding: 10,
    backgroundColor: DS.surface,
    borderRadius: 10,
  },
});

export default TripShareScreen;
