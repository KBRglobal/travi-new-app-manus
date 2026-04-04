import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const ConnectingScreen = () => {
  return (
    <ScreenWrapper title="Connecting" scrollable={true}>
      <View style={styles.contentContainer}>
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <ActivityIndicator size="large" color={DS.purple} />
          <Text style={styles.title}>Establishing Connection</Text>
          <Text style={styles.body}>Please wait while we connect you to your travel plan.</Text>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaButton}
          >
            <Text style={styles.ctaButtonText}>Cancel Connection</Text>
            <MaterialIcons name="cancel" size={20} color={DS.white} style={styles.icon} />
          </LinearGradient>
        </BlurView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 30,
    alignItems: 'center',
    width: '90%',
    maxWidth: 400,
  },
  title: {
    fontFamily: 'Chillax-Bold',
    fontSize: 24,
    color: DS.white,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  body: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
    textAlign: 'center',
    marginBottom: 30,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
    marginRight: 8,
  },
  icon: {
    marginLeft: 5,
  },
});

export default ConnectingScreen;
