/**
 * Offline Badge Component
 * Design System: Satoshi font, warning color
 */

import React from 'react';
import { View, Text } from 'react-native';
import { colors, fonts, fontSizes } from '@/constants/theme';

export function OfflineBadge() {
  return (
    <View
      style={{
        backgroundColor: colors.warningLight,
        borderBottomWidth: 1,
        borderBottomColor: colors.warning,
        paddingHorizontal: 16,
        paddingVertical: 8,
      }}
    >
      <Text
        style={{
          fontFamily: fonts.bold,
          fontSize: fontSizes.caption,
          color: colors.warning,
          textAlign: 'center',
        }}
      >
        Offline — limited functionality
      </Text>
    </View>
  );
}
