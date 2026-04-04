import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../../constants/theme';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary — Catches React rendering errors and displays a fallback UI.
 * Prevents the entire app from crashing when a single component fails.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Ionicons name="alert-circle" size={48} color={colors.status.error} />
          </View>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={this.handleRetry}>
            <Ionicons name="refresh" size={18} color="#FFFFFF" />
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

/**
 * ErrorState — Inline error display for failed data fetches.
 * Use this inside screens when an API call fails.
 */
export function ErrorState({
  message = 'Failed to load data',
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <View style={styles.errorState}>
      <Ionicons name="cloud-offline" size={40} color="rgba(255,255,255,0.3)" />
      <Text style={styles.errorMessage}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retrySmall} onPress={onRetry}>
          <Ionicons name="refresh" size={16} color={colors.brand.purple} />
          <Text style={styles.retrySmallText}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

/**
 * LoadingState — Centered loading indicator for screens.
 */
export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <View style={styles.loadingState}>
      <View style={styles.spinner}>
        <Ionicons name="refresh" size={24} color={colors.brand.purple} />
      </View>
      <Text style={styles.loadingMessage}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(248,113,113,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 20,
    color: colors.text.primary,
    marginBottom: 8,
  },
  message: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand.purple,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  retryText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: '#FFFFFF',
  },
  errorState: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  errorMessage: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.text.muted,
    textAlign: 'center',
  },
  retrySmall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginTop: 4,
  },
  retrySmallText: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.brand.purple,
  },
  loadingState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  spinner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(100,67,244,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingMessage: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.text.secondary,
  },
});
