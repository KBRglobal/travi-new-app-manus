import { Tabs } from "expo-router";
import { Platform, View, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";

// TRAVI Brand Colors — dark theme
const BRAND = {
  purple:      "#6443F4",
  pink:        "#F94498",
  white:       "#FFFFFF",
  tabBg:       "#1A0D3D",
  tabInactive: "rgba(255,255,255,0.40)",
  tabActive:   "#F94498",
  tabBorder:   "rgba(255,255,255,0.08)",
};

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
        <IconSymbol size={22} name={icon} color={focused ? BRAND.pink : BRAND.tabInactive} />
      </View>
      <Text style={[styles.tabLabel, { color: focused ? BRAND.pink : BRAND.tabInactive }]} numberOfLines={1}>
        {label}
      </Text>
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
        tabBarActiveTintColor: BRAND.pink,
        tabBarInactiveTintColor: BRAND.tabInactive,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          paddingTop: 0,
          paddingBottom: bottomPadding,
          height: tabBarHeight,
          backgroundColor: BRAND.tabBg,
          borderTopWidth: 0.5,
          borderTopColor: BRAND.tabBorder,
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

      {/* ── 2. Trips ── */}
      <Tabs.Screen
        name="trips"
        options={{
          title: "Trips",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="airplane" label="Trips" color={color} focused={focused} />
          ),
        }}
      />

      {/* ── 3. Wallet ── */}
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="wallet.pass.fill" label="Wallet" color={color} focused={focused} />
          ),
        }}
      />

      {/* ── 4. Explore ── */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="safari.fill" label="Explore" color={color} focused={focused} />
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

      {/* ── All other screens — hidden from tab bar ── */}
      <Tabs.Screen name="alerts" options={{ href: null }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />
      <Tabs.Screen name="subscription" options={{ href: null }} />
      <Tabs.Screen name="refer" options={{ href: null }} />
      <Tabs.Screen name="destination-guide" options={{ href: null }} />
      <Tabs.Screen name="destination-swipe" options={{ href: null }} />
      <Tabs.Screen name="events" options={{ href: null }} />
      <Tabs.Screen name="real-estate" options={{ href: null }} />
      <Tabs.Screen name="real-estate-analysis" options={{ href: null }} />
      <Tabs.Screen name="real-estate-contacts" options={{ href: null }} />
      <Tabs.Screen name="real-estate-guide" options={{ href: null }} />
      <Tabs.Screen name="property-detail" options={{ href: null }} />
      <Tabs.Screen name="south-america-hub" options={{ href: null }} />
      <Tabs.Screen name="enterprise" options={{ href: null }} />
      <Tabs.Screen name="prospects-crm" options={{ href: null }} />
      <Tabs.Screen name="support" options={{ href: null }} />
      <Tabs.Screen name="trip-detail" options={{ href: null }} />
      <Tabs.Screen name="trip-hub" options={{ href: null }} />
      <Tabs.Screen name="dna-evolution" options={{ href: null }} />
      <Tabs.Screen name="badges-leaderboard" options={{ href: null }} />
      <Tabs.Screen name="memory-hub" options={{ href: null }} />
      <Tabs.Screen name="rewards-portal" options={{ href: null }} />
      <Tabs.Screen name="avatar-customization" options={{ href: null }} />
      <Tabs.Screen name="mini-games" options={{ href: null }} />
      <Tabs.Screen name="wishlist" options={{ href: null }} />
      <Tabs.Screen name="invite-partner" options={{ href: null }} />
      <Tabs.Screen name="competitors" options={{ href: null }} />
      <Tabs.Screen name="revenue-dashboard" options={{ href: null }} />
      <Tabs.Screen name="regulations-tracker" options={{ href: null }} />
      <Tabs.Screen name="connecting" options={{ href: null }} />
      <Tabs.Screen name="wallet-kyc" options={{ href: null }} />
      <Tabs.Screen name="wallet-withdraw" options={{ href: null }} />
      <Tabs.Screen name="wallet-exchange" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    paddingTop: 8,
  },
  iconWrap: {
    width: 40,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  iconWrapActive: {
    backgroundColor: "rgba(249,68,152,0.15)",
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.1,
    fontFamily: "Satoshi-Medium",
  },
});
