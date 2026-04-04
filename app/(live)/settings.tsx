import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';

export default function LiveSettingsScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    locationSharing: true, autoTranslate: true, offlineMaps: false,
    emergencyContacts: true, currencyAutoDetect: true, weatherAlerts: true,
    quietHours: false, dataSaver: false,
  });

  const toggle = (key: keyof typeof settings) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <ScrollView className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3 mb-2">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Live Mode Settings</Text>
      </View>
      {[
        { key: 'locationSharing' as const, label: 'Location Sharing', desc: 'Share location with travel buddies', emoji: '📍' },
        { key: 'autoTranslate' as const, label: 'Auto Translate', desc: 'Translate signs and menus', emoji: '🌐' },
        { key: 'offlineMaps' as const, label: 'Offline Maps', desc: 'Download maps for offline use', emoji: '🗺️' },
        { key: 'emergencyContacts' as const, label: 'Emergency Contacts', desc: 'Quick access to emergency numbers', emoji: '🆘' },
        { key: 'currencyAutoDetect' as const, label: 'Auto Currency', desc: 'Detect local currency automatically', emoji: '💱' },
        { key: 'weatherAlerts' as const, label: 'Weather Alerts', desc: 'Get severe weather notifications', emoji: '🌦️' },
        { key: 'quietHours' as const, label: 'Quiet Hours', desc: 'Mute notifications 10PM-8AM', emoji: '🌙' },
        { key: 'dataSaver' as const, label: 'Data Saver', desc: 'Reduce data usage abroad', emoji: '📶' },
      ].map((item, i) => (
        <View key={item.key} className="flex-row items-center mx-4 mb-2 p-4 bg-bg-secondary rounded-2xl border border-white/[0.08]">
          <Text className="text-xl mr-3">{item.emoji}</Text>
          <View className="flex-1">
            <Text className="text-white font-bold">{item.label}</Text>
            <Text className="text-white/40 text-xs">{item.desc}</Text>
          </View>
          <Switch value={settings[item.key]} onValueChange={() => toggle(item.key)} trackColor={{ true: '#6443F4' }} />
        </View>
      ))}
    </ScrollView>
  );
}
