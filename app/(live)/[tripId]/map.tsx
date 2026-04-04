import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

export default function Screen() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 md:px-6 mt-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2">
          <Text className="text-white text-2xl">‹</Text>
        </Pressable>
        <Text className="text-white text-xl md:text-2xl font-bold ml-3">Map</Text>
      </View>
      <ScrollView contentContainerClassName="px-4 md:px-6 py-6 items-center">
        
      </ScrollView>
    </View>
  );
}
