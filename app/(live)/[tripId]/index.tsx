import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function LiveDashboard() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams();

  const quickActions = [
    { icon: '🗓️', label: 'Timeline', route: `/(live)/${tripId}/timeline` },
    { icon: '🗺️', label: 'Map', route: `/(live)/${tripId}/map` },
    { icon: '💰', label: 'Expenses', route: `/(live)/${tripId}/expenses` },
    { icon: '📸', label: 'Memories', route: `/(live)/${tripId}/memories` },
    { icon: '🆘', label: 'Emergency', route: `/(live)/${tripId}/emergency` },
    { icon: '💳', label: 'Tax', route: `/(live)/${tripId}/tax` },
    { icon: '📊', label: 'Budget', route: `/(live)/${tripId}/budget`, isNew: true },
    { icon: '⚙️', label: 'Settings', route: '/(trip)/settings' },
  ];

  return (
    <View className="flex-1 bg-bg-primary">
      <View className="px-4 pt-12 pb-4">
        <Text className="text-text-secondary">Currently in</Text>
        <Text className="text-white text-2xl font-bold">Dubai 🇦🇪</Text>
        <Text className="text-primary">Day 3 of 7</Text>
      </View>

      <ScrollView className="flex-1 px-4">
        <View className="bg-bg-card rounded-card p-4 mb-4">
          <Text className="text-white font-bold mb-2">Next Up</Text>
          <Text className="text-primary text-lg font-bold">Desert Safari — 2:00 PM</Text>
          <Text className="text-text-secondary">In 3 hours · Pickup from hotel</Text>
        </View>

        <View className="bg-bg-card rounded-card p-4 mb-4 flex-row justify-between items-center">
          <View>
            <Text className="text-text-secondary text-sm">Weather</Text>
            <Text className="text-white text-xl font-bold">34°C ☀️</Text>
          </View>
          <View>
            <Text className="text-text-secondary text-sm">Spent today</Text>
            <Text className="text-white text-xl font-bold">€127</Text>
          </View>
          <View>
            <Text className="text-text-secondary text-sm">Steps</Text>
            <Text className="text-white text-xl font-bold">8,432</Text>
          </View>
        </View>

        <Text className="text-white font-bold text-lg mb-3">Quick Actions</Text>
        <View className="flex-row flex-wrap mb-8">
          {quickActions.map(action => (
            <TouchableOpacity key={action.label} onPress={() => router.push(action.route as any)} className="bg-bg-card rounded-card p-4 items-center" style={{ width: '48%', marginRight: '2%', marginBottom: 8 }}>
              <Text className="text-2xl mb-1">{action.icon}</Text>
              <Text className="text-white font-semibold text-sm">{action.label}</Text>
              {action.isNew && (
                <View className="bg-pink px-2 py-0.5 rounded-pill mt-1">
                  <Text className="text-white text-xs font-bold">NEW</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
