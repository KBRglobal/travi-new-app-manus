/**
 * Offline Badge Component
 * Shows "Offline — limited functionality" banner when no internet
 */

import React from 'react';
import { View, Text } from 'react-native';

export function OfflineBadge() {
  return (
    <View className="bg-yellow-500/20 border-b border-yellow-500/30 px-4 py-2">
      <Text className="text-yellow-400 text-xs text-center font-medium">
        Offline — limited functionality
      </Text>
    </View>
  );
}
