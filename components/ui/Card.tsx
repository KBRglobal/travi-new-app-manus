import React from 'react';
import {
  View,
  TouchableOpacity,
  type ViewProps,
  type ViewStyle,
  type TouchableOpacityProps,
} from 'react-native';
import { shadows, radius } from '../../constants/theme';

/* ═══════════════════════════════════════════
 *  TRAVI — Card
 *  Design System: #120824 bg, 16px radius, card shadow
 *
 *  Variants  : default | elevated | outlined | surface | gradient
 *  Pressable : when onPress is provided, wraps in TouchableOpacity
 *  Slots     : header, footer (ReactNode)
 * ═══════════════════════════════════════════ */

type CardVariant = 'default' | 'elevated' | 'outlined' | 'surface' | 'gradient';

interface CardProps extends ViewProps {
  variant?: CardVariant;
  onPress?: TouchableOpacityProps['onPress'];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  disabled?: boolean;
}

const base = 'overflow-hidden';

const variantCls: Record<CardVariant, string> = {
  default: 'bg-bg-card',
  elevated: 'bg-bg-card',
  outlined: 'bg-transparent border border-border',
  surface: 'bg-bg-surface',
  gradient: 'bg-primary',
};

const variantStyle: Record<CardVariant, ViewStyle> = {
  default: { borderRadius: radius.card },
  elevated: { borderRadius: radius.card, ...shadows.card },
  outlined: { borderRadius: radius.card },
  surface: { borderRadius: radius.card },
  gradient: { borderRadius: radius.card, ...shadows.glow },
};

export default function Card({
  variant = 'default',
  onPress,
  header,
  footer,
  disabled = false,
  children,
  className: extraClass = '',
  style,
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

  const combinedStyle: ViewStyle = {
    ...variantStyle[variant],
    ...(typeof style === 'object' && !Array.isArray(style) ? style : {}),
  };

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
        style={combinedStyle}
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
    <View className={containerCls} style={combinedStyle} {...rest}>
      {inner}
    </View>
  );
}
