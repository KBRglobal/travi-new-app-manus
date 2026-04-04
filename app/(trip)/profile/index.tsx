import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const menuItems = [
    { icon: '🧬', label: 'Travel DNA', route: '/(trip)/profile/dna' },
    { icon: '📊', label: 'Travel Stats', route: '/(trip)/profile/stats' },
    { icon: '🏆', label: 'Achievements', route: '/(trip)/profile/achievements' },
    { icon: '⭐', label: 'Reviews', route: '/(trip)/profile/reviews' },
    { icon: '🤍', label: 'Wishlist', route: '/(trip)/profile/wishlist' },
    { icon: '⚙️', label: 'Settings', route: '/(trip)/settings' },
    { icon: '💳', label: 'Membership', route: '/(trip)/wallet/membership' },
  ];
  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center justify-between px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className="text-white text-2xl">‹</Text></Pressable>
        <Pressable onPress={() => router.push('/(trip)/profile/edit')} className="p-2"><Text className="text-primary text-sm">Edit</Text></Pressable>
      </View>
      <ScrollView contentContainerClassName="px-4 md:px-6 py-4 pb-24">
        {/* Avatar + Name */}
        <View className="w-full max-w-md mx-auto items-center mb-6">
          <View className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-primary/20 border-2 border-primary items-center justify-center">
            <Text className="text-4xl">👤</Text>
          </View>
          <Text className="text-white text-2xl font-bold mt-4">Traveler Name</Text>
          <Text className="text-text-secondary text-sm mt-1">Explorer · 12,450 points</Text>
          <View className="flex-row gap-6 mt-4">
            <View className="items-center"><Text className="text-white text-lg font-bold">5</Text><Text className="text-text-muted text-xs">Trips</Text></View>
            <View className="items-center"><Text className="text-white text-lg font-bold">12</Text><Text className="text-text-muted text-xs">Countries</Text></View>
            <View className="items-center"><Text className="text-white text-lg font-bold">24</Text><Text className="text-text-muted text-xs">Buddies</Text></View>
          </View>
        </View>
        {/* Menu */}
        {menuItems.map((item) => (
          <Pressable key={item.label} onPress={() => router.push(item.route as any)} className="w-full max-w-md mx-auto bg-bg-card rounded-card p-4 flex-row items-center mb-3 active:opacity-80">
            <Text className="text-xl mr-3">{item.icon}</Text>
            <Text className="text-white text-base flex-1">{item.label}</Text>
            <Text className="text-text-secondary">›</Text>
          </Pressable>
        ))}
        {/* Logout */}
        <Pressable onPress={() => router.replace('/(auth)/welcome')} className="w-full max-w-md mx-auto mt-4 py-3 items-center">
          <Text className="text-red-400 text-sm">Log Out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
