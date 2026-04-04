import { Stack } from 'expo-router';

// Drawer: for tablet+ (redirect from tabs on larger screens)
export default function DrawerLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0A0514' },
      }}
    />
  );
}
