/**
 * TRAVI — API Layer
 * Centralized HTTP client with interceptors, retry logic, and typed errors.
 */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { useAuthStore } from '../stores/authStore';
import NetInfo from '@react-native-community/netinfo';

// ─── Configuration ───

const API_BASE_URL = __DEV__
  ? 'http://localhost:3000/api'
  : 'https://api.travi.app/api';

const DEFAULT_TIMEOUT = 15000; // 15 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY_BASE = 1000; // 1 second, exponential backoff

// ─── Typed Error Classes ───

export class ApiError extends Error {
  public statusCode: number;
  public code: string;
  public details?: unknown;

  constructor(message: string, statusCode: number, code: string, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export class NetworkError extends Error {
  constructor(message = 'No internet connection') {
    super(message);
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends Error {
  constructor(message = 'Request timed out') {
    super(message);
    this.name = 'TimeoutError';
  }
}

export class AuthenticationError extends ApiError {
  constructor(message = 'Authentication required') {
    super(message, 401, 'UNAUTHORIZED');
    this.name = 'AuthenticationError';
  }
}

// ─── Response Types ───

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

// ─── Retry Logic ───

interface RetryConfig {
  retries: number;
  retryDelay: number;
  retryCondition: (error: AxiosError) => boolean;
}

const defaultRetryConfig: RetryConfig = {
  retries: MAX_RETRIES,
  retryDelay: RETRY_DELAY_BASE,
  retryCondition: (error: AxiosError) => {
    // Retry on network errors and 5xx server errors
    if (!error.response) return true;
    return error.response.status >= 500;
  },
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function retryRequest(
  axiosInstance: AxiosInstance,
  config: InternalAxiosRequestConfig & { _retryCount?: number },
  retryConfig: RetryConfig,
): Promise<AxiosResponse> {
  const retryCount = config._retryCount || 0;

  if (retryCount >= retryConfig.retries) {
    throw new Error('Max retries exceeded');
  }

  const delay = retryConfig.retryDelay * Math.pow(2, retryCount);
  await sleep(delay);

  config._retryCount = retryCount + 1;
  console.log(`[API] Retry attempt ${config._retryCount}/${retryConfig.retries} for ${config.url}`);

  return axiosInstance.request(config);
}

// ─── Create Axios Instance ───

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ─── Request Interceptor ───

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Check network connectivity
    const netState = await NetInfo.fetch();
    if (!netState.isConnected) {
      throw new NetworkError();
    }

    // Attach auth token
    const token = useAuthStore.getState().token;
    if (token && token !== 'guest-token') {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in dev
    if (__DEV__) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, config.params || '');
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response Interceptor ───

api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (__DEV__) {
      console.log(`[API] ${response.status} ${response.config.url}`);
    }
    return response;
  },
  async (error: AxiosError<ApiErrorResponse>) => {
    const config = error.config as InternalAxiosRequestConfig & { _retryCount?: number };

    // Handle network errors with retry
    if (!error.response) {
      if (error.code === 'ECONNABORTED') {
        // Timeout — retry
        if (defaultRetryConfig.retryCondition(error)) {
          try {
            return await retryRequest(api, config, defaultRetryConfig);
          } catch {
            throw new TimeoutError();
          }
        }
        throw new TimeoutError();
      }

      // Network error — retry
      if (defaultRetryConfig.retryCondition(error)) {
        try {
          return await retryRequest(api, config, defaultRetryConfig);
        } catch {
          throw new NetworkError();
        }
      }
      throw new NetworkError();
    }

    const { status, data } = error.response;

    // 401 — Token expired or invalid
    if (status === 401) {
      // Try token refresh
      const refreshed = await attemptTokenRefresh();
      if (refreshed && config) {
        // Retry original request with new token
        const newToken = useAuthStore.getState().token;
        config.headers.Authorization = `Bearer ${newToken}`;
        return api.request(config);
      }

      // Refresh failed — logout
      useAuthStore.getState().logout();
      throw new AuthenticationError(data?.error?.message);
    }

    // 5xx — Server error with retry
    if (status >= 500 && defaultRetryConfig.retryCondition(error)) {
      try {
        return await retryRequest(api, config, defaultRetryConfig);
      } catch {
        throw new ApiError(
          data?.error?.message || 'Server error',
          status,
          data?.error?.code || 'SERVER_ERROR',
          data?.error?.details,
        );
      }
    }

    // 4xx — Client error (no retry)
    throw new ApiError(
      data?.error?.message || 'Request failed',
      status,
      data?.error?.code || 'CLIENT_ERROR',
      data?.error?.details,
    );
  },
);

// ─── Token Refresh ───

let refreshPromise: Promise<boolean> | null = null;

async function attemptTokenRefresh(): Promise<boolean> {
  // Prevent multiple concurrent refresh attempts
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      // TODO: Replace with actual refresh endpoint
      const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        token: useAuthStore.getState().token,
      });

      if (response.data?.token) {
        useAuthStore.getState().setToken(response.data.token);
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// ─── Convenience Methods ───

export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await api.get<ApiResponse<T>>(url, config);
  return response.data.data;
}

export async function post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const response = await api.post<ApiResponse<T>>(url, data, config);
  return response.data.data;
}

export async function put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const response = await api.put<ApiResponse<T>>(url, data, config);
  return response.data.data;
}

export async function patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const response = await api.patch<ApiResponse<T>>(url, data, config);
  return response.data.data;
}

export async function del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await api.delete<ApiResponse<T>>(url, config);
  return response.data.data;
}

// ─── Upload Helper ───

export async function upload<T>(
  url: string,
  formData: FormData,
  onProgress?: (progress: number) => void,
): Promise<T> {
  const response = await api.post<ApiResponse<T>>(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      }
    },
  });
  return response.data.data;
}

export default api;
