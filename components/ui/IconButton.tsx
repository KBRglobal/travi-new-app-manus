import React from 'react';
import { ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { PressableScale } from './PressableScale';
import { colors, header } from '@/constants/theme';

type IconButtonProps = {
  name: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
  size?: number;
  color?: string;
  style?: ViewStyle;
};

export function IconButton({
  name,
  onPress,
  size = 22,
  color = colors.text.primary,
  style,
}: IconButtonProps) {
  return (
    <PressableScale
      onPress={onPress}
      style={[
        {
          width: header.backButtonSize,
          height: header.backButtonSize,
          borderRadius: header.backButtonSize / 2,
          backgroundColor: 'rgba(255,255,255,0.08)',
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.12)',
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <MaterialIcons name={name} size={size} color={color} />
    </PressableScale>
  );
}
