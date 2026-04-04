/**
 * TRAVI — Notification Service
 * Handles push notification registration, permissions, and local notifications.
 */
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { post } from '../lib/api';

// ─── Configuration ───

// Set default notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// ─── Types ───

export interface NotificationData {
  type: 'trip_reminder' | 'flight_update' | 'hotel_checkin' | 'price_alert' | 'social' | 'points' | 'general';
  tripId?: string;
  destinationId?: string;
  deepLink?: string;
  [key: string]: unknown;
}

export interface ScheduledNotification {
  title: string;
  body: string;
  data?: NotificationData;
  trigger: Notifications.NotificationTriggerInput;
}

// ─── Permission & Registration ───

/**
 * Request notification permissions and register for push notifications.
 * Returns the Expo push token if successful, null otherwise.
 */
export async function registerForPushNotifications(): Promise<string | null> {
  if (!Device.isDevice) {
    console.warn('[Notifications] Push notifications require a physical device');
    return null;
  }

  // Check existing permissions
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  // Request if not already granted
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.warn('[Notifications] Permission not granted');
    return null;
  }

  // Get Expo push token
  try {
    const tokenData = await Notifications.getExpoPushTokenAsync({
      projectId: 'your-project-id', // TODO: Replace with actual Expo project ID
    });
    const token = tokenData.data;

    // Register token with backend
    await registerTokenWithBackend(token);

    // Set up Android notification channel
    if (Platform.OS === 'android') {
      await setupAndroidChannels();
    }

    return token;
  } catch (error) {
    console.error('[Notifications] Failed to get push token:', error);
    return null;
  }
}

/**
 * Register the push token with the backend server.
 */
async function registerTokenWithBackend(token: string): Promise<void> {
  try {
    await post('/notifications/register', {
      token,
      platform: Platform.OS,
      deviceName: Device.deviceName,
    });
  } catch (error) {
    console.error('[Notifications] Failed to register token with backend:', error);
  }
}

/**
 * Set up Android notification channels for different notification types.
 */
async function setupAndroidChannels(): Promise<void> {
  await Notifications.setNotificationChannelAsync('default', {
    name: 'General',
    importance: Notifications.AndroidImportance.DEFAULT,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#6443F4',
  });

  await Notifications.setNotificationChannelAsync('trip-alerts', {
    name: 'Trip Alerts',
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#F94498',
    description: 'Flight updates, hotel check-ins, and trip reminders',
  });

  await Notifications.setNotificationChannelAsync('price-alerts', {
    name: 'Price Alerts',
    importance: Notifications.AndroidImportance.HIGH,
    description: 'Price drops and deal notifications',
  });

  await Notifications.setNotificationChannelAsync('social', {
    name: 'Social',
    importance: Notifications.AndroidImportance.DEFAULT,
    description: 'Messages, buddy requests, and social updates',
  });
}

// ─── Local Notifications ───

/**
 * Schedule a local notification.
 */
export async function scheduleNotification({
  title,
  body,
  data,
  trigger,
}: ScheduledNotification): Promise<string> {
  return await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: data as Record<string, unknown>,
      sound: true,
    },
    trigger,
  });
}

/**
 * Schedule a trip reminder notification.
 */
export async function scheduleTripReminder(
  tripId: string,
  destination: string,
  departureDate: Date,
  hoursBeforeDeparture: number = 24,
): Promise<string> {
  const triggerDate = new Date(departureDate.getTime() - hoursBeforeDeparture * 60 * 60 * 1000);

  // Don't schedule if the trigger date is in the past
  if (triggerDate <= new Date()) {
    console.warn('[Notifications] Trigger date is in the past, skipping');
    return '';
  }

  return await scheduleNotification({
    title: `Trip to ${destination}`,
    body: hoursBeforeDeparture >= 24
      ? `Your trip starts tomorrow! Make sure everything is ready.`
      : `Your trip starts in ${hoursBeforeDeparture} hours. Time to head to the airport!`,
    data: {
      type: 'trip_reminder',
      tripId,
      deepLink: `travi://trip/${tripId}`,
    },
    trigger: { date: triggerDate },
  });
}

/**
 * Cancel a specific scheduled notification.
 */
export async function cancelNotification(notificationId: string): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}

/**
 * Cancel all scheduled notifications.
 */
export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

/**
 * Get all pending scheduled notifications.
 */
export async function getPendingNotifications() {
  return await Notifications.getAllScheduledNotificationsAsync();
}

/**
 * Set the app badge count (iOS).
 */
export async function setBadgeCount(count: number): Promise<void> {
  await Notifications.setBadgeCountAsync(count);
}

// ─── Notification Listeners ───

/**
 * Add a listener for when a notification is received while the app is in the foreground.
 */
export function addNotificationReceivedListener(
  callback: (notification: Notifications.Notification) => void,
) {
  return Notifications.addNotificationReceivedListener(callback);
}

/**
 * Add a listener for when the user taps on a notification.
 */
export function addNotificationResponseListener(
  callback: (response: Notifications.NotificationResponse) => void,
) {
  return Notifications.addNotificationResponseReceivedListener(callback);
}

/**
 * Get the last notification response (for handling app launch from notification).
 */
export async function getLastNotificationResponse() {
  return await Notifications.getLastNotificationResponseAsync();
}
