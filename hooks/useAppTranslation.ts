/**
 * TRAVI — useAppTranslation Hook
 * 
 * Wrapper around react-i18next's useTranslation with RTL-aware helpers.
 * 
 * Usage:
 * ```tsx
 * const { t, isRTL, rtlStyle, rtlFlexRow } = useAppTranslation();
 * 
 * <Text>{t('home.greeting', { name: 'John' })}</Text>
 * <View style={rtlFlexRow}>...</View>
 * ```
 */
import { useTranslation } from 'react-i18next';
import { I18nManager, ViewStyle, TextStyle } from 'react-native';
import { useMemo } from 'react';

export function useAppTranslation(namespace?: string) {
  const { t, i18n } = useTranslation(namespace);
  const isRTL = I18nManager.isRTL;

  const rtlStyles = useMemo(() => ({
    // Flex row that respects RTL direction
    rtlFlexRow: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
    } as ViewStyle,

    // Text alignment
    rtlTextAlign: {
      textAlign: isRTL ? 'right' : 'left',
    } as TextStyle,

    // Icon/arrow direction
    rtlTransform: {
      transform: [{ scaleX: isRTL ? -1 : 1 }],
    } as ViewStyle,

    // Margin/padding helpers
    rtlMarginStart: (value: number) => ({
      [isRTL ? 'marginRight' : 'marginLeft']: value,
    } as ViewStyle),

    rtlMarginEnd: (value: number) => ({
      [isRTL ? 'marginLeft' : 'marginRight']: value,
    } as ViewStyle),

    rtlPaddingStart: (value: number) => ({
      [isRTL ? 'paddingRight' : 'paddingLeft']: value,
    } as ViewStyle),

    rtlPaddingEnd: (value: number) => ({
      [isRTL ? 'paddingLeft' : 'paddingRight']: value,
    } as ViewStyle),

    // Position helpers
    rtlStart: (value: number) => ({
      [isRTL ? 'right' : 'left']: value,
    } as ViewStyle),

    rtlEnd: (value: number) => ({
      [isRTL ? 'left' : 'right']: value,
    } as ViewStyle),
  }), [isRTL]);

  return {
    t,
    i18n,
    isRTL,
    language: i18n.language,
    ...rtlStyles,
  };
}
