import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const PrivacySecurityScreen = () => {
  const [faceIdEnabled, setFaceIdEnabled] = React.useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(true);
  const [locationSharing, setLocationSharing] = React.useState(false);

  return (
    <ScreenWrapper title="Privacy & Security" scrollable={true}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <View style={styles.row}>
            <MaterialIcons name="face" size={24} color={DS.white} />
            <Text style={styles.rowText}>Enable Face ID</Text>
            <Switch
              trackColor={{ false: DS.muted, true: DS.purple }}
              thumbColor={DS.white}
              ios_backgroundColor={DS.muted}
              onValueChange={setFaceIdEnabled}
              value={faceIdEnabled}
            />
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <MaterialIcons name="security" size={24} color={DS.white} />
            <Text style={styles.rowText}>Two-Factor Authentication</Text>
            <Switch
              trackColor={{ false: DS.muted, true: DS.purple }}
              thumbColor={DS.white}
              ios_backgroundColor={DS.muted}
              onValueChange={setTwoFactorEnabled}
              value={twoFactorEnabled}
            />
          </View>
        </BlurView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy</Text>
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <View style={styles.row}>
            <MaterialIcons name="location-on" size={24} color={DS.white} />
            <Text style={styles.rowText}>Location Sharing</Text>
            <Switch
              trackColor={{ false: DS.muted, true: DS.purple }}
              thumbColor={DS.white}
              ios_backgroundColor={DS.muted}
              onValueChange={setLocationSharing}
              value={locationSharing}
            />
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <MaterialIcons name="data-usage" size={24} color={DS.white} />
            <Text style={styles.rowText}>Personal Data Management</Text>
            <MaterialIcons name="chevron-right" size={24} color={DS.muted} />
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <MaterialIcons name="policy" size={24} color={DS.white} />
            <Text style={styles.rowText}>Privacy Policy</Text>
            <MaterialIcons name="chevron-right" size={24} color={DS.muted} />
          </View>
        </BlurView>
      </View>

      <View style={styles.section}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.85}>
        <LinearGradient
          colors={[DS.purple, DS.pink] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.ctaButton}
        >
          <Text style={styles.ctaButtonText}>Save Changes</Text>
        </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 20,
    color: DS.white,
    marginBottom: 15,
    marginLeft: 10,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  rowText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
    flex: 1,
    marginLeft: 15,
  },
  separator: {
    height: 1,
    backgroundColor: DS.border,
    marginLeft: 40, // Align with text
  },
  ctaButton: {
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 10,
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
  },
});

export default PrivacySecurityScreen;
