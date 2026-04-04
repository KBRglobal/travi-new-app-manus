import React, { useState } from 'react';
import { TextInput, View, Text, TextInputProps, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, radius, spacing } from '@/constants/theme';

type ThemedInputProps = TextInputProps & {
  label?: string;
  error?: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  containerStyle?: ViewStyle;
};

export function ThemedInput({
  label,
  error,
  icon,
  containerStyle,
  style,
  ...props
}: ThemedInputProps) {
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? colors.border.error
    : focused
    ? colors.border.focus
    : colors.border.input;

  return (
    <View style={containerStyle}>
      {label && (
        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: fontSizes.label,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: colors.text.tertiary,
            marginBottom: 8,
          }}
        >
          {label}
        </Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'rgba(36,16,62,0.8)',
          borderWidth: 1.5,
          borderColor,
          borderRadius: radius.input,
          paddingHorizontal: 16,
          paddingVertical: 14,
        }}
      >
        {icon && (
          <MaterialIcons
            name={icon}
            size={20}
            color={focused ? colors.pink : colors.text.tertiary}
            style={{ marginRight: 12 }}
          />
        )}
        <TextInput
          placeholderTextColor={colors.text.placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={[
            {
              flex: 1,
              fontFamily: fonts.body,
              fontSize: fontSizes.body,
              color: colors.text.primary,
              padding: 0,
            },
            style,
          ]}
          {...props}
        />
      </View>
      {error && (
        <Text
          style={{
            fontFamily: fonts.body,
            fontSize: fontSizes.caption,
            color: colors.orange,
            marginTop: 6,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
