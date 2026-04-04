import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  type TouchableOpacityProps,
  type ViewStyle,
} from 'react-native';
import { colors, radius, shadows, fonts } from '../../constants/theme';

/* ═══════════════════════════════════════════
 *  TRAVI — Button
 *  Design System: Chillax/Satoshi fonts, brand colors, rounded corners
 *
 *  Variants : primary | secondary | outline | ghost | danger | pink | gradient
 *  Sizes    : sm | md | lg
 *  States   : loading | disabled
 *  Extras   : leftIcon / rightIcon (ReactNode)
 * ═══════════════════════════════════════════ */

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'pink' | 'gradient';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<TouchableOpacityProps, 'children'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

/* ── className maps ────────────────────── */

const containerVariant: Record<ButtonVariant, string> = {
  primary: 'bg-primary active:bg-primary-dark',
  secondary: 'bg-bg-card border border-border-strong active:bg-bg-surface',
  outline: 'border border-primary bg-transparent active:bg-primary-light',
  ghost: 'bg-transparent active:bg-bg-surface',
  danger: 'bg-error active:opacity-80',
  pink: 'bg-pink active:bg-pink-dark',
  gradient: 'bg-primary active:bg-primary-dark',
};

const textVariant: Record<ButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-text-primary',
  outline: 'text-primary',
  ghost: 'text-primary',
  danger: 'text-white',
  pink: 'text-white',
  gradient: 'text-white',
};

const containerSize: Record<ButtonSize, string> = {
  sm: 'px-4 py-2',
  md: 'px-6 py-3',
  lg: 'px-8 py-4',
};

const textSizeMap: Record<ButtonSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
};

const spinnerColor: Record<ButtonVariant, string> = {
  primary: '#FFFFFF',
  secondary: '#FFFFFF',
  outline: colors.primary,
  ghost: colors.primary,
  danger: '#FFFFFF',
  pink: '#FFFFFF',
  gradient: '#FFFFFF',
};

export default function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className: extraClass = '',
  style,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const containerCls = [
    'flex-row items-center justify-center',
    containerVariant[variant],
    containerSize[size],
    fullWidth ? 'w-full' : 'self-start',
    isDisabled ? 'opacity-50' : '',
    extraClass,
  ]
    .filter(Boolean)
    .join(' ');

  const buttonStyle: ViewStyle = {
    borderRadius: size === 'lg' ? radius.button : radius.button,
    ...(variant === 'primary' || variant === 'gradient' ? shadows.fab : {}),
    ...(typeof style === 'object' && !Array.isArray(style) ? style : {}),
  };

  return (
    <TouchableOpacity
      className={containerCls}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={buttonStyle}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={spinnerColor[variant]}
          style={{ marginRight: 8 }}
        />
      ) : leftIcon ? (
        <>{leftIcon}</>
      ) : null}

      <Text
        style={{
          fontFamily: fonts.bold,
          fontSize: textSizeMap[size],
          color: textVariant[variant].includes('primary')
            ? (variant === 'outline' || variant === 'ghost' ? colors.primary : colors.text.primary)
            : variant === 'secondary' ? colors.text.primary : '#FFFFFF',
        }}
      >
        {title}
      </Text>

      {rightIcon && !loading ? <>{rightIcon}</> : null}
    </TouchableOpacity>
  );
}
