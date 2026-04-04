import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { asyncStorageAdapter } from '../lib/storage';

interface Buddy {
  id: string;
  name: string;
  avatar?: string;
  dnaType: string;
  matchScore: number;
  tripsCount: number;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  buddy: Buddy;
  lastMessage: Message | null;
  unreadCount: number;
}

interface FeedPost {
  id: string;
  userId: string;
  userName: string;
  content: string;
  imageUrl?: string;
  destination?: string;
  likes: number;
  comments: number;
  timestamp: string;
}

interface SocialState {
  buddies: Buddy[];
  conversations: Conversation[];
  feed: FeedPost[];
  pendingRequests: Buddy[];
  totalUnread: number;

  // Actions
  addBuddy: (buddy: Buddy) => void;
  removeBuddy: (id: string) => void;
  setConversations: (conversations: Conversation[]) => void;
  addMessage: (conversationId: string, message: Message) => void;
  setFeed: (posts: FeedPost[]) => void;
  markRead: (conversationId: string) => void;
  reset: () => void;
}

export const useSocialStore = create<SocialState>()(
  persist(
    (set) => ({
      buddies: [],
      conversations: [],
      feed: [],
      pendingRequests: [],
      totalUnread: 3,

      addBuddy: (buddy) => set((s) => ({ buddies: [...s.buddies, buddy] })),
      removeBuddy: (id) => set((s) => ({ buddies: s.buddies.filter((b) => b.id !== id) })),
      setConversations: (conversations) => set({ conversations }),
      addMessage: (conversationId, message) => set((s) => ({
        conversations: s.conversations.map((c) =>
          c.id === conversationId ? { ...c, lastMessage: message, unreadCount: c.unreadCount + 1 } : c
        ),
      })),
      setFeed: (posts) => set({ feed: posts }),
      markRead: (conversationId) => set((s) => ({
        conversations: s.conversations.map((c) =>
          c.id === conversationId ? { ...c, unreadCount: 0 } : c
        ),
        totalUnread: s.totalUnread - (s.conversations.find((c) => c.id === conversationId)?.unreadCount || 0),
      })),
      reset: () => set({ buddies: [], conversations: [], feed: [], pendingRequests: [], totalUnread: 0 }),
    }),
    {
      name: 'travi-social',
      storage: createJSONStorage(() => asyncStorageAdapter),
      partialize: (state) => ({
        buddies: state.buddies,
        conversations: state.conversations,
        pendingRequests: state.pendingRequests,
        totalUnread: state.totalUnread,
        // Note: feed is not persisted — it should be fetched fresh from API
      }),
    }
  )
);
