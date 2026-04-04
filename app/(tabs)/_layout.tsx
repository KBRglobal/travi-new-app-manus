import { Tabs, Redirect } from 'expo-router';
import { Text } from 'react-native';
import { useResponsive } from '@/hooks/useResponsive';

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
          backgroundColor: '#1A0B32',
          borderTopColor: 'rgba(100,67,244,0.2)',
          borderTopWidth: 1,
          height: 85,
          paddingBottom: 20,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#6443F4',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.4)',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          title: 'Trips',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}>✈️</Text>,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}>💳</Text>,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}>🧭</Text>,
        }}
      />
      <Tabs.Screen
        name="points"
        options={{
          title: 'Points',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}>⭐</Text>,
        }}
      />
      <Tabs.Screen
        name="social"
        options={{
          title: 'Social',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}>👥</Text>,
        }}
      />
    </Tabs>
  );
}
