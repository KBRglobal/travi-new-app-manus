import { Tabs } from "expo-router";
import { Platform, View, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HapticTab } from "@/components/haptic-tab";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Brand colors matching Home Dashboard
const TAB_COLORS = {
  bg: "#1A0B2E",
  border: "rgba(100,67,244,0.15)",
  inactive: "rgba(211,207,216,0.45)",
  active: "#6443F4",
};

interface TabIconProps {
  icon: string;
  label: string;
  focused: boolean;
}

function TabIcon({ icon, label, focused }: TabIconProps) {
  return (
    <View style={styles.tabItem}>
      <MaterialIcons
        name={icon as any}
        size={24}
        color={focused ? TAB_COLORS.active : TAB_COLORS.inactive}
      />
      <Text
        style={[
          styles.tabLabel,
          { color: focused ? TAB_COLORS.active : TAB_COLORS.inactive },
          focused && styles.tabLabelActive,
        ]}
        numberOfLines={1}
      >
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
        tabBarActiveTintColor: TAB_COLORS.active,
        tabBarInactiveTintColor: TAB_COLORS.inactive,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          paddingTop: 4,
          paddingBottom: bottomPadding,
          height: tabBarHeight,
          backgroundColor: TAB_COLORS.bg,
          borderTopWidth: 1,
          borderTopColor: TAB_COLORS.border,
          elevation: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="home" label="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          title: "Trips",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="flight" label="Trips" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="account-balance-wallet" label="Wallet" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="explore" label="Explore" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="person" label="Profile" focused={focused} />
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
      <Tabs.Screen name="plan-trip" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    paddingTop: 6,
    minWidth: 56,
  },
  tabLabel: {
    fontSize: 10,
    fontFamily: "Satoshi-Medium",
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    fontFamily: "Satoshi-Bold",
  },
});
