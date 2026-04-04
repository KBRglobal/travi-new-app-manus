import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

// S78 — Social Hub
export default function SocialHubScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <Text className="text-2xl md:text-3xl font-bold text-white px-4 md:px-6 mt-4">Social</Text>

      <ScrollView contentContainerClassName="px-4 md:px-6 pb-24">
        {/* Discover */}
        <Pressable
          onPress={() => router.push('/(social)/discover')}
          className="w-full bg-primary/10 border border-primary/30 rounded-card p-5 mt-4 flex-row items-center active:opacity-80"
        >
          <View className="w-12 h-12 bg-primary/20 rounded-full items-center justify-center mr-4">
            <Text className="text-2xl">🌍</Text>
          </View>
          <View className="flex-1">
            <Text className="text-white text-lg font-bold">Discover Travelers</Text>
            <Text className="text-text-secondary text-xs">Find travel buddies near you</Text>
          </View>
          <Text className="text-text-secondary text-xl">›</Text>
        </Pressable>

        {/* Messages */}
        <Pressable
          onPress={() => router.push('/(social)/messages')}
          className="w-full bg-white/5 border border-white/8 rounded-card p-5 mt-3 flex-row items-center active:opacity-80"
        >
          <View className="w-12 h-12 bg-white/10 rounded-full items-center justify-center mr-4">
            <Text className="text-2xl">💬</Text>
          </View>
          <View className="flex-1">
            <Text className="text-white text-lg font-bold">Messages</Text>
            <Text className="text-text-secondary text-xs">3 unread conversations</Text>
          </View>
          <View className="w-6 h-6 bg-primary rounded-full items-center justify-center">
            <Text className="text-white text-xs font-bold">3</Text>
          </View>
        </Pressable>

        {/* Buddies */}
        <Pressable
          onPress={() => router.push('/(social)/buddies')}
          className="w-full bg-white/5 border border-white/8 rounded-card p-5 mt-3 flex-row items-center active:opacity-80"
        >
          <View className="w-12 h-12 bg-white/10 rounded-full items-center justify-center mr-4">
            <Text className="text-2xl">👥</Text>
          </View>
          <View className="flex-1">
            <Text className="text-white text-lg font-bold">Travel Buddies</Text>
            <Text className="text-text-secondary text-xs">12 connections</Text>
          </View>
          <Text className="text-text-secondary text-xl">›</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
