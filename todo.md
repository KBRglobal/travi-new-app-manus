# TRAVI Infrastructure Improvements

## 1. AsyncStorage Persistence for Zustand
- [x] Install @react-native-async-storage/async-storage
- [x] Create lib/storage.ts with AsyncStorage + SecureStore adapters
- [x] Add persist middleware to authStore (SecureStore)
- [x] Add persist middleware to tripStore (AsyncStorage)
- [x] Add persist middleware to dnaStore
- [x] Add persist middleware to pointsStore
- [x] Add persist middleware to liveStore
- [x] Add persist middleware to socialStore

## 2. API Layer
- [x] Create lib/api.ts with axios instance, interceptors, retry logic
- [x] Create service files (authService, tripService, dnaService, etc.)
- [x] Add error handling wrapper with typed errors

## 3. Replace Emoji Icons with expo-vector-icons
- [x] Audit all screens using emoji as icons (144 files found)
- [x] Replace with Ionicons from @expo/vector-icons (136 + 89 files processed)
- [x] Ensure consistent icon sizing and coloring

## 4. Auth Guard
- [x] Re-enable auth guard in app/_layout.tsx
- [x] Handle guest mode in auth guard
- [x] Add proper redirect logic (hydration-aware)

## 5. FlatList Performance
- [x] Add removeClippedSubviews to 85 ScrollView screens
- [x] Create OptimizedList component with getItemLayout, maxToRenderPerBatch, windowSize
- [x] OptimizedList includes memoized renderItem and keyExtractor
- [x] Created OptimizedHorizontalList variant

## 6. Loading/Error States
- [x] Create SkeletonLoader component (Skeleton, SkeletonCard, SkeletonListItem, SkeletonProfile, SkeletonScreen)
- [x] Create ErrorBoundary + ErrorState + LoadingState components
- [x] Create useAsync & useMutation hooks for consistent loading/error handling
- [x] All components use design system fonts and colors

## 7. Deep Linking + Push Notifications
- [x] expo-notifications and expo-linking already installed
- [x] Configure app.json with notification channels, intent filters, associated domains
- [x] Create notificationService.ts with registration, scheduling, listeners
- [x] Create deepLinking.ts with URL parsing, route mapping, share links
- [x] Create useNotifications hook for root layout integration

## 8. i18n + RTL Support
- [x] Install i18next, react-i18next, expo-localization
- [x] Create translation files (en.ts, he.ts) with full coverage
- [x] Set up i18n/index.ts with auto-detection, RTL, language switching
- [x] Add RTL support with I18nManager.forceRTL
- [x] Create useAppTranslation hook with RTL-aware style helpers
- [x] Import i18n in root layout
- [ ] Gradually replace hardcoded strings with t() keys (ongoing)

## 9. expo-image
- [x] Install expo-image
- [x] Create CachedImage, Avatar, DestinationImage, HeroImage components
- [x] Replace Image with CachedImage in 12 screens (uri-based images)
- [x] Memory+disk caching, blurhash placeholders, smooth transitions
- [x] Placeholder (blurhash) and transition props built into CachedImage
- [x] Caching policy: memory-disk by default

## 10. Push to GitHub
- [ ] Commit all changes
- [ ] Push to repository
