import { haptic } from '@/lib/haptics';
import { Stack } from 'expo-router';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

// Drawer: permanent sidebar for tablet+ / desktop
function Sidebar() {
  const router = useRouter();

  const menuItems = [
    { label: '🏠 Home', route: '/(tabs)/home' },
    { label: '✈️ Trips', route: '/(tabs)/trips' },
    { label: '💳 Wallet', route: '/(tabs)/wallet' },
    { label: '🧭 Explore', route: '/(tabs)/explore' },
    { label: '⭐ Points', route: '/(tabs)/points' },
    { label: '👥 Social', route: '/(tabs)/social' },
  ];

  return (
    <View className="w-64 bg-bg-secondary border-r border-primary-light h-full pt-safe">
      <Text className="text-text-primary text-xl font-bold p-4 md:p-6">TRAVI</Text>
      <ScrollView className="flex-1">
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.route}
            onPress={() => router.push(item.route as any)}
            className="px-4 py-3 md:px-6 md:py-4 active:bg-primary-light"
          >
            <Text className="text-text-primary text-base md:text-lg">{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

export default function DrawerLayout() {
  return (
    <View className="flex-1 flex-row bg-bg-primary">
      <Sidebar />
      <View className="flex-1">
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#0A0514' },
          }}
        />
      </View>
    </View>
  );
}
