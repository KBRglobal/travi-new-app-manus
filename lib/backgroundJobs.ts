/* ═══════════════════════════════════════════
 *  TRAVI — Background Jobs (Client-side simulation)
 *  In production: BullMQ queues on server
 *  Here: simulated with timers for prototype
 * ═══════════════════════════════════════════ */

// ─── Job Types ───

export type JobType =
  | 'dna_recalculate'
  | 'flight_price_alert'
  | 'pre_flight_checklist'
  | 'cashback_release'
  | 'points_expiry_warning'
  | 'trip_reminder'
  | 'review_reminder'
  | 'currency_rate_update';

export interface Job {
  id: string;
  type: JobType;
  data: Record<string, unknown>;
  status: 'pending' | 'running' | 'completed' | 'failed';
  scheduledAt: string;
  completedAt?: string;
  result?: unknown;
}

// ─── Job Queue (Client-side simulation) ───

type JobHandler = (data: Record<string, unknown>) => Promise<unknown>;

const jobHandlers: Map<JobType, JobHandler> = new Map();
const jobHistory: Job[] = [];
const scheduledJobs: Map<string, ReturnType<typeof setTimeout>> = new Map();

export function registerHandler(type: JobType, handler: JobHandler): void {
  jobHandlers.set(type, handler);
}

export function scheduleJob(
  type: JobType,
  data: Record<string, unknown>,
  delayMs: number = 0
): string {
  const job: Job = {
    id: `job_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    type,
    data,
    status: 'pending',
    scheduledAt: new Date(Date.now() + delayMs).toISOString(),
  };

  jobHistory.push(job);

  const timer = setTimeout(async () => {
    job.status = 'running';
    const handler = jobHandlers.get(type);

    if (!handler) {
      job.status = 'failed';
      console.warn(`[Jobs] No handler for ${type}`);
      return;
    }

    try {
      job.result = await handler(data);
      job.status = 'completed';
      job.completedAt = new Date().toISOString();
      console.log(`[Jobs] Completed: ${type}`);
    } catch (error) {
      job.status = 'failed';
      console.error(`[Jobs] Failed: ${type}`, error);
    }

    scheduledJobs.delete(job.id);
  }, delayMs);

  scheduledJobs.set(job.id, timer);
  return job.id;
}

export function cancelJob(jobId: string): boolean {
  const timer = scheduledJobs.get(jobId);
  if (timer) {
    clearTimeout(timer);
    scheduledJobs.delete(jobId);
    const job = jobHistory.find((j) => j.id === jobId);
    if (job) job.status = 'failed';
    return true;
  }
  return false;
}

export function getJobHistory(): Job[] {
  return [...jobHistory];
}

// ─── Default Job Handlers ───

// DNA Recalculation (every time signals are flushed)
registerHandler('dna_recalculate', async (data) => {
  const { userId } = data;
  console.log(`[Jobs] Recalculating DNA for user ${userId}`);
  // In production: fetch signals from DB, recalculate, update profile
  return { recalculated: true };
});

// Flight Price Alert
registerHandler('flight_price_alert', async (data) => {
  const { alertId, route, targetPrice } = data;
  console.log(`[Jobs] Checking flight prices for alert ${alertId}`);
  // In production: check flight API, compare with target, send push notification
  const currentPrice = Math.round(Math.random() * 500 + 100);
  const triggered = currentPrice <= (targetPrice as number);
  return { currentPrice, triggered };
});

// Pre-Flight Checklist (24h before departure)
registerHandler('pre_flight_checklist', async (data) => {
  const { tripId, userId } = data;
  console.log(`[Jobs] Sending pre-flight checklist for trip ${tripId}`);
  // In production: send push notification with checklist
  return {
    checklist: [
      'Passport valid for 6+ months',
      'Boarding pass downloaded',
      'Hotel confirmation saved',
      'Travel insurance active',
      'Currency exchanged',
      'Phone charger packed',
    ],
  };
});

// Cashback Release (14 days after trip end)
registerHandler('cashback_release', async (data) => {
  const { userId, cashbackId, amount } = data;
  console.log(`[Jobs] Releasing cashback ${cashbackId}: €${amount}`);
  // In production: update cashback status, credit wallet
  return { released: true, amount };
});

// Points Expiry Warning (30 days before expiry)
registerHandler('points_expiry_warning', async (data) => {
  const { userId, points, expiryDate } = data;
  console.log(`[Jobs] Points expiry warning: ${points} points expire on ${expiryDate}`);
  // In production: send push notification
  return { warned: true };
});

// Trip Reminder (1 day before)
registerHandler('trip_reminder', async (data) => {
  const { tripId, userId, destination } = data;
  console.log(`[Jobs] Trip reminder: ${destination} tomorrow!`);
  return { reminded: true };
});

// Review Reminder (2 days after trip end)
registerHandler('review_reminder', async (data) => {
  const { tripId, userId } = data;
  console.log(`[Jobs] Review reminder for trip ${tripId}`);
  return { reminded: true };
});

// Currency Rate Update (daily)
registerHandler('currency_rate_update', async (data) => {
  console.log('[Jobs] Updating currency rates');
  // In production: fetch from forex API, update cache
  return { updated: true, rates: { EUR_USD: 1.08, EUR_GBP: 0.86, EUR_JPY: 163.5 } };
});

// ─── Scheduled Recurring Jobs (prototype simulation) ───

let recurringTimers: ReturnType<typeof setInterval>[] = [];

export function startRecurringJobs(): void {
  // Currency rates: every 6 hours (simulated as every 60s in prototype)
  recurringTimers.push(
    setInterval(() => {
      scheduleJob('currency_rate_update', {});
    }, 60000)
  );

  console.log('[Jobs] Recurring jobs started');
}

export function stopRecurringJobs(): void {
  recurringTimers.forEach((t) => clearInterval(t));
  recurringTimers = [];
  scheduledJobs.forEach((t) => clearTimeout(t));
  scheduledJobs.clear();
  console.log('[Jobs] All jobs stopped');
}
