import { Tabs } from "expo-router";
import { Platform, View, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

function TabBarBackground() {
  return (
    <View style={StyleSheet.absoluteFillObject}>
      {Platform.OS === "ios" ? (
        <BlurView intensity={25} tint="dark" style={StyleSheet.absoluteFillObject} />
      ) : (
        <LinearGradient
          colors={["rgba(4,0,20,0.97)", "rgba(8,4,28,0.99)"]}
          style={StyleSheet.absoluteFillObject}
        />
      )}
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
        tabBarInactiveTintColor: "rgba(255,255,255,0.55)",
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

      {/* ── 4. Profile ── */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="person.fill" label="Profile" color={color} focused={focused} />
          ),
        }}
      />

      {/* ── All other screens — hidden from tab bar, accessible via router.push() ── */}

      {/* Community */}
      <Tabs.Screen name="connecting" options={{ href: null }} />

      {/* Wallet */}
      <Tabs.Screen name="wallet" options={{ href: null }} />
      <Tabs.Screen name="wallet-kyc" options={{ href: null }} />
      <Tabs.Screen name="wallet-withdraw" options={{ href: null }} />
      <Tabs.Screen name="wallet-exchange" options={{ href: null }} />

      {/* Notifications & Alerts */}
      <Tabs.Screen name="alerts" options={{ href: null }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />

      {/* Premium & Referral */}
      <Tabs.Screen name="subscription" options={{ href: null }} />
      <Tabs.Screen name="refer" options={{ href: null }} />

      {/* Destination & Travel */}
      <Tabs.Screen name="destination-guide" options={{ href: null }} />
      <Tabs.Screen name="destination-swipe" options={{ href: null }} />
      <Tabs.Screen name="events" options={{ href: null }} />

      {/* Real Estate */}
      <Tabs.Screen name="real-estate" options={{ href: null }} />
      <Tabs.Screen name="real-estate-analysis" options={{ href: null }} />
      <Tabs.Screen name="real-estate-contacts" options={{ href: null }} />
      <Tabs.Screen name="real-estate-guide" options={{ href: null }} />
      <Tabs.Screen name="property-detail" options={{ href: null }} />
      <Tabs.Screen name="south-america-hub" options={{ href: null }} />

      {/* B2B */}
      <Tabs.Screen name="enterprise" options={{ href: null }} />
      <Tabs.Screen name="prospects-crm" options={{ href: null }} />

      {/* Support */}
      <Tabs.Screen name="support" options={{ href: null }} />

      {/* Trip screens */}
      <Tabs.Screen name="trip-detail" options={{ href: null }} />
      <Tabs.Screen name="trip-hub" options={{ href: null }} />

      {/* DNA & Gamification */}
      <Tabs.Screen name="dna-evolution" options={{ href: null }} />
      <Tabs.Screen name="badges-leaderboard" options={{ href: null }} />
      <Tabs.Screen name="memory-hub" options={{ href: null }} />
      <Tabs.Screen name="rewards-portal" options={{ href: null }} />
      <Tabs.Screen name="avatar-customization" options={{ href: null }} />
      <Tabs.Screen name="mini-games" options={{ href: null }} />

      {/* Wishlist & Social */}
      <Tabs.Screen name="wishlist" options={{ href: null }} />
      <Tabs.Screen name="invite-partner" options={{ href: null }} />

      {/* B2B Analytics (added by Manus — must be hidden) */}
      <Tabs.Screen name="competitors" options={{ href: null }} />
      <Tabs.Screen name="revenue-dashboard" options={{ href: null }} />
      <Tabs.Screen name="regulations-tracker" options={{ href: null }} />
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
