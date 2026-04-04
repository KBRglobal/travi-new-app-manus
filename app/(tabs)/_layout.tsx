import { Tabs, Redirect } from 'expo-router';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, fonts, gradients } from '@/constants/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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
          backgroundColor: '#0D0618',
          borderTopColor: 'rgba(255,255,255,0.06)',
          borderTopWidth: 1,
          height: 85,
          paddingBottom: 20,
          paddingTop: 8,
          elevation: 0,
          shadowColor: '#6443F4',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.3)',
        tabBarLabelStyle: {
          fontFamily: fonts.medium,
          fontSize: 10,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              {focused && (
                <View style={{ position: 'absolute', top: -8, width: 24, height: 3, borderRadius: 2, overflow: 'hidden' }}>
                  <LinearGradient colors={[...gradients.primaryCTA] as [string, string, ...string[]]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flex: 1 }} />
                </View>
              )}
              <MaterialIcons name="home-filled" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          title: 'Trips',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              {focused && (
                <View style={{ position: 'absolute', top: -8, width: 24, height: 3, borderRadius: 2, overflow: 'hidden' }}>
                  <LinearGradient colors={[...gradients.primaryCTA] as [string, string, ...string[]]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flex: 1 }} />
                </View>
              )}
              <MaterialIcons name="flight" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              {focused && (
                <View style={{ position: 'absolute', top: -8, width: 24, height: 3, borderRadius: 2, overflow: 'hidden' }}>
                  <LinearGradient colors={[...gradients.primaryCTA] as [string, string, ...string[]]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flex: 1 }} />
                </View>
              )}
              <MaterialIcons name="account-balance-wallet" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              {focused && (
                <View style={{ position: 'absolute', top: -8, width: 24, height: 3, borderRadius: 2, overflow: 'hidden' }}>
                  <LinearGradient colors={[...gradients.primaryCTA] as [string, string, ...string[]]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flex: 1 }} />
                </View>
              )}
              <MaterialIcons name="explore" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="points"
        options={{
          title: 'Points',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              {focused && (
                <View style={{ position: 'absolute', top: -8, width: 24, height: 3, borderRadius: 2, overflow: 'hidden' }}>
                  <LinearGradient colors={[...gradients.primaryCTA] as [string, string, ...string[]]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flex: 1 }} />
                </View>
              )}
              <MaterialIcons name="stars" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="social"
        options={{
          title: 'Social',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              {focused && (
                <View style={{ position: 'absolute', top: -8, width: 24, height: 3, borderRadius: 2, overflow: 'hidden' }}>
                  <LinearGradient colors={[...gradients.primaryCTA] as [string, string, ...string[]]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flex: 1 }} />
                </View>
              )}
              <MaterialIcons name="people" size={24} color={color} />
            </View>
          ),
        }}
      />
      {/* Hide search, profile, and notifications from tab bar */}
      <Tabs.Screen name="search" options={{ href: null }} />
      <Tabs.Screen name="profile" options={{ href: null }} />
    </Tabs>
  );
}
