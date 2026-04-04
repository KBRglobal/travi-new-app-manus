import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function TermsScreen() {
  const router = useRouter();
  return (
    <ScrollView className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3 mb-2">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Terms & Policies</Text>
      </View>
      {[
        { title: 'Terms of Service', icon: '📄', desc: 'Last updated: March 2026' },
        { title: 'Privacy Policy', icon: '🔒', desc: 'How we handle your data' },
        { title: 'Cookie Policy', icon: '🍪', desc: 'Cookie usage on our platform' },
        { title: 'Refund Policy', icon: '💰', desc: 'Cancellation and refund terms' },
        { title: 'Community Guidelines', icon: '👥', desc: 'Rules for social features' },
        { title: 'Open Source Licenses', icon: '📋', desc: 'Third-party software licenses' },
      ].map(item => (
        <TouchableOpacity key={item.title} className="flex-row items-center mx-4 mb-2 p-4 bg-bg-secondary rounded-2xl border border-white/[0.08]">
          <Text className="text-2xl mr-3">{item.icon}</Text>
          <View className="flex-1">
            <Text className="text-white font-bold">{item.title}</Text>
            <Text className="text-white/40 text-xs">{item.desc}</Text>
          </View>
          <Text className="text-white/20">›</Text>
        </TouchableOpacity>
      ))}
      <View className="items-center py-8">
        <Text className="text-white/20 text-xs">TRAVI v1.0.0</Text>
        <Text className="text-white/20 text-xs">© 2026 TRAVI Travel Ltd.</Text>
      </View>
    </ScrollView>
  );
}
