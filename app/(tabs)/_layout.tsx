import { Tabs } from "expo-router";
import { Platform, View, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HapticTab } from "@/components/haptic-tab";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const T = {
  bg: "#120824",
  border: "rgba(123,68,230,0.2)",
  inactive: "rgba(255,255,255,0.35)",
  active: "#F94498",
  activeBg: "rgba(249,68,152,0.15)",
};

function TabIcon({ name, label, focused }: { name: string; label: string; focused: boolean }) {
  return (
    <View style={[styles.tabItem, focused && styles.tabItemActive]}>
      <MaterialIcons name={name as any} size={22} color={focused ? T.active : T.inactive} />
      <Text style={[styles.tabLabel, { color: focused ? T.active : T.inactive }]} numberOfLines={1}>
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
        tabBarActiveTintColor: T.active,
        tabBarInactiveTintColor: T.inactive,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          paddingTop: 6,
          paddingBottom: bottomPadding,
          height: tabBarHeight,
          backgroundColor: T.bg,
          borderTopWidth: 1,
          borderTopColor: T.border,
          elevation: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -6 },
          shadowOpacity: 0.2,
          shadowRadius: 16,
        },
      }}
    >
      {/* ── 5 visible tabs ── */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => <TabIcon name="home" label="Home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          title: "Trips",
          tabBarIcon: ({ focused }) => <TabIcon name="flight" label="Trips" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ focused }) => <TabIcon name="account-balance-wallet" label="Wallet" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }) => <TabIcon name="explore" label="Explore" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => <TabIcon name="person" label="Profile" focused={focused} />,
        }}
      />

      {/* ── All other screens hidden from tab bar ── */}
      <Tabs.Screen name="add-funds" options={{ href: null }} />
      <Tabs.Screen name="alerts" options={{ href: null }} />
      <Tabs.Screen name="badges-leaderboard" options={{ href: null }} />
      <Tabs.Screen name="competitors" options={{ href: null }} />
      <Tabs.Screen name="connecting" options={{ href: null }} />
      <Tabs.Screen name="destination-guide" options={{ href: null }} />
      <Tabs.Screen name="destination-swipe" options={{ href: null }} />
      <Tabs.Screen name="dna-evolution" options={{ href: null }} />
      <Tabs.Screen name="dna-management" options={{ href: null }} />
      <Tabs.Screen name="enterprise" options={{ href: null }} />
      <Tabs.Screen name="events" options={{ href: null }} />
      <Tabs.Screen name="help" options={{ href: null }} />
      <Tabs.Screen name="invite-partner" options={{ href: null }} />
      <Tabs.Screen name="kyc" options={{ href: null }} />
      <Tabs.Screen name="membership" options={{ href: null }} />
      <Tabs.Screen name="memory-hub" options={{ href: null }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />
      <Tabs.Screen name="plan-trip" options={{ href: null }} />
      <Tabs.Screen name="profile-edit" options={{ href: null }} />
      <Tabs.Screen name="property-detail" options={{ href: null }} />
      <Tabs.Screen name="prospects-crm" options={{ href: null }} />
      <Tabs.Screen name="real-estate" options={{ href: null }} />
      <Tabs.Screen name="real-estate-analysis" options={{ href: null }} />
      <Tabs.Screen name="real-estate-contacts" options={{ href: null }} />
      <Tabs.Screen name="real-estate-guide" options={{ href: null }} />
      <Tabs.Screen name="refer" options={{ href: null }} />
      <Tabs.Screen name="regulations-tracker" options={{ href: null }} />
      <Tabs.Screen name="revenue-dashboard" options={{ href: null }} />
      <Tabs.Screen name="rewards-portal" options={{ href: null }} />
      <Tabs.Screen name="search" options={{ href: null }} />
      <Tabs.Screen name="settings" options={{ href: null }} />
      <Tabs.Screen name="south-america-hub" options={{ href: null }} />
      <Tabs.Screen name="split-payment" options={{ href: null }} />
      <Tabs.Screen name="subscription" options={{ href: null }} />
      <Tabs.Screen name="support" options={{ href: null }} />
      <Tabs.Screen name="transaction-history" options={{ href: null }} />
      <Tabs.Screen name="trip-detail" options={{ href: null }} />
      <Tabs.Screen name="trip-hub" options={{ href: null }} />
      <Tabs.Screen name="wallet-exchange" options={{ href: null }} />
      <Tabs.Screen name="wallet-kyc" options={{ href: null }} />
      <Tabs.Screen name="wallet-withdraw" options={{ href: null }} />
      <Tabs.Screen name="wishlist" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    minWidth: 52,
  },
  tabItemActive: {
    backgroundColor: T.activeBg,
    paddingHorizontal: 16,
  },
  tabLabel: {
    fontSize: 10,
    fontFamily: "Satoshi-Medium",
    letterSpacing: 0.2,
  },
});
