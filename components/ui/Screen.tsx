import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  type ViewProps,
} from 'react-native';
import { useRouter } from 'expo-router';

/* ═══════════════════════════════════════════
 *  TRAVI — Screen
 *  NativeWind v4 className only — no StyleSheet
 *
 *  A consistent full-screen wrapper that handles:
 *  • Dark bg-primary background
 *  • Safe-area insets (pt-safe, pb-safe)
 *  • Optional scroll (default: true)
 *  • Optional header with back button + title + right action
 *  • Keyboard avoiding on iOS
 *  • Responsive horizontal padding (px-4 sm:px-6 lg:px-8)
 * ═══════════════════════════════════════════ */

interface ScreenProps extends ViewProps {
  /** Screen title shown in the header */
  title?: string;
  /** Show a back arrow that calls router.back() */
  showBack?: boolean;
  /** Custom back handler (overrides default router.back) */
  onBack?: () => void;
  /** Right-side header action (ReactNode) */
  headerRight?: React.ReactNode;
  /** Wrap children in a ScrollView (default: true) */
  scroll?: boolean;
  /** Avoid keyboard on iOS (default: true) */
  avoidKeyboard?: boolean;
  /** Extra className for the outer container */
  containerClassName?: string;
  /** Extra className for the scroll / content area */
  contentClassName?: string;
}

export default function Screen({
  title,
  showBack = false,
  onBack,
  headerRight,
  scroll = true,
  avoidKeyboard = true,
  containerClassName = '',
  contentClassName = '',
  children,
  ...rest
}: ScreenProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  /* ── Header ────────────────────────────── */
  const header =
    title || showBack || headerRight ? (
      <View className="flex-row items-center px-4 sm:px-6 lg:px-8 pt-safe pb-3">
        {showBack && (
          <TouchableOpacity
            onPress={handleBack}
            className="mr-3 w-10 h-10 items-center justify-center rounded-full active:bg-bg-surface"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text className="text-white text-xl">‹</Text>
          </TouchableOpacity>
        )}

        {title && (
          <Text
            className="text-white text-heading-3 flex-1"
            numberOfLines={1}
          >
            {title}
          </Text>
        )}

        {headerRight && (
          <View className="ml-auto">{headerRight}</View>
        )}
      </View>
    ) : null;

  /* ── Content ───────────────────────────── */
  const contentCls = [
    'flex-1 px-4 sm:px-6 lg:px-8',
    contentClassName,
  ]
    .filter(Boolean)
    .join(' ');

  const content = scroll ? (
    <ScrollView
      className={contentCls}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="pb-safe"
    >
      {children}
    </ScrollView>
  ) : (
    <View className={contentCls}>{children}</View>
  );

  /* ── Outer shell ───────────────────────── */
  const outerCls = ['flex-1 bg-bg-primary', containerClassName]
    .filter(Boolean)
    .join(' ');

  const shell = (
    <View className={outerCls} {...rest}>
      {header}
      {content}
    </View>
  );

  if (avoidKeyboard && Platform.OS === 'ios') {
    return (
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        {shell}
      </KeyboardAvoidingView>
    );
  }

  return shell;
}
