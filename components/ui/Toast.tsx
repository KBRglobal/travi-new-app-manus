/**
 * Global Toast Component
 * Subscribes to ToastManager and renders toast messages with animation
 */

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { toast } from '@/lib/errorHandling';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastData {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
}

const TOAST_STYLES: Record<ToastType, { bg: string; border: string; emoji: string }> = {
  success: { bg: 'bg-green-500/20', border: 'border-green-500/30', emoji: '✅' },
  error: { bg: 'bg-red-500/20', border: 'border-red-500/30', emoji: '❌' },
  warning: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', emoji: '⚠️' },
  info: { bg: 'bg-blue-500/20', border: 'border-blue-500/30', emoji: 'ℹ️' },
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

  const style = TOAST_STYLES[currentToast.type];

  return (
    <View className="absolute top-16 left-4 right-4 z-50">
      <TouchableOpacity
        onPress={() => toast.dismiss()}
        activeOpacity={0.9}
        className={`flex-row items-center px-4 py-3 rounded-2xl border ${style.bg} ${style.border}`}
      >
        <Text className="text-lg mr-2">{style.emoji}</Text>
        <Text className="text-white text-sm flex-1">{currentToast.message}</Text>
        <Text className="text-white/40 text-xs ml-2">✕</Text>
      </TouchableOpacity>
    </View>
  );
}
