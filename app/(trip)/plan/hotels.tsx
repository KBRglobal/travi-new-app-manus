import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, spacing, radius, gradients, typography, shadows } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { GradientBadge } from '@/components/ui/GradientBadge';
import { PressableScale } from '@/components/ui/PressableScale';
import { ScreenHeader } from '@/components/ui/ScreenHeader';

const HOTELS = [
  { id: '1', name: 'Hotel Luxe', stars: 4, price: 89, rating: 8.9, dna: 87, amenities: ['Pool', 'Spa', 'Gym'] },
  { id: '2', name: 'City Inn', stars: 3, price: 120, rating: 7.8, dna: 72, amenities: ['WiFi', 'Breakfast'] },
  { id: '3', name: 'Beach Resort', stars: 5, price: 65, rating: 9.1, dna: 91, amenities: ['Beach', 'Pool', 'Restaurant', 'Spa'] },
];

export default function HotelSelect() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Hotels');
  const [selected, setSelected] = useState<string[]>([]);
  const [selectMode, setSelectMode] = useState(false);

  const renderStars = (count: number) => (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <MaterialIcons key={i} name="star" size={14} color={i < count ? colors.gold : 'rgba(255,255,255,0.1)'} />
      ))}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Top glow */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '20%' }}>
        <LinearGradient colors={['rgba(249,68,152,0.05)', 'transparent']} style={{ flex: 1 }} />
      </View>

      <ScreenHeader title="Select Hotel" />

      {/* Tab switcher */}
      <View style={{ flexDirection: 'row', marginHorizontal: spacing.screenH, marginBottom: 16, backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: radius.pill, padding: 4 }}>
        <PressableScale
          onPress={() => setActiveTab('Hotels')}
          style={{
            flex: 1,
            paddingVertical: 10,
            borderRadius: radius.pill,
            alignItems: 'center',
            backgroundColor: activeTab === 'Hotels' ? colors.primary : 'transparent',
          }}
        >
          <Text style={{ fontFamily: activeTab === 'Hotels' ? fonts.bold : fonts.bodyMedium, fontSize: fontSizes.bodySm, color: activeTab === 'Hotels' ? '#FFFFFF' : colors.text.tertiary }}>Hotels</Text>
        </PressableScale>
        <PressableScale
          onPress={() => { setActiveTab('Alt'); router.push('/(trip)/plan/alternative-stays'); }}
          style={{
            flex: 1,
            paddingVertical: 10,
            borderRadius: radius.pill,
            alignItems: 'center',
            backgroundColor: activeTab === 'Alt' ? colors.primary : 'transparent',
            borderWidth: activeTab !== 'Alt' ? 1 : 0,
            borderColor: 'rgba(249,68,152,0.3)',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodySm, color: activeTab === 'Alt' ? '#FFFFFF' : colors.pink }}>Alternative</Text>
            <GradientBadge label="NEW" variant="primary" style={{ paddingHorizontal: 6, paddingVertical: 1 }} />
          </View>
        </PressableScale>
      </View>

      {selectMode && (
        <Text style={{ ...typography.caption, color: colors.text.tertiary, textAlign: 'center', marginBottom: 8 }}>
          Long press to select, then compare
        </Text>
      )}

      {/* Hotel list */}
      <ScrollView style={{ flex: 1, paddingHorizontal: spacing.screenH }} showsVerticalScrollIndicator={false}>
        {HOTELS.map(hotel => {
          const isSelected = selected.includes(hotel.id);
          const isBest = hotel.dna >= 90;

          return (
            <PressableScale
              key={hotel.id}
              onPress={() => {
                if (selectMode) {
                  setSelected(prev => prev.includes(hotel.id) ? prev.filter(id => id !== hotel.id) : [...prev, hotel.id]);
                } else {
                  router.push('/(trip)/plan/activities');
                }
              }}
              onLongPress={() => { setSelectMode(true); setSelected([hotel.id]); }}
              style={{ marginBottom: 12 }}
            >
              <GlassCard
                tint={isBest ? 'discovery' : 'neutral'}
                style={isSelected ? { borderColor: colors.primary, borderWidth: 2 } : isBest ? { borderColor: 'rgba(100,67,244,0.2)', borderWidth: 1 } : {}}
              >
                {/* Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h4, color: colors.text.primary, marginBottom: 4 }}>{hotel.name}</Text>
                    {renderStars(hotel.stars)}
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <GradientBadge label={`${hotel.dna}%`} variant={hotel.dna >= 90 ? 'primary' : 'secondary'} />
                    {selectMode && (
                      <View style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor: isSelected ? colors.primary : colors.text.tertiary,
                        backgroundColor: isSelected ? colors.primary : 'transparent',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {isSelected && <MaterialIcons name="check" size={16} color="#FFFFFF" />}
                      </View>
                    )}
                  </View>
                </View>

                {/* Rating + Amenities */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.06)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: radius.pill }}>
                    <MaterialIcons name="star" size={12} color={colors.gold} style={{ marginRight: 3 }} />
                    <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.caption, color: colors.text.primary }}>{hotel.rating}</Text>
                  </View>
                  {hotel.amenities.map(a => (
                    <View key={a} style={{ backgroundColor: 'rgba(255,255,255,0.04)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: radius.pill }}>
                      <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.caption, color: colors.text.tertiary }}>{a}</Text>
                    </View>
                  ))}
                </View>

                {/* Price */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View>
                    <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h2, color: colors.text.primary }}>€{hotel.price}</Text>
                    <Text style={{ ...typography.caption, color: colors.text.tertiary }}>/night</Text>
                  </View>
                  {isBest && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <MaterialIcons name="verified" size={14} color={colors.primary} />
                      <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.caption, color: colors.primary }}>BEST MATCH</Text>
                    </View>
                  )}
                </View>
              </GlassCard>
            </PressableScale>
          );
        })}
      </ScrollView>

      {/* Compare button */}
      {selected.length >= 2 && (
        <View style={{ paddingHorizontal: spacing.screenH, paddingBottom: insets.bottom + 8, paddingTop: 12 }}>
          <GradientButton
            title={`Compare (${selected.length})`}
            onPress={() => router.push('/(trip)/plan/hotel-compare')}
            icon={<MaterialIcons name="compare-arrows" size={20} color="#FFFFFF" />}
          />
        </View>
      )}
    </View>
  );
}
