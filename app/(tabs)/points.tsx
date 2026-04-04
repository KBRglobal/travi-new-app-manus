// Tab 5 — Points bridge
// Redirects to the Points Dashboard in /(points)/dashboard
import { Redirect } from "expo-router";

export default function PointsTab() {
  return <Redirect href="/(points)/dashboard" />;
}
