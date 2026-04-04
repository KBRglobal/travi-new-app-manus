import { Stack } from 'expo-router';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes } from '@/constants/theme';

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
    <View
      style={{
        width: 256,
        backgroundColor: colors.bg.secondary,
        borderRightWidth: 1,
        borderRightColor: colors.border.default,
        height: '100%',
      }}
      className="pt-safe"
    >
      <View className="p-4 md:p-6 flex-row items-center">
        <Image
          source={require('@/assets/images/Mascot_for_Dark_Background.png')}
          style={{ width: 32, height: 32, marginRight: 8 }}
          resizeMode="contain"
        />
        <Text
          style={{
            fontFamily: fonts.heading,
            fontSize: fontSizes.h2,
            color: colors.text.primary,
          }}
        >
          TRAVI
        </Text>
      </View>
      <ScrollView className="flex-1">
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.route}
            onPress={() => router.push(item.route as any)}
            className="px-4 py-3 md:px-6 md:py-4 active:bg-bg-surface"
          >
            <Text
              style={{
                fontFamily: fonts.body,
                fontSize: fontSizes.body,
                color: colors.text.primary,
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

export default function DrawerLayout() {
  return (
    <View className="flex-1 flex-row" style={{ backgroundColor: colors.bg.primary }}>
      <Sidebar />
      <View className="flex-1">
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.bg.primary },
          }}
        />
      </View>
    </View>
  );
}
