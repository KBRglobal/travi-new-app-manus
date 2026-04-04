/**
 * TRAVI — useNotifications Hook
 * Provides notification registration, listeners, and deep link handling.
 * 
 * Usage in root layout:
 * ```tsx
 * const { expoPushToken } = useNotifications();
 * ```
 */
import { useEffect, useRef, useState } from 'react';
import { router } from 'expo-router';
import * as Notifications from 'expo-notifications';
import {
  registerForPushNotifications,
  addNotificationReceivedListener,
  addNotificationResponseListener,
  getLastNotificationResponse,
} from '../services/notificationService';
import { handleDeepLink, setupDeepLinkListener } from '../lib/deepLinking';
import type { NotificationData } from '../services/notificationService';

export function useNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    // Register for push notifications
    registerForPushNotifications().then((token) => {
      if (token) {
        setExpoPushToken(token);
        console.log('[Notifications] Push token:', token);
      }
    });

    // Listen for incoming notifications (foreground)
    notificationListener.current = addNotificationReceivedListener((notification) => {
      setNotification(notification);
      console.log('[Notifications] Received:', notification.request.content.title);
    });

    // Listen for notification taps
    responseListener.current = addNotificationResponseListener((response) => {
      const data = response.notification.request.content.data as NotificationData;
      console.log('[Notifications] Tapped:', data);

      // Handle deep link from notification
      if (data?.deepLink) {
        handleDeepLink(data.deepLink);
      } else if (data?.type) {
        // Navigate based on notification type
        handleNotificationType(data);
      }
    });

    // Check if app was launched from a notification
    getLastNotificationResponse().then((response) => {
      if (response) {
        const data = response.notification.request.content.data as NotificationData;
        if (data?.deepLink) {
          handleDeepLink(data.deepLink);
        }
      }
    });

    // Set up deep link listener
    const cleanupDeepLinks = setupDeepLinkListener();

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
      cleanupDeepLinks();
    };
  }, []);

  return {
    expoPushToken,
    notification,
  };
}

/**
 * Navigate based on notification type when no deep link is provided.
 */
function handleNotificationType(data: NotificationData) {
  switch (data.type) {
    case 'trip_reminder':
    case 'flight_update':
    case 'hotel_checkin':
      if (data.tripId) {
        router.push(`/(live)/${data.tripId}` as any);
      }
      break;
    case 'price_alert':
      if (data.destinationId) {
        router.push(`/(tabs)/home/destination/${data.destinationId}` as any);
      }
      break;
    case 'social':
      router.push('/(social)/conversations' as any);
      break;
    case 'points':
      router.push('/(tabs)/points' as any);
      break;
    default:
      router.push('/(tabs)/home' as any);
  }
}
