import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * useAsync — Hook for managing async operations with loading, error, and data states.
 * 
 * Usage:
 * ```tsx
 * const { data, isLoading, error, execute, retry } = useAsync(
 *   () => tripService.getTrips(),
 *   { immediate: true }
 * );
 * ```
 */
export function useAsync<T>(
  asyncFn: () => Promise<T>,
  options: {
    immediate?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
  } = {}
) {
  const { immediate = false, onSuccess, onError } = options;
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(immediate);
  const [error, setError] = useState<Error | null>(null);
  const mountedRef = useRef(true);

  const execute = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await asyncFn();
      if (mountedRef.current) {
        setData(result);
        onSuccess?.(result);
      }
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      if (mountedRef.current) {
        setError(error);
        onError?.(error);
      }
      throw error;
    } finally {
      if (mountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [asyncFn, onSuccess, onError]);

  const retry = useCallback(() => {
    return execute();
  }, [execute]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    if (immediate) {
      execute().catch(() => {}); // Error is already handled in state
    }
    return () => {
      mountedRef.current = false;
    };
  }, []); // Only run on mount

  return {
    data,
    isLoading,
    error,
    execute,
    retry,
    reset,
    isSuccess: data !== null && !error,
    isError: error !== null,
  };
}

/**
 * useMutation — Hook for managing mutation operations (POST, PUT, DELETE).
 * 
 * Usage:
 * ```tsx
 * const { mutate, isLoading } = useMutation(
 *   (data: CreateTripInput) => tripService.createTrip(data),
 *   { onSuccess: (trip) => router.push(`/trip/${trip.id}`) }
 * );
 * ```
 */
export function useMutation<TInput, TOutput>(
  mutationFn: (input: TInput) => Promise<TOutput>,
  options: {
    onSuccess?: (data: TOutput) => void;
    onError?: (error: Error) => void;
  } = {}
) {
  const { onSuccess, onError } = options;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<TOutput | null>(null);
  const mountedRef = useRef(true);

  const mutate = useCallback(
    async (input: TInput) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await mutationFn(input);
        if (mountedRef.current) {
          setData(result);
          onSuccess?.(result);
        }
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        if (mountedRef.current) {
          setError(error);
          onError?.(error);
        }
        throw error;
      } finally {
        if (mountedRef.current) {
          setIsLoading(false);
        }
      }
    },
    [mutationFn, onSuccess, onError]
  );

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return {
    mutate,
    isLoading,
    error,
    data,
    reset: () => {
      setData(null);
      setError(null);
      setIsLoading(false);
    },
  };
}
