import { Tabs, Redirect } from 'expo-router';
import { Text } from 'react-native';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, fonts, fontSizes } from '@/constants/theme';

// Main App: 6 Bottom Tabs (mobile) / Redirect to drawer (tablet+)
export default function TabsLayout() {
  const { isPhone } = useResponsive();

  if (!isPhone) {
    return <Redirect href="/(drawer)" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.bg.secondary,
          borderTopColor: colors.border.default,
          borderTopWidth: 1,
          height: 85,
          paddingBottom: 20,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.muted,
        tabBarLabelStyle: {
          fontFamily: fonts.bold,
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}><Ionicons name="home" size={16} color="#FFFFFF" /></Text>,
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          title: 'Trips',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}><Ionicons name="airplane" size={16} color="#FFFFFF" /></Text>,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}><Ionicons name="card" size={16} color="#FFFFFF" /></Text>,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}><Ionicons name="compass" size={16} color="#FFFFFF" /></Text>,
        }}
      />
      <Tabs.Screen
        name="points"
        options={{
          title: 'Points',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}><Ionicons name="star" size={16} color="#FFFFFF" /></Text>,
        }}
      />
      <Tabs.Screen
        name="social"
        options={{
          title: 'Social',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}><Ionicons name="people" size={16} color="#FFFFFF" /></Text>,
        }}
      />
    </Tabs>
  );
}
