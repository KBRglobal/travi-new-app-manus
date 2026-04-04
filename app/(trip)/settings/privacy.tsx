import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';

export default function PrivacyScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    profilePublic: true, showTrips: true, showDNA: false, showOnMap: true,
    shareAnalytics: true, personalizedAds: false, locationTracking: true,
  });

  const toggle = (key: keyof typeof settings) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <ScrollView className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3 mb-2">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Privacy</Text>
      </View>
      <View className="mx-4 mb-6">
        <Text className="text-white/60 text-xs uppercase mb-3 ml-1">Profile Visibility</Text>
        <View className="bg-bg-secondary rounded-2xl border border-white/[0.08]">
          {[
            { key: 'profilePublic' as const, label: 'Public Profile', desc: 'Anyone can see your profile' },
            { key: 'showTrips' as const, label: 'Show Trips', desc: 'Display your trip history' },
            { key: 'showDNA' as const, label: 'Show Travel DNA', desc: 'Share your travel personality' },
            { key: 'showOnMap' as const, label: 'Show on Map', desc: 'Appear on traveler map' },
          ].map((item, i) => (
            <View key={item.key} className={`flex-row items-center justify-between p-4 ${i < 3 ? 'border-b border-white/[0.08]' : ''}`}>
              <View className="flex-1 mr-4"><Text className="text-white font-bold">{item.label}</Text><Text className="text-white/40 text-xs">{item.desc}</Text></View>
              <Switch value={settings[item.key]} onValueChange={() => toggle(item.key)} trackColor={{ true: '#6443F4' }} />
            </View>
          ))}
        </View>
      </View>
      <View className="mx-4 mb-6">
        <Text className="text-white/60 text-xs uppercase mb-3 ml-1">Data</Text>
        <View className="bg-bg-secondary rounded-2xl border border-white/[0.08]">
          {[
            { key: 'shareAnalytics' as const, label: 'Share Analytics', desc: 'Help improve TRAVI' },
            { key: 'personalizedAds' as const, label: 'Personalized Ads', desc: 'Show relevant offers' },
            { key: 'locationTracking' as const, label: 'Location Tracking', desc: 'For live trip features' },
          ].map((item, i) => (
            <View key={item.key} className={`flex-row items-center justify-between p-4 ${i < 2 ? 'border-b border-white/[0.08]' : ''}`}>
              <View className="flex-1 mr-4"><Text className="text-white font-bold">{item.label}</Text><Text className="text-white/40 text-xs">{item.desc}</Text></View>
              <Switch value={settings[item.key]} onValueChange={() => toggle(item.key)} trackColor={{ true: '#6443F4' }} />
            </View>
          ))}
        </View>
      </View>
      <View className="mx-4 mb-8">
        <TouchableOpacity className="p-4 bg-bg-secondary rounded-2xl border border-white/[0.08] mb-2">
          <Text className="text-white font-bold">Download My Data</Text>
          <Text className="text-white/40 text-xs">Export all your personal data</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(trip)/account/delete')} className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
          <Text className="text-red-400 font-bold">Delete Account</Text>
          <Text className="text-red-400/60 text-xs">Permanently delete your account and data</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
