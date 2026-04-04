import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { ScreenWrapper, DS } from "@/components/screen-wrapper";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

export default function NotificationsScreen() {
  const router = useRouter();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [promoEnabled, setPromoEnabled] = useState(false);

  return (
    <ScreenWrapper title="Notifications" scrollable={true}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="notifications-active" size={24} color={DS.purple} />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Push Notifications</Text>
                <Text style={styles.settingDescription}>Receive alerts on your device</Text>
              </View>
            </View>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              trackColor={{ false: DS.muted, true: DS.purple }}
              thumbColor={DS.white}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="email" size={24} color={DS.pink} />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Email Updates</Text>
                <Text style={styles.settingDescription}>Weekly summaries and news</Text>
              </View>
            </View>
            <Switch
              value={emailEnabled}
              onValueChange={setEmailEnabled}
              trackColor={{ false: DS.muted, true: DS.purple }}
              thumbColor={DS.white}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="sms" size={24} color={DS.info} />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>SMS Alerts</Text>
                <Text style={styles.settingDescription}>Important security alerts</Text>
              </View>
            </View>
            <Switch
              value={smsEnabled}
              onValueChange={setSmsEnabled}
              trackColor={{ false: DS.muted, true: DS.purple }}
              thumbColor={DS.white}
            />
          </View>
        </BlurView>

        <Text style={styles.sectionTitle}>Marketing</Text>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="local-offer" size={24} color={DS.warning} />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Promotions</Text>
                <Text style={styles.settingDescription}>Special offers and discounts</Text>
              </View>
            </View>
            <Switch
              value={promoEnabled}
              onValueChange={setPromoEnabled}
              trackColor={{ false: DS.muted, true: DS.purple }}
              thumbColor={DS.white}
            />
          </View>
        </BlurView>

        <TouchableOpacity style={styles.saveButtonContainer} activeOpacity={0.8} onPress={() => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); router.back(); }}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.saveButton}
          >
            <Text style={styles.saveButtonText}>Save Preferences</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontFamily: "Chillax-Bold",
    fontSize: 20,
    color: DS.white,
    marginTop: 24,
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: "hidden",
    padding: 16,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  settingTitle: {
    fontFamily: "Satoshi-Medium",
    fontSize: 16,
    color: DS.white,
    marginBottom: 4,
  },
  settingDescription: {
    fontFamily: "Satoshi-Regular",
    fontSize: 14,
    color: DS.muted,
  },
  divider: {
    height: 1,
    backgroundColor: DS.border,
    marginVertical: 12,
  },
  saveButtonContainer: {
    marginTop: 40,
    borderRadius: 16,
    overflow: "hidden",
  },
  saveButton: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    fontFamily: "Satoshi-Medium",
    fontSize: 16,
    color: DS.white,
  },
});