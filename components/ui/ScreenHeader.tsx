import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconButton } from './IconButton';
import { fonts, fontSizes, colors, spacing } from '@/constants/theme';

type ScreenHeaderProps = {
  title?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
};

export function ScreenHeader({ title, showBack = true, rightAction }: ScreenHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: insets.top + 8,
        paddingHorizontal: spacing.screenH,
        paddingBottom: 12,
      }}
    >
      {showBack ? (
        <IconButton name="arrow-back" onPress={() => router.back()} />
      ) : (
        <View style={{ width: 40 }} />
      )}

      {title ? (
        <Text
          style={{
            fontFamily: fonts.headingSemibold,
            fontSize: fontSizes.h4,
            color: colors.text.primary,
            flex: 1,
            textAlign: 'center',
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
      ) : (
        <View style={{ flex: 1 }} />
      )}

      {rightAction || <View style={{ width: 40 }} />}
    </View>
  );
}
