import React, { useState } from 'react';
import { View, Text, TextInput, type TextInputProps, type ViewStyle } from 'react-native';
import { colors, fonts, fontSizes, radius } from '../../constants/theme';

/* ═══════════════════════════════════════════
 *  TRAVI — Input
 *  Design System: Satoshi fonts, #120824 bg, 12px radius
 *
 *  Variants : default | filled | outline
 *  States   : focused | error | disabled
 *  Extras   : label, hint, error message,
 *             leftIcon / rightIcon (ReactNode)
 * ═══════════════════════════════════════════ */

type InputVariant = 'default' | 'filled' | 'outline';

interface InputProps extends TextInputProps {
  label?: string;
  hint?: string;
  error?: string;
  variant?: InputVariant;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

const baseContainer = 'flex-row items-center px-4';

const variantContainer: Record<InputVariant, string> = {
  default: 'bg-bg-card border border-border',
  filled: 'bg-bg-surface border border-transparent',
  outline: 'bg-transparent border border-border-strong',
};

const focusedBorder = 'border-primary';
const errorBorder = 'border-error';

export default function Input({
  label,
  hint,
  error,
  variant = 'default',
  leftIcon,
  rightIcon,
  editable = true,
  containerClassName = '',
  className: extraClass = '',
  style,
  ...rest
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const disabled = editable === false;

  const containerCls = [
    baseContainer,
    variantContainer[variant],
    focused && !error ? focusedBorder : '',
    error ? errorBorder : '',
    disabled ? 'opacity-50' : '',
    containerClassName,
  ]
    .filter(Boolean)
    .join(' ');

  const inputCls = [
    'flex-1 text-text-primary py-3',
    leftIcon ? 'ml-2' : '',
    rightIcon ? 'mr-2' : '',
    extraClass,
  ]
    .filter(Boolean)
    .join(' ');

  const containerStyle: ViewStyle = {
    borderRadius: radius.input,
  };

  return (
    <View className="mb-4">
      {label && (
        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: fontSizes.bodySm,
            color: colors.text.secondary,
            marginBottom: 6,
            marginLeft: 4,
          }}
        >
          {label}
        </Text>
      )}

      <View className={containerCls} style={containerStyle}>
        {leftIcon && <>{leftIcon}</>}

        <TextInput
          className={inputCls}
          placeholderTextColor={colors.text.muted}
          editable={editable}
          style={{
            fontFamily: fonts.body,
            fontSize: fontSizes.body,
            color: colors.text.primary,
          }}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          {...rest}
        />

        {rightIcon && <>{rightIcon}</>}
      </View>

      {error ? (
        <Text
          style={{
            fontFamily: fonts.body,
            fontSize: fontSizes.caption,
            color: colors.error,
            marginTop: 4,
            marginLeft: 4,
          }}
        >
          {error}
        </Text>
      ) : hint ? (
        <Text
          style={{
            fontFamily: fonts.body,
            fontSize: fontSizes.caption,
            color: colors.text.muted,
            marginTop: 4,
            marginLeft: 4,
          }}
        >
          {hint}
        </Text>
      ) : null}
    </View>
  );
}
