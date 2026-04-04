import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TripSettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationShared, setLocationShared] = useState(false);

  return (
    <ScreenWrapper title="Trip Settings" scrollable={true}>
      <View style={styles.cardContainer}>
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <MaterialIcons name="notifications" size={24} color={DS.white} />
              <Text style={styles.settingLabel}>Enable Notifications</Text>
            </View>
            <Switch
              trackColor={{ false: DS.muted, true: DS.purple }}
              thumbColor={DS.white}
              ios_backgroundColor={DS.muted}
              onValueChange={setNotificationsEnabled}
              value={notificationsEnabled}
            />
          </View>
          <View style={styles.separator} />
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <MaterialIcons name="location-on" size={24} color={DS.white} />
              <Text style={styles.settingLabel}>Share Location</Text>
            </View>
            <Switch
              trackColor={{ false: DS.muted, true: DS.purple }}
              thumbColor={DS.white}
              ios_backgroundColor={DS.muted}
              onValueChange={setLocationShared}
              value={locationShared}
            />
          </View>
        </BlurView>
      </View>

      <TouchableOpacity style={styles.ctaButton}>
        <LinearGradient
          colors={[DS.purple, DS.pink] as const}
          style={styles.gradientButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.ctaButtonText}>Save Settings</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  settingLabel: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
  },
  separator: {
    height: 1,
    backgroundColor: DS.borderStrong,
    marginVertical: 10,
  },
  ctaButton: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 20,
  },
  gradientButton: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
  },
});
