/**
 * TRAVI — Social Service
 * Handles buddies, conversations, messages, and social feed.
 */
import { get, post, del } from '../lib/api';

// ─── Types ───

export interface Buddy {
  id: string;
  name: string;
  avatar?: string;
  dnaType: string;
  matchScore: number;
  tripsCount: number;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  buddy: Buddy;
  lastMessage: Message | null;
  unreadCount: number;
}

export interface FeedPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  imageUrl?: string;
  destination?: string;
  likes: number;
  comments: number;
  timestamp: string;
  liked: boolean;
}

// ─── Service ───

export const socialService = {
  // Buddies
  getBuddies: () =>
    get<Buddy[]>('/social/buddies'),

  getSuggestedBuddies: () =>
    get<Buddy[]>('/social/buddies/suggested'),

  sendBuddyRequest: (userId: string) =>
    post<void>(`/social/buddies/${userId}/request`),

  acceptBuddyRequest: (userId: string) =>
    post<void>(`/social/buddies/${userId}/accept`),

  removeBuddy: (userId: string) =>
    del<void>(`/social/buddies/${userId}`),

  // Conversations
  getConversations: () =>
    get<Conversation[]>('/social/conversations'),

  getMessages: (conversationId: string, params?: { before?: string; limit?: number }) =>
    get<Message[]>(`/social/conversations/${conversationId}/messages`, { params }),

  sendMessage: (conversationId: string, text: string) =>
    post<Message>(`/social/conversations/${conversationId}/messages`, { text }),

  markAsRead: (conversationId: string) =>
    post<void>(`/social/conversations/${conversationId}/read`),

  // Feed
  getFeed: (params?: { page?: number; limit?: number }) =>
    get<FeedPost[]>('/social/feed', { params }),

  likePost: (postId: string) =>
    post<void>(`/social/feed/${postId}/like`),

  unlikePost: (postId: string) =>
    del<void>(`/social/feed/${postId}/like`),

  createPost: (data: { content: string; imageUrl?: string; destination?: string }) =>
    post<FeedPost>('/social/feed', data),
};
