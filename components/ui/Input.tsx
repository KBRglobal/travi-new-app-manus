import React, { useState } from 'react';
import { View, Text, TextInput, type TextInputProps } from 'react-native';

/* ═══════════════════════════════════════════
 *  TRAVI — Input
 *  NativeWind v4 className only — no StyleSheet
 *
 *  Variants : default | filled | outline
 *  States   : focused | error | disabled
 *  Extras   : label, hint, error message,
 *             leftIcon / rightIcon (ReactNode)
 * ═══════════════════════════════════════════ */

type InputVariant = 'default' | 'filled' | 'outline';

interface InputProps extends TextInputProps {
  /** Label shown above the field */
  label?: string;
  /** Hint text below the field */
  hint?: string;
  /** Error message — also switches to error styling */
  error?: string;
  /** Visual variant */
  variant?: InputVariant;
  /** Icon before the text */
  leftIcon?: React.ReactNode;
  /** Icon / action after the text */
  rightIcon?: React.ReactNode;
  /** Additional container className */
  containerClassName?: string;
}

/* ── className maps ────────────────────── */

const baseContainer =
  'flex-row items-center rounded-input px-4';

const variantContainer: Record<InputVariant, string> = {
  default: 'bg-bg-card border border-border',
  filled: 'bg-bg-surface border border-transparent',
  outline: 'bg-transparent border border-border-strong',
};

const focusedBorder = 'border-primary';
const errorBorder = 'border-status-error';

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
  ...rest
}: InputProps) {
  const [focused, setFocused] = useState(false);

  const disabled = editable === false;

  /* Build container className */
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

  /* Build TextInput className */
  const inputCls = [
    'flex-1 text-text-primary text-body py-3',
    leftIcon ? 'ml-2' : '',
    rightIcon ? 'mr-2' : '',
    extraClass,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <View className="mb-4">
      {label && (
        <Text className="text-text-secondary text-body-sm mb-1.5 ml-1">
          {label}
        </Text>
      )}

      <View className={containerCls}>
        {leftIcon && <>{leftIcon}</>}

        <TextInput
          className={inputCls}
          placeholderTextColor="rgba(255,255,255,0.3)"
          editable={editable}
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
        <Text className="text-status-error text-caption mt-1 ml-1">
          {error}
        </Text>
      ) : hint ? (
        <Text className="text-text-muted text-caption mt-1 ml-1">{hint}</Text>
      ) : null}
    </View>
  );
}
