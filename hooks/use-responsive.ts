import { useWindowDimensions } from "react-native";

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

export function useResponsive() {
  const { width } = useWindowDimensions();

  const isPhone = width < BREAKPOINTS.md;
  const isTablet = width >= BREAKPOINTS.md && width < BREAKPOINTS.lg;
  const isDesktop = width >= BREAKPOINTS.lg;
  const isTabletOrDesktop = width >= BREAKPOINTS.md;

  const breakpoint: Breakpoint =
    width < BREAKPOINTS.sm
      ? "xs"
      : width < BREAKPOINTS.md
      ? "sm"
      : width < BREAKPOINTS.lg
      ? "md"
      : width < BREAKPOINTS.xl
      ? "lg"
      : "xl";

  function value<T>(map: Partial<Record<Breakpoint, T>> & { xs: T }): T {
    const keys: Breakpoint[] = ["xl", "lg", "md", "sm", "xs"];
    for (const key of keys) {
      if (width >= (BREAKPOINTS[key as keyof typeof BREAKPOINTS] ?? 0) && map[key] !== undefined) {
        return map[key] as T;
      }
    }
    return map.xs;
  }

  return { width, breakpoint, isPhone, isTablet, isDesktop, isTabletOrDesktop, value };
}
