/**
 * Skeleton & Shimmer Loading Components
 * 
 * Usage:
 *   <Skeleton width={200} height={20} />
 *   <Skeleton.Circle size={48} />
 *   <Skeleton.Card />
 *   <Skeleton.List count={5} />
 *   <Skeleton.FlightCard />
 *   <Skeleton.HotelCard />
 *   <Skeleton.TripCard />
 *   <Skeleton.ProfileHeader />
 *   <Skeleton.WalletCard />
 *   <Skeleton.PointsCard />
 *   <Skeleton.FeedPost />
 */

import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, ViewStyle } from 'react-native';

// ─────────────────────────────────────────────────
// Shimmer Animation Hook
// ─────────────────────────────────────────────────

function useShimmer() {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(shimmerValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return shimmerValue;
}

// ─────────────────────────────────────────────────
// Base Skeleton Block
// ─────────────────────────────────────────────────

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  className?: string;
  style?: ViewStyle;
}

function SkeletonBase({
  width = '100%',
  height = 16,
  borderRadius = 8,
  className = '',
  style,
}: SkeletonProps) {
  const shimmer = useShimmer();

  const opacity = shimmer.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.6, 0.3],
  });

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
      className={className}
    />
  );
}

// ─────────────────────────────────────────────────
// Circle Skeleton (avatars)
// ─────────────────────────────────────────────────

function Circle({ size = 48 }: { size?: number }) {
  return <SkeletonBase width={size} height={size} borderRadius={size / 2} />;
}

// ─────────────────────────────────────────────────
// Text Line Skeleton
// ─────────────────────────────────────────────────

function TextLine({ width = '100%', height = 14 }: { width?: number | string; height?: number }) {
  return <SkeletonBase width={width} height={height} borderRadius={4} />;
}

// ─────────────────────────────────────────────────
// Generic Card Skeleton
// ─────────────────────────────────────────────────

function CardSkeleton() {
  return (
    <View className="bg-white/5 rounded-2xl p-4 mb-3 border border-white/5">
      <View className="flex-row items-center mb-3">
        <Circle size={40} />
        <View className="ml-3 flex-1">
          <TextLine width="60%" height={14} />
          <View className="h-2" />
          <TextLine width="40%" height={10} />
        </View>
      </View>
      <TextLine width="100%" height={12} />
      <View className="h-2" />
      <TextLine width="80%" height={12} />
      <View className="h-3" />
      <SkeletonBase width="100%" height={160} borderRadius={12} />
    </View>
  );
}

// ─────────────────────────────────────────────────
// List Skeleton (multiple rows)
// ─────────────────────────────────────────────────

function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <View>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} className="flex-row items-center py-3 px-4 border-b border-white/5">
          <Circle size={44} />
          <View className="ml-3 flex-1">
            <TextLine width="70%" height={14} />
            <View className="h-2" />
            <TextLine width="50%" height={11} />
          </View>
          <SkeletonBase width={60} height={24} borderRadius={12} />
        </View>
      ))}
    </View>
  );
}

// ─────────────────────────────────────────────────
// Flight Card Skeleton
// ─────────────────────────────────────────────────

