/**
 * Global Toast Component
 * Design System: Satoshi fonts, brand status colors, pill radius
 */

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { toast } from '@/lib/errorHandling';
import { colors, fonts, fontSizes, radius } from '@/constants/theme';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastData {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
}

const TOAST_COLORS: Record<ToastType, { bg: string; border: string; emoji: string }> = {
  success: { bg: colors.successLight, border: colors.success, emoji: '✅' },
  error: { bg: colors.errorLight, border: colors.error, emoji: '❌' },
  warning: { bg: colors.warningLight, border: colors.warning, emoji: '⚠️' },
  info: { bg: colors.primaryLight, border: colors.primary, emoji: 'ℹ️' },
};

export function ToastProvider() {
  const [currentToast, setCurrentToast] = useState<ToastData | null>(null);

  useEffect(() => {
    const unsubscribe = toast.subscribe((t) => {
      setCurrentToast(t);
    });
    return unsubscribe;
  }, []);

  if (!currentToast) return null;

  const style = TOAST_COLORS[currentToast.type];

  return (
    <View className="absolute top-16 left-4 right-4 z-50">
      <TouchableOpacity
        onPress={() => toast.dismiss()}
        activeOpacity={0.9}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: radius.card,
          backgroundColor: style.bg,
          borderWidth: 1,
          borderColor: style.border,
        }}
      >
        <Text style={{ fontSize: 18, marginRight: 8 }}>{style.emoji}</Text>
        <Text
          style={{
            fontFamily: fonts.body,
            fontSize: fontSizes.bodySm,
            color: colors.text.primary,
            flex: 1,
          }}
        >
          {currentToast.message}
        </Text>
        <Text
          style={{
            fontFamily: fonts.body,
            fontSize: fontSizes.caption,
            color: colors.text.muted,
            marginLeft: 8,
          }}
        >
          ✕
        </Text>
      </TouchableOpacity>
    </View>
  );
}
