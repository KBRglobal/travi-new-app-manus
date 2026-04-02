import { Tabs } from "expo-router";
import { Platform, View, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { LinearGradient } from "expo-linear-gradient";

function TabBarBackground() {
  return (
    <View style={StyleSheet.absoluteFillObject}>
      <LinearGradient
        colors={["rgba(4,0,20,0.97)", "rgba(8,4,28,0.99)"]}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.tabBorder} />
    </View>
  );
}

interface TabIconProps {
  icon: React.ComponentProps<typeof IconSymbol>["name"];
  label: string;
  color: string;
  focused: boolean;
}

function TabIcon({ icon, label, color, focused }: TabIconProps) {
  return (
    <View style={styles.tabItem}>
      <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
        {focused && <View style={styles.iconGlow} />}
        <IconSymbol size={22} name={icon} color={color} />
      </View>
      <Text style={[styles.tabLabel, { color }]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);
  const tabBarHeight = 64 + bottomPadding;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#C084FC",
        tabBarInactiveTintColor: "rgba(255,255,255,0.35)",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => <TabBarBackground />,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          paddingTop: 0,
          paddingBottom: bottomPadding,
          height: tabBarHeight,
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      {/* ── 1. Home ── */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="house.fill" label="Home" color={color} focused={focused} />
          ),
        }}
      />

      {/* ── 2. Explore ── */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="safari.fill" label="Explore" color={color} focused={focused} />
          ),
        }}
      />

      {/* ── 3. Trips ── */}
      <Tabs.Screen
        name="trips"
        options={{
          title: "Trips",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="airplane" label="Trips" color={color} focused={focused} />
          ),
        }}
      />

      {/* ── 4. Community ── */}
      <Tabs.Screen
        name="connecting"
        options={{
          title: "Community",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="person.2.fill" label="Community" color={color} focused={focused} />
          ),
        }}
      />

      {/* ── 5. Profile ── */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="person.fill" label="Profile" color={color} focused={focused} />
          ),
        }}
      />

      {/* ── Hidden screens (accessible via navigation, not tab bar) ── */}
      <Tabs.Screen name="wallet" options={{ href: null }} />
      <Tabs.Screen name="alerts" options={{ href: null }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />
      <Tabs.Screen name="subscription" options={{ href: null }} />
      <Tabs.Screen name="refer" options={{ href: null }} />
      <Tabs.Screen name="destination-guide" options={{ href: null }} />
      <Tabs.Screen name="events" options={{ href: null }} />
      <Tabs.Screen name="real-estate" options={{ href: null }} />
      <Tabs.Screen name="enterprise" options={{ href: null }} />
      <Tabs.Screen name="support" options={{ href: null }} />
      <Tabs.Screen name="trip-detail" options={{ href: null }} />
      <Tabs.Screen name="trip-hub" options={{ href: null }} />
      <Tabs.Screen name="destination-swipe" options={{ href: null }} />
      <Tabs.Screen name="dna-evolution" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 0.5,
    backgroundColor: "rgba(192,132,252,0.2)",
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    paddingTop: 10,
  },
  iconWrap: {
    width: 44,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
  },
  iconWrapActive: {
    backgroundColor: "rgba(192,132,252,0.14)",
  },
  iconGlow: {
    position: "absolute",
    width: 44,
    height: 36,
    borderRadius: 14,
    backgroundColor: "rgba(192,132,252,0.06)",
    shadowColor: "#C084FC",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
});
