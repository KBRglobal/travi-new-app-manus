/**
 * TRAVI — Auth Service
 * Handles authentication, registration, and user profile operations.
 */
import { get, post, put } from '../lib/api';

// ─── Types ───

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    membershipTier: 'explorer' | 'adventurer' | 'globetrotter';
  };
  token: string;
  refreshToken: string;
}

export interface SocialAuthRequest {
  provider: 'google' | 'apple' | 'facebook';
  idToken: string;
}

export interface UpdateProfileRequest {
  name?: string;
  avatar?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// ─── Service ───

export const authService = {
  login: (data: LoginRequest) =>
    post<AuthResponse>('/auth/login', data),

  register: (data: RegisterRequest) =>
    post<AuthResponse>('/auth/register', data),

  socialAuth: (data: SocialAuthRequest) =>
    post<AuthResponse>('/auth/social', data),

  logout: () =>
    post<void>('/auth/logout'),

  getProfile: () =>
    get<AuthResponse['user']>('/auth/profile'),

  updateProfile: (data: UpdateProfileRequest) =>
    put<AuthResponse['user']>('/auth/profile', data),

  changePassword: (data: ChangePasswordRequest) =>
    post<void>('/auth/change-password', data),

  forgotPassword: (email: string) =>
    post<void>('/auth/forgot-password', { email }),

  resetPassword: (token: string, newPassword: string) =>
    post<void>('/auth/reset-password', { token, newPassword }),

  deleteAccount: () =>
    post<void>('/auth/delete-account'),
};
