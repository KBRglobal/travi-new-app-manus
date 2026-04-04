import { useCallback, useState } from 'react';

// Show/hide tab bar hook
export function useTabBarVisibility() {
  const [isVisible, setIsVisible] = useState(true);

  const show = useCallback(() => setIsVisible(true), []);
  const hide = useCallback(() => setIsVisible(false), []);
  const toggle = useCallback(() => setIsVisible((prev) => !prev), []);

  return { isVisible, show, hide, toggle };
}
