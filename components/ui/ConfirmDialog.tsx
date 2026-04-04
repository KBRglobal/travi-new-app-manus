/**
 * Global Confirm Dialog Component
 * Used for price changes, booking confirmations, etc.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { globalErrorState } from '@/lib/errorHandling';

interface ConfirmData {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export function ConfirmDialogProvider() {
  const [confirm, setConfirm] = useState<ConfirmData | null>(null);

  useEffect(() => {
    const unsubscribe = globalErrorState.subscribeConfirm((c) => {
      setConfirm(c);
    });
    return unsubscribe;
  }, []);

  if (!confirm) return null;

  const handleConfirm = () => {
    confirm.onConfirm();
    globalErrorState.dismissConfirm();
  };

  const handleCancel = () => {
    confirm.onCancel?.();
    globalErrorState.dismissConfirm();
  };

  return (
    <Modal transparent animationType="fade" visible={!!confirm}>
      <View className="flex-1 bg-black/70 items-center justify-center px-8">
        <View className="bg-bg-card w-full rounded-3xl p-6">
          <Text className="text-white text-xl font-bold mb-2">{confirm.title}</Text>
          <Text className="text-white/60 text-sm mb-6">{confirm.message}</Text>
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={handleCancel}
              className="flex-1 py-3 rounded-xl border border-white/10"
            >
              <Text className="text-white text-center font-medium">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirm}
              className="flex-1 py-3 rounded-xl bg-primary"
            >
              <Text className="text-white text-center font-bold">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
