import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

const COWORKINGS = [
  { name: 'Hub71 Workspace', price: 15, rating: 4.7, wifi: 95, hours: '08:00-22:00' },
  { name: 'The Bureau', price: 20, rating: 4.5, wifi: 80, hours: '07:00-23:00' },
  { name: 'Nomad Cafe', price: 8, rating: 4.3, wifi: 60, hours: '09:00-20:00' },
];

const COMMUNITIES = [
  { name: 'Dubai Digital Nomads', platform: 'WhatsApp', members: '2.4k' },
  { name: 'Remote Workers UAE', platform: 'Facebook', members: '8.1k' },
  { name: 'Nomad Meetup Dubai', platform: 'Meetup', members: '1.2k' },
];

export default function DigitalNomadHub() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-bg-primary">
      <View className="flex-row items-center px-4 pt-12 pb-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Text className="text-white text-lg">‹ Back</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold flex-1">Digital Nomad Hub</Text>
        <TouchableOpacity><Text className="text-primary">📍 Dubai</Text></TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4">
        <View className="bg-bg-card rounded-card p-6 mb-4">
          <Text className="text-white text-lg font-bold mb-3">Nomad Score</Text>
          <View className="items-center mb-4">
            <Text className="text-primary text-4xl font-bold">8.4</Text>
            <Text className="text-text-secondary">/ 10 — "Great for nomads"</Text>
          </View>
          {[
            ['Internet', '92 Mbps', '🌐'],
            ['Cost of Living', '4.2/10 (affordable)', '💰'],
            ['Nomad Population', '2,400/month', '👥'],
            ['Visa', 'Digital Nomad Visa available', '🛂'],
            ['Weather', '28°C ☀️', '🌡️'],
            ['Safety', '8.1/10', '🛡️'],
          ].map(([label, value, icon]) => (
            <View key={label} className="flex-row justify-between py-2" style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' }}>
              <Text className="text-text-secondary">{icon} {label}</Text>
              <Text className="text-white font-semibold">{value}</Text>
            </View>
          ))}
        </View>

        <Text className="text-white font-bold text-lg mb-3">Coworking Spaces</Text>
        {COWORKINGS.map(cw => (
          <TouchableOpacity key={cw.name} className="bg-bg-card rounded-card p-4 mb-2 flex-row justify-between items-center">
            <View>
              <Text className="text-white font-bold">{cw.name}</Text>
              <Text className="text-text-muted text-sm">⭐ {cw.rating} · WiFi: {cw.wifi}mbps</Text>
              <Text className="text-text-muted text-sm">Open {cw.hours}</Text>
            </View>
            <View className="items-end">
              <Text className="text-primary font-bold">€{cw.price}/day</Text>
              <TouchableOpacity className="bg-primary/20 px-3 py-1 rounded-pill mt-1">
                <Text className="text-primary text-sm">Book →</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        <Text className="text-white font-bold text-lg mt-4 mb-3">Communities</Text>
        {COMMUNITIES.map(c => (
          <TouchableOpacity key={c.name} onPress={() => Linking.openURL('https://example.com')} className="bg-bg-card rounded-card p-4 mb-2 flex-row justify-between items-center">
            <View>
              <Text className="text-white font-semibold">{c.name}</Text>
              <Text className="text-text-muted text-sm">{c.platform} · {c.members} members</Text>
            </View>
            <Text className="text-primary font-semibold">Join →</Text>
          </TouchableOpacity>
        ))}

        <Text className="text-white font-bold text-lg mt-4 mb-3">Cost Breakdown</Text>
        <View className="bg-bg-card rounded-card p-4 mb-4">
          {[['☕ Coffee', '€2'], ['🍜 Lunch', '€8'], ['💻 Coworking/day', '€15'], ['🏠 Apartment/month', '€1,200']].map(([item, price]) => (
            <View key={item} className="flex-row justify-between py-2" style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' }}>
              <Text className="text-text-secondary">{item}</Text>
              <Text className="text-white font-semibold">{price}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity className="bg-primary rounded-button py-3 items-center mb-8">
          <Text className="text-white font-semibold">Find Remote Jobs →</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
