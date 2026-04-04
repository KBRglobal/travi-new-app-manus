/**
 * TRAVI — Offline Sync Queue
 *
 * Queues mutations that fail due to network issues and replays them
 * when connectivity is restored. Uses AsyncStorage for persistence.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

const QUEUE_KEY = "travi_offline_sync_queue";

export type SyncOperation = {
  id: string;
  type: "profile_sync" | "trip_create" | "trip_update" | "trip_delete" | "alert_create" | "alert_delete";
  payload: Record<string, unknown>;
  createdAt: string;
  retries: number;
};

/**
 * Add an operation to the offline sync queue.
 */
export async function enqueueOperation(
  type: SyncOperation["type"],
  payload: Record<string, unknown>,
): Promise<void> {
  try {
    const existing = await getQueue();
    const op: SyncOperation = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      type,
      payload,
      createdAt: new Date().toISOString(),
      retries: 0,
    };
    existing.push(op);
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(existing));
  } catch (error) {
    console.warn("[OfflineSync] Failed to enqueue operation:", error);
  }
}

/**
 * Get all pending operations from the queue.
 */
export async function getQueue(): Promise<SyncOperation[]> {
  try {
    const raw = await AsyncStorage.getItem(QUEUE_KEY);
    return raw ? (JSON.parse(raw) as SyncOperation[]) : [];
  } catch {
    return [];
  }
}

/**
 * Remove a successfully synced operation from the queue.
 */
export async function dequeueOperation(id: string): Promise<void> {
  try {
    const existing = await getQueue();
    const filtered = existing.filter((op) => op.id !== id);
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.warn("[OfflineSync] Failed to dequeue operation:", error);
  }
}

/**
 * Clear the entire sync queue (e.g., on logout).
 */
export async function clearQueue(): Promise<void> {
  await AsyncStorage.removeItem(QUEUE_KEY);
}

/**
 * Check if device is currently online.
 */
export async function isOnline(): Promise<boolean> {
  try {
    const state = await NetInfo.fetch();
    return state.isConnected === true && state.isInternetReachable !== false;
  } catch {
    return true; // assume online if check fails
  }
}

/**
 * Subscribe to connectivity changes and replay the queue when reconnected.
 * Returns an unsubscribe function.
 *
 * @param replayFn - async function that processes a single queued operation
 */
export function subscribeToConnectivity(
  replayFn: (op: SyncOperation) => Promise<void>,
): () => void {
  let wasOffline = false;

  const unsubscribe = NetInfo.addEventListener(async (state) => {
    const online = state.isConnected === true && state.isInternetReachable !== false;

    if (!online) {
      wasOffline = true;
      return;
    }

    if (wasOffline && online) {
      wasOffline = false;
      await replayQueue(replayFn);
    }
  });

  return unsubscribe;
}

/**
 * Attempt to replay all queued operations in order.
 * Operations that succeed are removed; failed ones increment retryCount.
 * Operations with >5 retries are dropped.
 */
async function replayQueue(
  replayFn: (op: SyncOperation) => Promise<void>,
): Promise<void> {
  const queue = await getQueue();
  if (queue.length === 0) return;

  console.log(`[OfflineSync] Replaying ${queue.length} queued operations`);

  for (const op of queue) {
    if (op.retries > 5) {
      await dequeueOperation(op.id);
      continue;
    }

    try {
      await replayFn(op);
      await dequeueOperation(op.id);
    } catch (error) {
      console.warn(`[OfflineSync] Failed to replay op ${op.id}:`, error);
      // Increment retry count
      const current = await getQueue();
      const updated = current.map((o) =>
        o.id === op.id ? { ...o, retries: o.retries + 1 } : o,
      );
      await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(updated));
    }
  }
}
