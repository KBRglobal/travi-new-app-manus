import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

const MOCK_ALERTS = [
  { id: '1', origin: 'TLV', dest: 'DXB', originFlag: '🇮🇱', destFlag: '🇦🇪', current: 189, threshold: 200, status: 'watching', lastChecked: '2h ago', dnaMatch: 87 },
  { id: '2', origin: 'TLV', dest: 'LHR', originFlag: '🇮🇱', destFlag: '🇬🇧', current: 156, threshold: 180, status: 'dropped', lastChecked: '30m ago', dnaMatch: 72 },
  { id: '3', origin: 'TLV', dest: 'CDG', originFlag: '🇮🇱', destFlag: '🇫🇷', current: 220, threshold: 200, status: 'paused', lastChecked: '1d ago', dnaMatch: 91 },
];

const STATUS_STYLES: Record<string, { border: string; badge: string; badgeText: string }> = {
  watching: { border: '#3B82F6', badge: '#3B82F6', badgeText: 'Watching' },
  dropped: { border: '#22C55E', badge: '#22C55E', badgeText: 'Price Dropped!' },
  at_limit: { border: '#F59E0B', badge: '#F59E0B', badgeText: 'At your limit' },
  paused: { border: '#6B7280', badge: '#6B7280', badgeText: 'Paused' },
  expired: { border: '#4B5563', badge: '#4B5563', badgeText: 'Trip date passed' },
};

export default function FlightPriceAlerts() {
  const router = useRouter();
  const [showNewAlert, setShowNewAlert] = useState(false);

  return (
    <View className="flex-1 bg-bg-primary">
      <View className="flex-row items-center px-4 pt-12 pb-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Text className="text-white text-lg">‹ Back</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold flex-1">Flight Price Alerts</Text>
        <TouchableOpacity onPress={() => setShowNewAlert(true)} className="bg-primary px-4 py-2 rounded-button">
          <Text className="text-white font-semibold">+ New Alert</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4">
        {MOCK_ALERTS.map((alert) => {
          const style = STATUS_STYLES[alert.status] || STATUS_STYLES.watching;
          return (
            <TouchableOpacity
              key={alert.id}
              onPress={() => {
                if (alert.status === 'dropped') router.push('/(trip)/plan/flights');
              }}
              className="bg-bg-card rounded-card p-4 mb-3"
              style={{ borderLeftWidth: 4, borderLeftColor: style.border }}
            >
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-white text-lg font-bold">
                  {alert.originFlag} {alert.origin} → {alert.destFlag} {alert.dest}
                </Text>
                <View style={{ backgroundColor: style.badge }} className="px-2 py-1 rounded-pill">
                  <Text className="text-white text-xs font-semibold">{style.badgeText}</Text>
                </View>
              </View>
              <View className="flex-row justify-between mb-1">
                <Text className="text-text-secondary">Current: €{alert.current}</Text>
                <Text className="text-text-secondary">Your limit: €{alert.threshold}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-text-muted text-xs">Last checked: {alert.lastChecked}</Text>
                <Text className="text-primary text-xs">✦ {alert.dnaMatch}% Match</Text>
              </View>
              {alert.status === 'dropped' && (
                <TouchableOpacity onPress={() => router.push('/(trip)/plan/flights')} className="mt-2 bg-primary/20 rounded-button py-2 items-center">
                  <Text className="text-primary font-semibold">View Flights →</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {showNewAlert && (
        <View className="absolute bottom-0 left-0 right-0 bg-bg-secondary rounded-t-modal p-6" style={{ paddingBottom: 40 }}>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-lg font-bold">New Price Alert</Text>
            <TouchableOpacity onPress={() => setShowNewAlert(false)}>
              <Text className="text-text-secondary text-lg">✕</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-text-secondary mb-2">Route</Text>
          <View className="flex-row mb-3">
            <View className="flex-1 bg-bg-primary rounded-input p-3 mr-2"><Text className="text-text-muted">Origin</Text></View>
            <View className="flex-1 bg-bg-primary rounded-input p-3"><Text className="text-text-muted">Destination</Text></View>
          </View>
          <Text className="text-text-secondary mb-2">Date Range</Text>
          <View className="flex-row mb-3">
            <TouchableOpacity className="bg-primary/20 px-3 py-2 rounded-pill mr-2"><Text className="text-primary">Flexible</Text></TouchableOpacity>
            <TouchableOpacity className="bg-bg-primary px-3 py-2 rounded-pill"><Text className="text-text-secondary">Fixed dates</Text></TouchableOpacity>
          </View>
          <Text className="text-text-secondary mb-2">My price limit</Text>
          <TextInput className="bg-bg-primary rounded-input p-3 text-white mb-3" placeholder="€___" placeholderTextColor="rgba(255,255,255,0.3)" keyboardType="numeric" />
          <Text className="text-text-secondary mb-2">Class</Text>
          <View className="flex-row mb-3">
            <TouchableOpacity className="bg-primary/20 px-3 py-2 rounded-pill mr-2"><Text className="text-primary">Economy</Text></TouchableOpacity>
            <TouchableOpacity className="bg-bg-primary px-3 py-2 rounded-pill"><Text className="text-text-secondary">Business</Text></TouchableOpacity>
          </View>
          <Text className="text-text-secondary mb-2">Alert when</Text>
          <View className="flex-row mb-4 flex-wrap">
            <TouchableOpacity className="bg-primary/20 px-3 py-2 rounded-pill mr-2 mb-2"><Text className="text-primary">Below my limit</Text></TouchableOpacity>
            <TouchableOpacity className="bg-bg-primary px-3 py-2 rounded-pill mr-2 mb-2"><Text className="text-text-secondary">Drops 20%</Text></TouchableOpacity>
            <TouchableOpacity className="bg-bg-primary px-3 py-2 rounded-pill mb-2"><Text className="text-text-secondary">Lowest in 30 days</Text></TouchableOpacity>
          </View>
          <TouchableOpacity className="bg-primary rounded-button py-4 items-center" onPress={() => setShowNewAlert(false)}>
            <Text className="text-white font-bold text-lg">Set Alert</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
