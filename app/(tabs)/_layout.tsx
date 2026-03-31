import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform, View, Text, StyleSheet } from "react-native";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";

function TabIcon({ name, color, label, focused }: { name: any; color: string; label: string; focused: boolean }) {
  return (
    <View style={tabStyles.iconContainer}>
      <IconSymbol size={24} name={name} color={color} />
      {focused && <View style={tabStyles.dot} />}
    </View>
  );
}

const tabStyles = StyleSheet.create({
  iconContainer: { alignItems: "center", justifyContent: "center", gap: 3 },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: "#E91E8C" },
});

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);
  const tabBarHeight = 60 + bottomPadding;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#E91E8C",
        tabBarInactiveTintColor: "#A78BCA",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: bottomPadding,
          height: tabBarHeight,
          backgroundColor: "#2D1B69",
          borderTopColor: "#4A3080",
          borderTopWidth: 0.5,
        },
        tabBarLabelStyle: {
          fontSize: 11,
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
            <TabIcon name="house.fill" color={color} label="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          title: "Trips",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="airplane" color={color} label="Trips" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="wallet.pass.fill" color={color} label="Wallet" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="globe" color={color} label="Explore" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="person.crop.circle.fill" color={color} label="Profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
