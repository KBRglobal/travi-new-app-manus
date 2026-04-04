import { haptic } from '@/lib/haptics';
import { View, Text, Pressable, ScrollView, FlatList} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
 const router = useRouter();
 const sections = [
 { title: 'Account', items: [
 { iconName: 'person', label: 'Personal Info', route: '/(trip)/settings/personal' },
 { iconName: 'lock-closed', label: 'Privacy & Security', route: '/(trip)/settings/privacy' },
 { iconName: 'notifications', label: 'Notifications', route: '/(trip)/settings/notifications' },
 ]},
 { title: 'Preferences', items: [
 { iconName: 'globe', label: 'Language', route: '/(trip)/settings/language' },
 { icon: 'swap-horizontal', label: 'Currency', route: '/(trip)/settings/currency' },
 { iconName: 'color-palette', label: 'Appearance', route: '/(trip)/settings/appearance' },
 ]},
 { title: 'Support', items: [
 { icon: 'help-circle', label: 'Help Center', route: '/(trip)/settings/help' },
 { iconName: 'create', label: 'Feedback', route: '/(trip)/settings/feedback' },
 { icon: 'document-text', label: 'Terms & Privacy', route: '/(trip)/settings/terms' },
 ]},
 ];
 return (
 <View className="flex-1 bg-bg-primary pt-safe">
 <View className="flex-row items-center px-4 md:px-6 mt-4">
 <Pressable onPress={() => router.back()} className="p-2 -ml-2"><Text className="text-white text-2xl">‹</Text></Pressable>
 <Text className="text-white text-xl font-bold ml-3">Settings</Text>
 </View>
 <ScrollView removeClippedSubviews={true} contentContainerClassName="px-4 md:px-6 py-6 pb-24">
 {sections.map((section) => (
 <View key={section.title} className="w-full max-w-md mx-auto mb-6">
 <Text className="text-text-secondary text-sm font-semibold mb-3">{section.title}</Text>
 {section.items.map((item) => (
 <Pressable key={item.label} onPress={() => router.push(item.route as any)} className="bg-bg-card rounded-card p-4 flex-row items-center mb-2 active:opacity-80">
 <Text className="text-xl mr-3">{item.icon}</Text>
 <Text className="text-white text-base flex-1">{item.label}</Text>
 <Text className="text-text-secondary">›</Text>
 </Pressable>
 ))}
 </View>
 ))}
 <Pressable onPress={() => router.replace('/(auth)/welcome')} className="w-full max-w-md mx-auto mt-4 py-3 items-center">
 <Text className="text-red-400 text-sm">Log Out</Text>
 </Pressable>
 </ScrollView>
 </View>
 );
}
