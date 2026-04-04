/**
 * Global Confirm Dialog Component
 * Design System: Chillax headings, Satoshi body, modal radius, brand colors
 */

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { globalErrorState } from '@/lib/errorHandling';
import { colors, fonts, fontSizes, radius, shadows } from '@/constants/theme';

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
      <View
        style={{
          flex: 1,
          backgroundColor: colors.bg.overlay,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 32,
        }}
      >
        <View
          style={{
            backgroundColor: colors.bg.card,
            width: '100%',
            borderRadius: radius.modal,
            padding: 24,
            ...shadows.card,
          }}
        >
          <Text
            style={{
              fontFamily: fonts.heading,
              fontSize: fontSizes.h2,
              color: colors.text.primary,
              marginBottom: 8,
            }}
          >
            {confirm.title}
          </Text>
          <Text
            style={{
              fontFamily: fonts.body,
              fontSize: fontSizes.bodySm,
              color: colors.text.secondary,
              marginBottom: 24,
            }}
          >
            {confirm.message}
          </Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity
              onPress={handleCancel}
              style={{
                flex: 1,
                paddingVertical: 12,
                borderRadius: radius.button,
                borderWidth: 1,
                borderColor: colors.border.default,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.bold,
                  fontSize: fontSizes.body,
                  color: colors.text.primary,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirm}
              style={{
                flex: 1,
                paddingVertical: 12,
                borderRadius: radius.button,
                backgroundColor: colors.primary,
                alignItems: 'center',
                ...shadows.fab,
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.bold,
                  fontSize: fontSizes.body,
                  color: '#FFFFFF',
                }}
              >
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
