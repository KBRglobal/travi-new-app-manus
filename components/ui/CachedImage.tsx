/**
 * TRAVI — CachedImage Component
 * 
 * Drop-in replacement for React Native's Image component.
 * Uses expo-image for automatic caching, blurhash placeholders,
 * and smooth transitions.
 * 
 * Usage:
 * ```tsx
 * <CachedImage
 *   source={{ uri: 'https://example.com/photo.jpg' }}
 *   style={{ width: 200, height: 200 }}
 *   blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
 * />
 * ```
 */
import React from 'react';
import { Image, ImageProps, ImageContentFit } from 'expo-image';
import { StyleSheet, ViewStyle, ImageStyle } from 'react-native';

interface CachedImageProps {
  source: { uri: string } | number;
  style?: ImageStyle | ViewStyle;
  contentFit?: ImageContentFit;
  blurhash?: string;
  placeholder?: string;
  transition?: number;
  priority?: 'low' | 'normal' | 'high';
  recyclingKey?: string;
  onLoad?: () => void;
  onError?: () => void;
  accessibilityLabel?: string;
}

// Default blurhash for TRAVI dark theme (subtle purple gradient)
const DEFAULT_BLURHASH = 'L15#myWB00of~qj[00j[00j[00j[';

export function CachedImage({
  source,
  style,
  contentFit = 'cover',
  blurhash,
  placeholder,
  transition = 300,
  priority = 'normal',
  recyclingKey,
  onLoad,
  onError,
  accessibilityLabel,
}: CachedImageProps) {
  return (
    <Image
      source={source}
      style={style}
      contentFit={contentFit}
      placeholder={placeholder || blurhash || DEFAULT_BLURHASH}
      placeholderContentFit="cover"
      transition={transition}
      priority={priority}
      recyclingKey={recyclingKey}
      onLoad={onLoad}
      onError={onError}
      accessibilityLabel={accessibilityLabel}
      cachePolicy="memory-disk"
    />
  );
}

/**
 * Avatar — Circular cached image for user avatars.
 */
export function Avatar({
  source,
  size = 48,
  style,
  ...props
}: CachedImageProps & { size?: number }) {
  return (
    <CachedImage
      source={source}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
      {...props}
    />
  );
}

/**
 * DestinationImage — Full-width cached image for destination cards.
 */
export function DestinationImage({
  source,
  height = 200,
  borderRadius = 16,
  style,
  ...props
}: CachedImageProps & { height?: number; borderRadius?: number }) {
  return (
    <CachedImage
      source={source}
      style={[
        {
          width: '100%' as any,
          height,
          borderRadius,
        },
        style,
      ]}
      priority="high"
      {...props}
    />
  );
}

/**
 * HeroImage — Large hero/banner image with gradient overlay support.
 */
export function HeroImage({
  source,
  style,
  ...props
}: CachedImageProps) {
  return (
    <CachedImage
      source={source}
      style={[styles.hero, style]}
      priority="high"
      transition={500}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  hero: {
    width: '100%' as any,
    height: 300,
  },
});
