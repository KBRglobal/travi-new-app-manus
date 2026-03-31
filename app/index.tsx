import { useEffect } from "react";
import { router } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useStore } from "@/lib/store";

export default function Index() {
  const { state } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (state.isAuthenticated || state.isGuest) {
        if (!state.onboardingCompleted) {
          router.replace("/(auth)/welcome" as never);
        } else {
          router.replace("/(tabs)" as never);
        }
      } else {
        router.replace("/(auth)/splash" as never);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [state.isAuthenticated, state.isGuest, state.onboardingCompleted]);

  return (
    <View style={{ flex: 1, backgroundColor: "#1A0533", justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color="#E91E8C" size="large" />
    </View>
  );
}
