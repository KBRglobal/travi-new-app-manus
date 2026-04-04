import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Breakpoints hook for responsive layout
// When NativeWind v4 is installed, replace with useBreakpointValue:
//
// import { useBreakpointValue } from 'nativewind';
// const deviceType = useBreakpointValue({
//   base: 'phone',
//   sm: 'phone-landscape',
//   md: 'tablet',
//   lg: 'desktop',
// });

export function useResponsive() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // Breakpoint-based device type (matches tailwind.config.js)
  const deviceType =
    width >= 1024 ? 'desktop' :
    width >= 768 ? 'tablet' :
    width >= 640 ? 'phone-landscape' :
    'phone';

  return {
    deviceType,
    isPhone: deviceType === 'phone' || deviceType === 'phone-landscape',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop',
    isLandscape: width > height,
    screenWidth: width,
    screenHeight: height,
    safeAreaInsets: insets,
  };
}