function FlightCardSkeleton() {
  return (
    <View className="bg-white/5 rounded-2xl p-4 mb-3 border border-white/5">
      <View className="flex-row justify-between items-center mb-3">
        <View>
          <TextLine width={60} height={24} />
          <View className="h-1" />
          <TextLine width={80} height={10} />
        </View>
        <View className="items-center">
          <SkeletonBase width={100} height={2} borderRadius={1} />
          <View className="h-1" />
          <TextLine width={50} height={10} />
        </View>
        <View className="items-end">
          <TextLine width={60} height={24} />
          <View className="h-1" />
          <TextLine width={80} height={10} />
        </View>
      </View>
      <View className="flex-row justify-between items-center pt-3 border-t border-white/5">
        <View className="flex-row items-center">
          <Circle size={24} />
          <View className="ml-2">
            <TextLine width={80} height={12} />
          </View>
        </View>
        <TextLine width={70} height={20} />
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────
// Hotel Card Skeleton
// ─────────────────────────────────────────────────

function HotelCardSkeleton() {
  return (
    <View className="bg-white/5 rounded-2xl mb-3 border border-white/5 overflow-hidden">
      <SkeletonBase width="100%" height={180} borderRadius={0} />
      <View className="p-4">
        <TextLine width="70%" height={16} />
        <View className="h-2" />
        <TextLine width="50%" height={12} />
        <View className="h-3" />
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <SkeletonBase width={40} height={20} borderRadius={10} />
            <View className="w-2" />
            <TextLine width={60} height={12} />
          </View>
          <TextLine width={80} height={20} />
        </View>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────
// Trip Card Skeleton
// ─────────────────────────────────────────────────

function TripCardSkeleton() {
  return (
    <View className="bg-white/5 rounded-2xl mb-4 border border-white/5 overflow-hidden">
      <SkeletonBase width="100%" height={200} borderRadius={0} />
      <View className="p-4">
        <TextLine width="60%" height={18} />
        <View className="h-2" />
        <TextLine width="40%" height={12} />
        <View className="h-3" />
        <View className="flex-row justify-between">
          <SkeletonBase width={80} height={28} borderRadius={14} />
          <SkeletonBase width={80} height={28} borderRadius={14} />
          <SkeletonBase width={80} height={28} borderRadius={14} />
        </View>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────
// Profile Header Skeleton
// ─────────────────────────────────────────────────

function ProfileHeaderSkeleton() {
  return (
    <View className="items-center py-6">
      <Circle size={80} />
      <View className="h-3" />
      <TextLine width={120} height={18} />
      <View className="h-2" />
      <TextLine width={160} height={12} />
      <View className="h-4" />
      <View className="flex-row justify-center gap-6">
        <View className="items-center">
          <TextLine width={30} height={18} />
          <View className="h-1" />
          <TextLine width={40} height={10} />
        </View>
        <View className="items-center">
          <TextLine width={30} height={18} />
          <View className="h-1" />
          <TextLine width={40} height={10} />
        </View>
        <View className="items-center">
          <TextLine width={30} height={18} />
          <View className="h-1" />
          <TextLine width={40} height={10} />
        </View>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────
// Wallet Card Skeleton
// ─────────────────────────────────────────────────

function WalletCardSkeleton() {
  return (
    <View className="bg-white/5 rounded-3xl p-6 mb-4 border border-white/5">
      <TextLine width={80} height={12} />
      <View className="h-2" />
      <TextLine width={140} height={32} />
      <View className="h-4" />
      <View className="flex-row justify-between">
        <SkeletonBase width={90} height={36} borderRadius={18} />
        <SkeletonBase width={90} height={36} borderRadius={18} />
        <SkeletonBase width={90} height={36} borderRadius={18} />
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────
// Points Card Skeleton
// ─────────────────────────────────────────────────

function PointsCardSkeleton() {
  return (
    <View className="bg-white/5 rounded-3xl p-6 mb-4 border border-white/5">
      <View className="flex-row justify-between items-center mb-4">
        <View>
          <TextLine width={60} height={10} />
          <View className="h-2" />
          <TextLine width={100} height={28} />
        </View>
        <SkeletonBase width={60} height={24} borderRadius={12} />
      </View>
      <SkeletonBase width="100%" height={6} borderRadius={3} />
      <View className="h-2" />
      <TextLine width="50%" height={10} />
    </View>
  );
}

// ─────────────────────────────────────────────────
// Feed Post Skeleton
// ─────────────────────────────────────────────────

function FeedPostSkeleton() {
  return (
    <View className="bg-white/5 rounded-2xl p-4 mb-3 border border-white/5">
      <View className="flex-row items-center mb-3">
        <Circle size={36} />
        <View className="ml-3 flex-1">
          <TextLine width="40%" height={14} />
          <View className="h-1" />
          <TextLine width="25%" height={10} />
        </View>
      </View>
      <TextLine width="90%" height={12} />
      <View className="h-2" />
      <TextLine width="70%" height={12} />
      <View className="h-3" />
      <SkeletonBase width="100%" height={200} borderRadius={12} />
      <View className="h-3" />
      <View className="flex-row justify-between">
        <SkeletonBase width={60} height={20} borderRadius={10} />
        <SkeletonBase width={60} height={20} borderRadius={10} />
        <SkeletonBase width={60} height={20} borderRadius={10} />
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────
// Home Screen Skeleton
// ─────────────────────────────────────────────────

function HomeSkeleton() {
  return (
    <View className="px-4 pt-6">
      {/* Greeting */}
      <TextLine width={180} height={24} />
      <View className="h-2" />
      <TextLine width={220} height={14} />
      <View className="h-6" />

      {/* AI Suggestion Card */}
      <SkeletonBase width="100%" height={120} borderRadius={16} />
      <View className="h-6" />

      {/* Quick Actions */}
      <View className="flex-row justify-between mb-6">
        {[1, 2, 3, 4].map((i) => (
          <View key={i} className="items-center">
            <SkeletonBase width={56} height={56} borderRadius={16} />
            <View className="h-2" />
            <TextLine width={48} height={10} />
          </View>
        ))}
      </View>

      {/* Section Title */}
      <TextLine width={140} height={16} />
      <View className="h-3" />

      {/* Horizontal Cards */}
      <View className="flex-row">
        {[1, 2].map((i) => (
          <View key={i} className="mr-3">
            <SkeletonBase width={240} height={160} borderRadius={16} />
            <View className="h-2" />
            <TextLine width={160} height={14} />
            <View className="h-1" />
            <TextLine width={100} height={10} />
          </View>
        ))}
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────
// Explore Screen Skeleton
// ─────────────────────────────────────────────────

function ExploreSkeleton() {
  return (
    <View className="px-4 pt-6">
      {/* Search Bar */}
      <SkeletonBase width="100%" height={48} borderRadius={24} />
      <View className="h-4" />

      {/* Category Pills */}
      <View className="flex-row mb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <View key={i} className="mr-2">
            <SkeletonBase width={80} height={32} borderRadius={16} />
          </View>
        ))}
      </View>

      {/* Destination Cards Grid */}
      <View className="flex-row flex-wrap justify-between">
        {[1, 2, 3, 4].map((i) => (
          <View key={i} className="w-[48%] mb-4">
            <SkeletonBase width="100%" height={140} borderRadius={16} />
            <View className="h-2" />
            <TextLine width="70%" height={14} />
            <View className="h-1" />
            <TextLine width="50%" height={10} />
          </View>
        ))}
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────
// Itinerary Skeleton
// ─────────────────────────────────────────────────

function ItinerarySkeleton() {
  return (
    <View className="px-4 pt-4">
      {/* Day selector */}
      <View className="flex-row mb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <View key={i} className="mr-2">
            <SkeletonBase width={56} height={64} borderRadius={12} />
          </View>
        ))}
      </View>

      {/* Timeline items */}
      {[1, 2, 3, 4].map((i) => (
        <View key={i} className="flex-row mb-4">
          <View className="items-center mr-3">
            <TextLine width={40} height={12} />
            <View className="h-1" />
            <SkeletonBase width={2} height={60} borderRadius={1} />
          </View>
          <View className="flex-1 bg-white/5 rounded-xl p-3 border border-white/5">
            <TextLine width="60%" height={14} />
            <View className="h-2" />
            <TextLine width="80%" height={11} />
            <View className="h-1" />
            <TextLine width="40%" height={11} />
          </View>
        </View>
      ))}
    </View>
  );
}

// ─────────────────────────────────────────────────
// Notification Skeleton
// ─────────────────────────────────────────────────

function NotificationSkeleton() {
  return (
    <View>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <View key={i} className="flex-row items-start p-4 border-b border-white/5">
          <SkeletonBase width={40} height={40} borderRadius={12} />
          <View className="ml-3 flex-1">
            <TextLine width="80%" height={14} />
            <View className="h-2" />
            <TextLine width="60%" height={11} />
            <View className="h-1" />
            <TextLine width="30%" height={10} />
          </View>
          <SkeletonBase width={8} height={8} borderRadius={4} />
        </View>
      ))}
    </View>
  );
}

// ─────────────────────────────────────────────────
// Export all as Skeleton.X
// ─────────────────────────────────────────────────

export const Skeleton = Object.assign(SkeletonBase, {
  Circle,
  TextLine,
  Card: CardSkeleton,
  List: ListSkeleton,
  FlightCard: FlightCardSkeleton,
  HotelCard: HotelCardSkeleton,
  TripCard: TripCardSkeleton,
  ProfileHeader: ProfileHeaderSkeleton,
  WalletCard: WalletCardSkeleton,
  PointsCard: PointsCardSkeleton,
  FeedPost: FeedPostSkeleton,
  Home: HomeSkeleton,
  Explore: ExploreSkeleton,
  Itinerary: ItinerarySkeleton,
  Notification: NotificationSkeleton,
});
