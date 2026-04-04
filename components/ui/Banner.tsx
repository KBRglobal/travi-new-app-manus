/**
 * Global Banner Component
 * Used for location permission, offline mode, etc.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalErrorState } from '@/lib/errorHandling';

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
    <View className="bg-primary/20 border-b border-primary/30 px-4 py-3 flex-row items-center justify-between">
      <Text className="text-white text-xs flex-1 mr-2">{banner.message}</Text>
      {banner.actionLabel ? (
        <TouchableOpacity
          onPress={() => globalErrorState.dismissBanner()}
          className="bg-primary/30 px-3 py-1 rounded-lg"
        >
          <Text className="text-white text-xs font-bold">{banner.actionLabel}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => globalErrorState.dismissBanner()}>
          <Text className="text-white/40 text-sm">✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
