/* ═══════════════════════════════════════════
 *  TRAVI — WebSocket Client
 *  Live Mode, Collaborative Planning, Social
 * ═══════════════════════════════════════════ */

type MessageHandler = (data: any) => void;

// ─── WebSocket Event Types ───

// Live Mode Events
export interface LiveLocationEvent { type: 'location_updated'; coords: { lat: number; lng: number } }
export interface LiveCheckinEvent { type: 'checkin_confirmed'; actId: string; points: number }
export interface LiveAIMessageEvent { type: 'ai_message'; message: string; actions: string[] }
export interface LiveExpenseEvent { type: 'expense_added'; expense: { id: string; amount: number; category: string } }
export interface LiveScheduleEvent { type: 'schedule_updated'; activities: any[] }

export type LiveEvent =
  | LiveLocationEvent
  | LiveCheckinEvent
  | LiveAIMessageEvent
  | LiveExpenseEvent
  | LiveScheduleEvent;

// Collaborative Planning Events
export interface CollabUserJoinedEvent { type: 'user_joined'; userId: string; name: string }
export interface CollabUserLeftEvent { type: 'user_left'; userId: string }
export interface CollabActivityMovedEvent { type: 'activity_moved'; actId: string; newIndex: number; dayId: string; movedBy: string }
export interface CollabActivityAddedEvent { type: 'activity_added'; activity: any; addedBy: string }
export interface CollabActivityRemovedEvent { type: 'activity_removed'; actId: string; removedBy: string }
export interface CollabVoteCastEvent { type: 'vote_cast'; actId: string; userId: string; vote: 'up' | 'down' }
export interface CollabCursorMovedEvent { type: 'cursor_moved'; userId: string; position: { x: number; y: number } }

export type CollabEvent =
  | CollabUserJoinedEvent
  | CollabUserLeftEvent
  | CollabActivityMovedEvent
  | CollabActivityAddedEvent
  | CollabActivityRemovedEvent
  | CollabVoteCastEvent
  | CollabCursorMovedEvent;

// Social Events
export interface SocialNewMessageEvent { type: 'new_message'; convId: string; message: any }
export interface SocialMessageReadEvent { type: 'message_read'; convId: string; messageId: string }
export interface SocialConnectionRequestEvent { type: 'connection_request'; fromUser: any }
export interface SocialConnectionAcceptedEvent { type: 'connection_accepted'; userId: string }
export interface SocialFeedUpdateEvent { type: 'feed_update'; post: any }

export type SocialEvent =
  | SocialNewMessageEvent
  | SocialMessageReadEvent
  | SocialConnectionRequestEvent
  | SocialConnectionAcceptedEvent
  | SocialFeedUpdateEvent;

// ─── Mock WebSocket Client ───

class MockWebSocket {
  private handlers: Map<string, Set<MessageHandler>> = new Map();
  private connected: boolean = false;
  private channel: string;
  private simulationTimer: ReturnType<typeof setInterval> | null = null;

  constructor(channel: string) {
    this.channel = channel;
  }

  connect(): void {
    this.connected = true;
    console.log(`[WS] Connected to ${this.channel}`);

    // Simulate incoming events
    if (this.channel.startsWith('live:')) {
      this.startLiveSimulation();
    } else if (this.channel.startsWith('collab:')) {
      this.startCollabSimulation();
    }
  }

  disconnect(): void {
    this.connected = false;
    if (this.simulationTimer) {
      clearInterval(this.simulationTimer);
      this.simulationTimer = null;
    }
    console.log(`[WS] Disconnected from ${this.channel}`);
  }

