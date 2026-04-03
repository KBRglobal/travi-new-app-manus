import { Tabs } from "expo-router";
import { Platform, View, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";

// Neutral wireframe colors
const N = {
  bg:       "#111111",
  border:   "rgba(255,255,255,0.10)",
  inactive: "rgba(255,255,255,0.40)",
  active:   "#007AFF",
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
      <IconSymbol size={22} name={icon} color={focused ? N.active : N.inactive} />
      <Text style={[styles.tabLabel, { color: focused ? N.active : N.inactive }]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);
  const tabBarHeight = 56 + bottomPadding;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: N.active,
        tabBarInactiveTintColor: N.inactive,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          paddingTop: 0,
          paddingBottom: bottomPadding,
          height: tabBarHeight,
          backgroundColor: N.bg,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: N.border,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="house.fill" label="Home" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          title: "Trips",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="airplane" label="Trips" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="wallet.pass.fill" label="Wallet" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="safari.fill" label="Explore" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="person.fill" label="Profile" color={color} focused={focused} />
          ),
        }}
      />

      {/* Hidden screens */}
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
    gap: 3,
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: "500",
  },
});
