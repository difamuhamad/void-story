import { convertBase64ToUint8Array } from "./index";
import { VAPID_PUBLIC_KEY } from "../config";
import {
  subscribePushNotification,
  unsubscribePushNotification,
} from "../data/api";

export async function requestNotificationPermission() {
  if (!isNotificationAvailable()) {
    console.error("Notification API unsupported.");
    return false;
  }

  if (isNotificationGranted()) {
    return true;
  }

  const status = await Notification.requestPermission();

  if (status === "denied") {
    alert("Notification permission denied.");
    return false;
  }

  if (status === "default") {
    alert("Notification permission ignored.");
    return false;
  }

  return true;
}

export async function getPushSubscription() {
  const registration = await navigator.serviceWorker.getRegistration();

  return await registration.pushManager.getSubscription();
}

export function generateSubscribeOptions() {
  return {
    userVisibleOnly: true,
    applicationServerKey: convertBase64ToUint8Array(VAPID_PUBLIC_KEY),
  };
}

export async function subscribe() {
  if (!(await requestNotificationPermission())) {
    return;
  }

  if (await isCurrentPushSubscriptionAvailable()) {
    alert("Subscribed to push notification!");
    return;
  }

  console.log("Start subscribing push notification...");

  // This object will be filled with endpoint and keys
  let pushSubscription;

  try {
    const registration = await navigator.serviceWorker.getRegistration();

    pushSubscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });

    const subscriptionData = pushSubscription.toJSON();

    const response = await subscribePushNotification({
      endpoint: subscriptionData.endpoint,
      keys: {
        p256dh: subscriptionData.keys.p256dh,
        auth: subscriptionData.keys.auth,
      },
    });

    if (response.error === true) {
      console.error("subscribe response:", response.message);
      alert("Subscribe to push notification failed.");

      await pushSubscription.unsubscribe();
      return;
    }

    alert("Subscribed to push notification!");
  } catch (error) {
    console.error("subscribe error:", error);
    alert("Subscribe to push notification failed.");

    await pushSubscription.unsubscribe();
  }
}

export async function unsubscribe() {
  if (!(await isCurrentPushSubscriptionAvailable())) {
    alert("No active subscription found!");
    return;
  }

  console.log("Starting unsubscribe process...");

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    const pushSubscription = await registration.pushManager.getSubscription();

    if (!pushSubscription) {
      alert("No subscription to unsubscribe");
      return;
    }
    // Get from the pushSubscription data
    const { endpoint } = pushSubscription;

    const response = await unsubscribePushNotification({ endpoint });

    if (response.error) {
      throw new Error(response.message);
    }

    await pushSubscription.unsubscribe();

    alert("Unsubscribe success");
    console.log("Unsubscribe success:", response.message);
    return true;
  } catch (error) {
    console.error("Unsubscribe error:", error);
    alert("Unsubscribe failed: " + error.message);
    return false;
  }
}

export async function isCurrentPushSubscriptionAvailable() {
  return !!(await getPushSubscription());
}

export function isNotificationAvailable() {
  return "Notification" in window;
}

export function isNotificationGranted() {
  return Notification.permission === "granted";
}
