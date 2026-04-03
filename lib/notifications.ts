/**
 * TRAVI — Notification Utilities
 * Handles push token registration and local trip reminder scheduling.
 */
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

// Configure how notifications appear when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * Request notification permissions and return the Expo push token.
 * Returns null if permissions are denied or on web.
 */
export async function registerForPushNotificationsAsync(): Promise<string | null> {
  if (Platform.OS === "web") return null;

  // Set Android notification channel
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("travi-default", {
      name: "TRAVI Notifications",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#6443F4",
    });
    await Notifications.setNotificationChannelAsync("travi-price-alerts", {
      name: "Price Alerts",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 100, 100, 100],
      lightColor: "#FFD700",
    });
  }

  // Check existing permissions
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.warn("[Notifications] Permission not granted");
    return null;
  }

  // Get Expo push token
  try {
    const projectId = Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;
    if (!projectId) {
      console.warn("[Notifications] No projectId found, skipping push token registration");
      return null;
    }
    const token = await Notifications.getExpoPushTokenAsync({ projectId });
    return token.data;
  } catch (error) {
    console.warn("[Notifications] Failed to get push token:", error);
    return null;
  }
}

/**
 * Schedule a local trip reminder notification.
 * @param tripDestination - e.g. "Dubai"
 * @param tripStartDate - ISO date string e.g. "2026-05-10"
 * @param daysBeforeTrip - how many days before the trip to send the reminder (default: 3)
 */
export async function scheduleTripReminder(
  tripDestination: string,
  tripStartDate: string,
  daysBeforeTrip = 3,
): Promise<string | null> {
  if (Platform.OS === "web") return null;

  const tripDate = new Date(tripStartDate);
  const reminderDate = new Date(tripDate);
  reminderDate.setDate(reminderDate.getDate() - daysBeforeTrip);
  reminderDate.setHours(9, 0, 0, 0); // 9am on reminder day

  if (reminderDate <= new Date()) {
    console.warn("[Notifications] Reminder date is in the past, skipping");
    return null;
  }

  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: `✈️ ${tripDestination} in ${daysBeforeTrip} days!`,
        body: `Your trip to ${tripDestination} starts on ${tripDate.toLocaleDateString()}. Time to pack!`,
        data: { destination: tripDestination, startDate: tripStartDate },
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: reminderDate,
      },
    });
    return id;
  } catch (error) {
    console.warn("[Notifications] Failed to schedule trip reminder:", error);
    return null;
  }
}

/**
 * Schedule a price alert notification (local simulation).
 * In production, this would be triggered server-side.
 */
export async function schedulePriceAlertNotification(
  destination: string,
  targetPrice: number,
  currentPrice: number,
): Promise<void> {
  if (Platform.OS === "web") return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `🎉 Price Drop: ${destination}!`,
      body: `Flights to ${destination} are now $${currentPrice} — below your $${targetPrice} target!`,
      data: { destination, targetPrice, currentPrice },
      sound: true,
    },
    trigger: null, // immediate
  });
}

/**
 * Cancel all scheduled notifications for a specific trip.
 */
export async function cancelTripReminders(notificationIds: string[]): Promise<void> {
  for (const id of notificationIds) {
    await Notifications.cancelScheduledNotificationAsync(id);
  }
}

/**
 * Subscribe to foreground notification events and tap responses.
 * Returns a cleanup function to remove both listeners.
 */
export function addNotificationListeners(
  onReceived: (notification: Notifications.Notification) => void,
  onTapped: (response: Notifications.NotificationResponse) => void,
): () => void {
  const receivedSub = Notifications.addNotificationReceivedListener(onReceived);
  const responseSub = Notifications.addNotificationResponseReceivedListener(onTapped);
  return () => {
    receivedSub.remove();
    responseSub.remove();
  };
}
