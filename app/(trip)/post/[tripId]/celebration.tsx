import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, gradients, typography, shadows, radius } from '@/constants/theme';
import { GradientButton } from '@/components/ui/GradientButton';

export default function CelebrationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { tripId } = useLocalSearchParams<{ tripId: string }>();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Multi-layer glow background */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <LinearGradient
          colors={['rgba(100,67,244,0.15)', 'rgba(249,68,152,0.1)', 'transparent', 'rgba(100,67,244,0.05)']}
          locations={[0, 0.3, 0.6, 1]}
          style={{ flex: 1 }}
        />
      </View>

      {/* Decorative circles */}
      <View style={{ position: 'absolute', top: '10%', left: '10%', width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(100,67,244,0.06)', borderWidth: 1, borderColor: 'rgba(100,67,244,0.1)' }} />
      <View style={{ position: 'absolute', top: '20%', right: '5%', width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(249,68,152,0.06)', borderWidth: 1, borderColor: 'rgba(249,68,152,0.1)' }} />
      <View style={{ position: 'absolute', bottom: '25%', left: '5%', width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(74,222,128,0.06)', borderWidth: 1, borderColor: 'rgba(74,222,128,0.1)' }} />
      <View style={{ position: 'absolute', bottom: '15%', right: '15%', width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(251,191,36,0.04)', borderWidth: 1, borderColor: 'rgba(251,191,36,0.08)' }} />

      {/* Content */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
        {/* Trophy icon */}
        <LinearGradient
          colors={[...gradients.primaryCTA] as [string, string, ...string[]]}
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 32,
            ...shadows.cta,
          }}
        >
          <MaterialIcons name="emoji-events" size={48} color="#FFFFFF" />
        </LinearGradient>

        <Text style={{ fontFamily: fonts.heading, fontSize: 36, color: colors.text.primary, textAlign: 'center', marginBottom: 12 }}>
          Trip Complete!
        </Text>
        <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.body, color: colors.text.tertiary, textAlign: 'center', lineHeight: 24, marginBottom: 8 }}>
          What an amazing adventure
        </Text>

        {/* Stats row */}
        <View style={{ flexDirection: 'row', gap: 24, marginTop: 32, marginBottom: 48 }}>
          {[
            { value: '7', label: 'Days', icon: 'calendar-today' as const },
            { value: '12', label: 'Activities', icon: 'local-activity' as const },
            { value: '3.2k', label: 'Photos', icon: 'photo-library' as const },
          ].map(stat => (
            <View key={stat.label} style={{ alignItems: 'center' }}>
              <View style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: 'rgba(255,255,255,0.04)',
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.08)',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 8,
              }}>
                <MaterialIcons name={stat.icon} size={24} color={colors.primary} />
              </View>
              <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h3, color: colors.text.primary }}>{stat.value}</Text>
              <Text style={{ ...typography.caption, color: colors.text.tertiary }}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={{ width: '100%', maxWidth: 320, gap: 12 }}>
          <GradientButton
            label="See Summary"
            onPress={() => router.replace(`/(trip)/post/${tripId}/summary` as any)}
            icon={<MaterialIcons name="auto-awesome" size={20} color="#FFFFFF" />}
          />
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1 }}>
              <GradientButton
                label="Gallery"
                onPress={() => router.push(`/(trip)/post/${tripId}/gallery` as any)}
                variant="outline"
                icon={<MaterialIcons name="photo-library" size={18} color={colors.primary} />}
              />
            </View>
            <View style={{ flex: 1 }}>
              <GradientButton
                label="Review"
                onPress={() => router.push(`/(trip)/post/${tripId}/review` as any)}
                variant="outline"
                icon={<MaterialIcons name="rate-review" size={18} color={colors.primary} />}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
