// Root index — redirect to Home Dashboard for review
import { Redirect } from "expo-router";

export default function RootIndex() {
  return <Redirect href="/(tabs)" />;
}
