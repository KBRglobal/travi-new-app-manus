// Tab 6 — Social bridge
// Redirects to the Social Community Feed in /(social)/community
import { Redirect } from "expo-router";

export default function SocialTab() {
  return <Redirect href="/(social)/community" />;
}
