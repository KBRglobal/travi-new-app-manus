import React from 'react';
import {
  View,
  TouchableOpacity,
  type ViewProps,
  type TouchableOpacityProps,
} from 'react-native';

/* ═══════════════════════════════════════════
 *  TRAVI — Card
 *  NativeWind v4 className only — no StyleSheet
 *
 *  Variants  : default | elevated | outlined | surface | gradient
 *  Pressable : when onPress is provided, wraps in TouchableOpacity
 *  Slots     : header, footer (ReactNode)
 * ═══════════════════════════════════════════ */

type CardVariant = 'default' | 'elevated' | 'outlined' | 'surface' | 'gradient';

interface CardProps extends ViewProps {
  /** Visual variant */
  variant?: CardVariant;
  /** Makes the card pressable */
  onPress?: TouchableOpacityProps['onPress'];
  /** Content rendered above children */
  header?: React.ReactNode;
  /** Content rendered below children */
  footer?: React.ReactNode;
  /** Disable interaction (only relevant when pressable) */
  disabled?: boolean;
}

/* ── className maps ────────────────────── */

const base = 'rounded-card overflow-hidden';

const variantCls: Record<CardVariant, string> = {
  default: 'bg-bg-card',
  elevated: 'bg-bg-card shadow-card',
  outlined: 'bg-transparent border border-border',
  surface: 'bg-bg-surface',
  gradient: 'bg-primary',
};

export default function Card({
  variant = 'default',
  onPress,
  header,
  footer,
  disabled = false,
  children,
  className: extraClass = '',
  ...rest
}: CardProps) {
  const containerCls = [
    base,
    variantCls[variant],
    disabled ? 'opacity-50' : '',
    extraClass,
  ]
    .filter(Boolean)
    .join(' ');

  const inner = (
    <>
      {header && <View className="px-4 pt-4">{header}</View>}
      <View className="p-4">{children}</View>
      {footer && (
        <View className="px-4 pb-4 border-t border-border">{footer}</View>
      )}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        className={containerCls}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
        {...(rest as TouchableOpacityProps)}
      >
        {inner}
      </TouchableOpacity>
    );
  }

  return (
    <View className={containerCls} {...rest}>
      {inner}
    </View>
  );
}
