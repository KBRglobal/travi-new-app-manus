import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../constants/theme';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

/**
 * SkeletonLoader — Animated placeholder for loading states.
 * Uses a pulsing opacity animation to indicate content is loading.
 */
export function Skeleton({ width = '100%', height = 20, borderRadius = 8, style }: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor: 'rgba(255,255,255,0.08)',
          opacity,
        },
        style,
      ]}
    />
  );
}

/**
 * SkeletonCard — Card-shaped skeleton for destination/trip cards.
 */
export function SkeletonCard() {
  return (
    <View style={styles.card}>
      <Skeleton height={160} borderRadius={16} />
      <View style={styles.cardContent}>
        <Skeleton width="60%" height={18} />
        <Skeleton width="40%" height={14} style={{ marginTop: 8 }} />
        <Skeleton width="30%" height={14} style={{ marginTop: 8 }} />
      </View>
    </View>
  );
}

/**
 * SkeletonListItem — Row-shaped skeleton for list items.
 */
export function SkeletonListItem() {
  return (
    <View style={styles.listItem}>
      <Skeleton width={48} height={48} borderRadius={24} />
      <View style={styles.listItemContent}>
        <Skeleton width="70%" height={16} />
        <Skeleton width="50%" height={12} style={{ marginTop: 6 }} />
      </View>
    </View>
  );
}

/**
 * SkeletonProfile — Profile header skeleton.
 */
export function SkeletonProfile() {
  return (
    <View style={styles.profile}>
      <Skeleton width={80} height={80} borderRadius={40} />
      <Skeleton width="50%" height={20} style={{ marginTop: 12 }} />
      <Skeleton width="30%" height={14} style={{ marginTop: 8 }} />
    </View>
  );
}

/**
 * SkeletonScreen — Full screen skeleton layout.
 */
export function SkeletonScreen({ variant = 'list' }: { variant?: 'list' | 'cards' | 'detail' }) {
  if (variant === 'cards') {
    return (
      <View style={styles.screen}>
        <Skeleton width="40%" height={28} style={{ marginBottom: 16 }} />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </View>
    );
  }

  if (variant === 'detail') {
    return (
      <View style={styles.screen}>
        <Skeleton height={240} borderRadius={0} />
        <View style={{ padding: 16 }}>
          <Skeleton width="70%" height={24} />
          <Skeleton width="90%" height={14} style={{ marginTop: 12 }} />
          <Skeleton width="80%" height={14} style={{ marginTop: 8 }} />
          <Skeleton width="60%" height={14} style={{ marginTop: 8 }} />
          <View style={{ marginTop: 24 }}>
            <Skeleton width="40%" height={20} />
            <SkeletonListItem />
            <SkeletonListItem />
            <SkeletonListItem />
          </View>
        </View>
      </View>
    );
  }

  // Default: list variant
  return (
    <View style={styles.screen}>
      <Skeleton width="40%" height={28} style={{ marginBottom: 16 }} />
      <SkeletonListItem />
      <SkeletonListItem />
      <SkeletonListItem />
      <SkeletonListItem />
      <SkeletonListItem />
      <SkeletonListItem />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bg.surface,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  listItemContent: {
    flex: 1,
  },
  profile: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.bg.primary,
    padding: 16,
    paddingTop: 48,
  },
});
