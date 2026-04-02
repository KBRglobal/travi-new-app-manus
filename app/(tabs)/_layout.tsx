import { Tabs } from "expo-router";
import { Platform, View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { LinearGradient } from "expo-linear-gradient";

function TabBarBackground() {
  return (
    <View style={StyleSheet.absoluteFillObject}>
      <LinearGradient
        colors={["rgba(4,0,16,0.95)", "rgba(10,5,32,0.98)"]}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.tabBorder} />
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);
  const tabBarHeight = 60 + bottomPadding;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#C084FC",
        tabBarInactiveTintColor: "rgba(255,255,255,0.3)",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => <TabBarBackground />,
        tabBarStyle: {
          position: "absolute",
          paddingTop: 10,
          paddingBottom: bottomPadding,
          height: tabBarHeight,
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              {focused && <View style={styles.iconGlow} />}
              <IconSymbol size={22} name="house.fill" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              {focused && <View style={styles.iconGlow} />}
              <IconSymbol size={22} name="safari.fill" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          title: "Trips",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              {focused && <View style={styles.iconGlow} />}
              <IconSymbol size={22} name="airplane" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              {focused && <View style={styles.iconGlow} />}
              <IconSymbol size={22} name="wallet.pass.fill" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              {focused && <View style={styles.iconGlow} />}
              <IconSymbol size={22} name="person.fill" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: "Price Alerts",
          href: null,
        }}
      />
      <Tabs.Screen
        name="connecting"
        options={{
          title: "Connecting",
          href: null,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          href: null,
        }}
      />
      <Tabs.Screen
        name="subscription"
        options={{
          title: "Subscription",
          href: null,
        }}
      />
      <Tabs.Screen
        name="refer"
        options={{
          title: "Refer & Earn",
          href: null,
        }}
      />
      <Tabs.Screen
        name="destination-guide"
        options={{
          title: "Destination Guide",
          href: null,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          href: null,
        }}
      />
      <Tabs.Screen
        name="real-estate"
        options={{
          title: "Real Estate",
          href: null,
        }}
      />
      <Tabs.Screen
        name="enterprise"
        options={{
          title: "Enterprise",
          href: null,
        }}
      />
      <Tabs.Screen
        name="support"
        options={{
          title: "Support",
          href: null,
        }}
      />
      <Tabs.Screen
        name="trip-detail"
        options={{
          title: "Trip Detail",
          href: null,
        }}
      />
      <Tabs.Screen
        name="trip-hub"
        options={{
          title: "Trip Hub",
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(192,132,252,0.15)",
  },
  iconWrap: {
    width: 40,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  iconWrapActive: {
    backgroundColor: "rgba(192,132,252,0.12)",
  },
  iconGlow: {
    position: "absolute",
    width: 40,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(192,132,252,0.08)",
    shadowColor: "#C084FC",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
});
