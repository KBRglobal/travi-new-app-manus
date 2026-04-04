import { useEffect } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { usePathname } from "expo-router";

const HIDDEN_PATTERNS = [
  "/trips/plan/",
  "/trips/live/",
  "/trips/pre/",
  "/trips/post/",
  "/quick-dna/",
  "/_modals/",
  "/(trip)/",
  "/(live)/",
  "/(dna)/",
];

export function useTabBarVisibility() {
  const tabBarOffset = useSharedValue(0);
  const pathname = usePathname();

  useEffect(() => {
    const shouldHide = HIDDEN_PATTERNS.some((pattern) => pathname.includes(pattern));
    tabBarOffset.value = withTiming(shouldHide ? 60 : 0, { duration: 200 });
  }, [pathname]);

  return tabBarOffset;
}
