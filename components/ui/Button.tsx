import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  type TouchableOpacityProps,
} from 'react-native';

/* ═══════════════════════════════════════════
 *  TRAVI — Button
 *  NativeWind v4 className only — no StyleSheet
 *
 *  Variants : primary | secondary | outline | ghost | danger | pink
 *  Sizes    : sm | md | lg
 *  States   : loading | disabled
 *  Extras   : leftIcon / rightIcon (ReactNode)
 * ═══════════════════════════════════════════ */

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'pink';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<TouchableOpacityProps, 'children'> {
  /** Button label */
  title: string;
  /** Visual variant */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Show spinner & disable interactions */
  loading?: boolean;
  /** Optional icon before the label */
  leftIcon?: React.ReactNode;
  /** Optional icon after the label */
  rightIcon?: React.ReactNode;
  /** Full-width mode */
  fullWidth?: boolean;
}

/* ── className maps ────────────────────── */

const containerVariant: Record<ButtonVariant, string> = {
  primary: 'bg-primary active:bg-primary-dark',
  secondary: 'bg-bg-card border border-border-strong active:bg-bg-surface',
  outline: 'border border-primary bg-transparent active:bg-primary-light',
  ghost: 'bg-transparent active:bg-bg-surface',
  danger: 'bg-status-error active:opacity-80',
  pink: 'bg-pink active:bg-pink-dark',
};

const textVariant: Record<ButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-text-primary',
  outline: 'text-primary',
  ghost: 'text-primary',
  danger: 'text-white',
  pink: 'text-white',
};

const containerSize: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 rounded-button',
  md: 'px-6 py-3 rounded-button',
  lg: 'px-8 py-4 rounded-button',
};

const textSize: Record<ButtonSize, string> = {
  sm: 'text-body-sm',
  md: 'text-body font-semibold',
  lg: 'text-body font-bold',
};

const spinnerColor: Record<ButtonVariant, string> = {
  primary: '#FFFFFF',
  secondary: '#FFFFFF',
  outline: '#6443F4',
  ghost: '#6443F4',
  danger: '#FFFFFF',
  pink: '#FFFFFF',
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

  const textCls = [textVariant[variant], textSize[size]].join(' ');

  return (
    <TouchableOpacity
      className={containerCls}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={spinnerColor[variant]}
          className="mr-2"
        />
      ) : leftIcon ? (
        <>{leftIcon}</>
      ) : null}

      <Text className={textCls}>{title}</Text>

      {rightIcon && !loading ? <>{rightIcon}</> : null}
    </TouchableOpacity>
  );
}
