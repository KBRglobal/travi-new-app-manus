import { haptic } from '@/lib/haptics';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1" style={{ backgroundColor: colors.bg.primary }}>
      <ScrollView className="flex-1 px-4 pt-12">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.bodySm, color: colors.text.secondary }}>
              Good morning
            </Text>
            <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h1, color: colors.text.primary }}>
              Welcome back! 👋
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(trip)/profile')}>
            <View style={{ width: 40, height: 40, backgroundColor: colors.primary, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontFamily: fonts.bold, color: '#FFFFFF' }}>U</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* AI Trip Suggestion Card */}
        <TouchableOpacity
          onPress={() => router.push('/(trip)/plan/destination')}
          style={{ backgroundColor: colors.primary, borderRadius: radius.card, padding: 24, marginBottom: 16, ...shadows.glow }}
        >
          <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.bodyLg, color: '#FFFFFF', marginBottom: 4 }}>
            AI Trip Suggestion
          </Text>
          <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.bodySm, color: 'rgba(255,255,255,0.8)' }}>
            Based on your Travel DNA — Dubai is 92% match!
          </Text>
          <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodySm, color: '#FFFFFF', marginTop: 8 }}>
            Plan Trip →
          </Text>
        </TouchableOpacity>

        {/* Quick Stats */}
        <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.bodyLg, color: colors.text.primary, marginBottom: 12 }}>
          Quick Stats
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/wallet')}
            style={{ backgroundColor: colors.bg.card, borderRadius: radius.card, padding: 16, marginRight: 12, width: 140, borderWidth: 1, borderColor: colors.border.default }}
          >
            <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.bodySm, color: colors.text.secondary }}>Wallet</Text>
            <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h2, color: colors.text.primary }}>€2,450</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/points')}
            style={{ backgroundColor: colors.bg.card, borderRadius: radius.card, padding: 16, marginRight: 12, width: 140, borderWidth: 1, borderColor: colors.border.default }}
          >
            <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.bodySm, color: colors.text.secondary }}>Points</Text>
            <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h2, color: colors.text.primary }}>12,500</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/(trip)/plan/flight-alerts')}
            style={{ backgroundColor: colors.bg.card, borderRadius: radius.card, padding: 16, marginRight: 12, width: 140, borderWidth: 1, borderColor: colors.pink }}
          >
            <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodySm, color: colors.pink }}>Flight Deals 🔥</Text>
            <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h2, color: colors.text.primary }}>3 alerts</Text>
            <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.tiny, color: colors.pink }}>NEW</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* DNA Persona */}
        <View className="flex-row justify-between items-center mb-3">
          <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.bodyLg, color: colors.text.primary }}>
            Your DNA Persona
          </Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/explore/nomad')}>
            <View style={{ backgroundColor: colors.primaryLight, paddingHorizontal: 12, paddingVertical: 4, borderRadius: radius.pill }}>
              <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodySm, color: colors.primary }}>Nomad Mode 🌍</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/(trip)/dna/results')}
          style={{ backgroundColor: colors.bg.card, borderRadius: radius.card, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: colors.border.default }}
        >
          <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.primary }}>Explorer · Foodie · Culture Lover</Text>
          <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.bodySm, color: colors.text.secondary, marginTop: 4 }}>Tap to see your full Travel DNA →</Text>
        </TouchableOpacity>

        {/* Trending Destinations */}
        <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.bodyLg, color: colors.text.primary, marginBottom: 12 }}>
          Trending Destinations
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
          {['Dubai 🇦🇪', 'Tokyo 🇯🇵', 'Barcelona 🇪🇸', 'Bali 🇮🇩'].map(dest => (
            <TouchableOpacity
              key={dest}
              onPress={() => router.push('/(trip)/plan/destination')}
              style={{ backgroundColor: colors.bg.card, borderRadius: radius.card, padding: 16, marginRight: 12, width: 150, borderWidth: 1, borderColor: colors.border.default }}
            >
              <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.text.primary }}>{dest}</Text>
              <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.bodySm, color: colors.primary, marginTop: 4 }}>Explore →</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Quick Actions */}
        <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.bodyLg, color: colors.text.primary, marginBottom: 12 }}>
          Quick Actions
        </Text>
        <View className="flex-row flex-wrap mb-8">
          {[
            { label: 'New Trip', icon: '✈️', route: '/(trip)/plan/destination' },
            { label: 'My Trips', icon: '📋', route: '/(tabs)/home/trips' },
            { label: 'Explore', icon: '🌍', route: '/(tabs)/explore' },
            { label: 'Wallet', icon: '💰', route: '/(tabs)/wallet' },
          ].map(action => (
            <TouchableOpacity
              key={action.label}
              onPress={() => {
                haptic.light();
                router.push(action.route as any);
              }}
              style={{
                backgroundColor: colors.bg.card,
                borderRadius: radius.card,
                padding: 16,
                alignItems: 'center',
                width: '48%',
                marginRight: '2%',
                marginBottom: 8,
                borderWidth: 1,
                borderColor: colors.border.default,
              }}
            >
              <Text style={{ fontSize: 24, marginBottom: 4 }}>{action.icon}</Text>
              <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodySm, color: colors.text.primary }}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