  on(eventType: string, handler: MessageHandler): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Set());
    }
    this.handlers.get(eventType)!.add(handler);
  }

  off(eventType: string, handler: MessageHandler): void {
    this.handlers.get(eventType)?.delete(handler);
  }

  emit(eventType: string, data: any): void {
    if (!this.connected) {
      console.warn('[WS] Not connected, cannot emit');
      return;
    }
    console.log(`[WS] Emit ${eventType}`, data);
    // In real implementation, this sends to server
  }

  private dispatch(event: any): void {
    const handlers = this.handlers.get(event.type);
    if (handlers) {
      handlers.forEach((h) => h(event));
    }
    // Also dispatch to wildcard handlers
    const allHandlers = this.handlers.get('*');
    if (allHandlers) {
      allHandlers.forEach((h) => h(event));
    }
  }

  private startLiveSimulation(): void {
    // Simulate AI messages every 30 seconds
    this.simulationTimer = setInterval(() => {
      const events: LiveEvent[] = [
        {
          type: 'ai_message',
          message: 'You\'re near Sagrada Familia! It\'s 10 min away by foot.',
          actions: ['Navigate', 'Get ready', 'Skip'],
        },
        {
          type: 'ai_message',
          message: 'Time for lunch! La Boqueria matches your food DNA.',
          actions: ['Show menu', 'Navigate', 'Dismiss'],
        },
        {
          type: 'ai_message',
          message: 'Rain expected in 2h. Shall I suggest indoor alternatives?',
          actions: ['Yes, suggest', 'Keep current plan'],
        },
      ];
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      this.dispatch(randomEvent);
    }, 30000);
  }

  private startCollabSimulation(): void {
    // Simulate user activity every 15 seconds
    this.simulationTimer = setInterval(() => {
      const events: CollabEvent[] = [
        { type: 'user_joined', userId: 'user_2', name: 'Sarah' },
        { type: 'vote_cast', actId: 'act_1', userId: 'user_2', vote: 'up' },
        { type: 'cursor_moved', userId: 'user_2', position: { x: 100, y: 200 } },
      ];
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      this.dispatch(randomEvent);
    }, 15000);
  }

  get isConnected(): boolean {
    return this.connected;
  }
}

// ─── Channel Factory ───

const channels: Map<string, MockWebSocket> = new Map();

export function getLiveChannel(tripId: string): MockWebSocket {
  const key = `live:${tripId}`;
  if (!channels.has(key)) {
    channels.set(key, new MockWebSocket(key));
  }
  return channels.get(key)!;
}

export function getCollabChannel(tripId: string): MockWebSocket {
  const key = `collab:${tripId}`;
  if (!channels.has(key)) {
    channels.set(key, new MockWebSocket(key));
  }
  return channels.get(key)!;
}

export function getSocialChannel(userId: string): MockWebSocket {
  const key = `social:${userId}`;
  if (!channels.has(key)) {
    channels.set(key, new MockWebSocket(key));
  }
  return channels.get(key)!;
}

// ─── Client Actions ───

export const wsActions = {
  live: {
    sendLocation(tripId: string, coords: { lat: number; lng: number }) {
      getLiveChannel(tripId).emit('location_update', { coords });
    },
    requestAIHelp(tripId: string, context: string) {
      getLiveChannel(tripId).emit('request_ai_help', { context });
    },
  },
  collab: {
    moveActivity(tripId: string, actId: string, newIndex: number, dayId: string) {
      getCollabChannel(tripId).emit('move_activity', { actId, newIndex, dayId });
    },
    addActivity(tripId: string, activity: any) {
      getCollabChannel(tripId).emit('add_activity', { activity });
    },
    removeActivity(tripId: string, actId: string) {
      getCollabChannel(tripId).emit('remove_activity', { actId });
    },
    castVote(tripId: string, actId: string, vote: 'up' | 'down') {
      getCollabChannel(tripId).emit('cast_vote', { actId, vote });
    },
  },
  social: {
    sendMessage(userId: string, convId: string, message: string) {
      getSocialChannel(userId).emit('send_message', { convId, message });
    },
    markRead(userId: string, convId: string, messageId: string) {
      getSocialChannel(userId).emit('mark_read', { convId, messageId });
    },
  },
};

export default MockWebSocket;
