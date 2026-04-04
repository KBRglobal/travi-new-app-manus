/**
 * Global Banner Component
 * Design System: Satoshi fonts, primary brand colors
 */

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalErrorState } from '@/lib/errorHandling';
import { colors, fonts, fontSizes, radius } from '@/constants/theme';

interface BannerData {
 message: string;
 actionLabel?: string;
}

export function BannerProvider() {
 const [banner, setBanner] = useState<BannerData | null>(null);

 useEffect(() => {
 const unsubscribe = globalErrorState.subscribeBanner((b) => {
 setBanner(b);
 });
 return unsubscribe;
 }, []);

 if (!banner) return null;

 return (
 <View
 style={{
 backgroundColor: colors.primaryLight,
 borderBottomWidth: 1,
 borderBottomColor: colors.primary,
 paddingHorizontal: 16,
 paddingVertical: 12,
 flexDirection: 'row',
 alignItems: 'center',
 justifyContent: 'space-between',
 }}
 >
 <Text
 style={{
 fontFamily: fonts.body,
 fontSize: fontSizes.caption,
 color: colors.text.primary,
 flex: 1,
 marginRight: 8,
 }}
 >
 {banner.message}
 </Text>
 {banner.actionLabel ? (
 <TouchableOpacity
 onPress={() => globalErrorState.dismissBanner()}
 style={{
 backgroundColor: colors.primaryLight,
 paddingHorizontal: 12,
 paddingVertical: 4,
 borderRadius: radius.button,
 }}
 >
 <Text
 style={{
 fontFamily: fonts.bold,
 fontSize: fontSizes.caption,
 color: '#FFFFFF',
 }}
 >
 {banner.actionLabel}
 </Text>
 </TouchableOpacity>
 ) : (
 <TouchableOpacity onPress={() => globalErrorState.dismissBanner()}>
 
 </TouchableOpacity>
 )}
 </View>
 );
}
