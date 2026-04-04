# TRAVI — Responsiveness Guidelines
> **⚠️ חובה לקרוא קובץ זה לפני כל שינוי עיצובי או סטייל**

---

## 🛠️ טכנולוגיות בשימוש
- Expo SDK 54 + React Native + expo-router v6
- **NativeWind v4** (Tailwind for React Native) — className syntax
- TypeScript, react-native-reanimated, expo-linear-gradient
- תמיכה: iOS, Android, Web

---

## 🎨 כלל סטייל — חובה!

```tsx
// ✅ נכון — NativeWind className בלבד
<View className="flex-1 p-4 bg-white md:p-6 lg:flex-row">

// ❌ אסור — inline styles
<View style={{ flex: 1, padding: 16 }}>

// ✅ חריגים מותרים לinline styles:
// - ערכים דינמיים מ-state/props
// - אנימציות עם react-native-reanimated
// - ערכים מחושבים בזמן ריצה
```

---

## 📐 Breakpoints

```
sm: 640px   — טלפונים גדולים (landscape) + tablets קטנים
md: 768px   — tablets (portrait)
lg: 1024px  — tablets (landscape) + desktop
xl: 1280px  — desktop גדול
```

---

## ✅ useResponsive Hook — תמיד להשתמש בזה

```tsx
// hooks/useResponsive.ts
import { useBreakpointValue } from 'nativewind';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';

export const useResponsive = () => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const deviceType = useBreakpointValue({
    base: 'phone',
    sm: 'phone-landscape',
    md: 'tablet',
    lg: 'desktop',
  });
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
};
```
> ⚠️ **אל תשתמש ב-`useWindowDimensions` ישירות** — גורם ל-re-render על כל פיקסל. השתמש ב-`useBreakpointValue`.

---

## 📱 Navigation Pattern

| מכשיר | ניווט |
|-------|-------|
| Mobile | Bottom tabs |
| Tablet Portrait | Drawer (swipeable) |
| Tablet Landscape + Desktop | Permanent sidebar |
| Web Desktop | Top header + sidebar |

---

## 🧩 דפוסים לרכיבים קריטיים

### טפסים
```tsx
<View className="w-full max-w-md mx-auto px-4 md:px-6">
  <TextInput className="w-full h-12 px-4 border border-gray-300 rounded-lg text-base md:text-lg" />
  <TouchableOpacity className="w-full md:w-auto md:px-8 h-12 bg-blue-600 rounded-lg items-center justify-center mt-4">
    <Text className="text-white font-semibold text-base md:text-lg">Search</Text>
  </TouchableOpacity>
</View>
```
- שדות input: `w-full` במובייל, `max-w-md` בדסקטופ
- כפתורים: `w-full` במובייל, `w-auto px-8` בטאבלט+

### Cards & Lists
```tsx
// Mobile: 1 עמודה | Tablet: 2 עמודות | Desktop: 3 עמודות
<FlatList
  key={isTablet ? 'tablet' : 'phone'}  // חובה לforce re-mount
  contentContainerClassName="p-4 md:p-6"
  renderItem={({ item }) => (
    <View className="w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-12px)] bg-white rounded-xl p-4">
```

### Modals
```tsx
// Mobile: full-screen | Tablet+: centered max-w-lg
<Modal presentationStyle={isPhone ? 'fullScreen' : 'pageSheet'} visible={visible}>
  <View className="flex-1 md:justify-center md:items-center md:bg-black/50">
    <View className="flex-1 md:flex-initial md:w-full md:max-w-lg bg-white md:rounded-2xl md:max-h-[80vh]">
```

### מפות
```tsx
<View className="flex-1 lg:flex-row">
  <View className="h-[60vh] lg:h-full lg:flex-1"><MapView className="flex-1" /></View>
  <View className="flex-1 lg:w-96 lg:max-w-md"><ScrollView>{/* cards */}</ScrollView></View>
</View>
```

### Chat Interface
```tsx
<FlatList
  contentContainerClassName="px-4 md:px-6 py-4 md:max-w-3xl md:mx-auto"
  renderItem={({ item }) => (
    <View className={`max-w-[80%] md:max-w-md mb-3 ${item.isUser ? 'self-end' : 'self-start'}`}>
```

---

## 🔤 Typography Scale

```tsx
// Headings
<Text className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
<Text className="text-xl md:text-2xl lg:text-3xl font-semibold">

// Body
<Text className="text-sm md:text-base lg:text-lg">
<Text className="text-xs md:text-sm">

// Spacing
p-3 md:p-4 lg:p-6 xl:p-8
gap-2 md:gap-3 lg:gap-4 xl:gap-6
```

---

## 🖼️ תמונות ו-SVG

```tsx
// SVG — תמיד responsive
<Svg width="100%" height="100%" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">

// Images
<Image source={...} className="w-full h-48 md:h-64 lg:h-80" resizeMode="cover" />
```

---

## 🛡️ Safe Areas

```tsx
// NativeWind built-in
<View className="pt-safe pb-safe">

// Manual
const insets = useSafeAreaInsets();
<View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
```

---

## ⚡ Performance

```tsx
// ✅ Memoization
const TripCard = React.memo(({ trip }) => <View className="...">{/* ... */}</View>);

// ✅ useMemo לחישובים כבדים
const filtered = useMemo(() => trips.filter(t => t.date > today), [trips, today]);

// ✅ useCallback לevent handlers
const handlePress = useCallback(() => router.push('/details'), [router]);

// ❌ אל תוסיף FlashList — FlatList + React.memo מספיקים
```

---

## ✅ Checklist לפני כל שינוי עיצובי

- [ ] האם משתמש ב-NativeWind className (לא inline styles)?
- [ ] האם הטקסט קריא בכל גודל מסך? (min `text-sm`)
- [ ] האם כפתורים לפחות 44×44px?
- [ ] האם יש safe area insets?
- [ ] האם הלייאאוט עובד ב-landscape?
- [ ] האם הטפסים לא מוסתרים על ידי המקלדת?
- [ ] האם ה-FlatList משתמש ב-`key` prop לשינוי breakpoint?
- [ ] האם אין overflow-x (גלילה אופקית)?

---

## 📋 סדר עבודה מומלץ

1. **תשתית** — `useResponsive.ts`, `tailwind.config.js`, safe areas
2. **Layout & Navigation** — tabs/drawer/sidebar לפי מכשיר
3. **רכיבים קריטיים** — forms, cards, modals, chat
4. **תוכן ומדיה** — typography, images, SVGs
5. **Web-Specific** — hover states, overflow, scrolling
6. **אחידות סטייל** — החלף inline styles ב-className
7. **Testing** — Expo Go iOS+Android, landscape, web Chrome DevTools
