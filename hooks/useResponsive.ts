import { useWindowDimensions } from 'react-native';

// Breakpoints hook for responsive layout
export function useResponsive() {
  const { width, height } = useWindowDimensions();

  return {
    width,
    height,
    isPhone: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
    breakpoint: width < 768 ? 'phone' : width < 1024 ? 'tablet' : 'desktop',
  };
}
