import React, { useCallback, useMemo } from 'react';
import { FlatList, FlatListProps, StyleSheet, View } from 'react-native';

interface OptimizedListProps<T> extends Omit<FlatListProps<T>, 'data' | 'renderItem'> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactElement;
  itemHeight?: number;
  keyField?: keyof T;
  emptyComponent?: React.ReactElement;
}

/**
 * OptimizedList — A performance-optimized FlatList wrapper.
 * 
 * Features:
 * - Automatic getItemLayout when itemHeight is provided
 * - removeClippedSubviews for off-screen recycling
 * - Optimized batch rendering (maxToRenderPerBatch, windowSize)
 * - Memoized renderItem wrapper
 * - Automatic keyExtractor from keyField or index
 */
export function OptimizedList<T extends Record<string, any>>({
  data,
  renderItem,
  itemHeight,
  keyField = 'id' as keyof T,
  emptyComponent,
  ...rest
}: OptimizedListProps<T>) {
  const memoizedRenderItem = useCallback(
    ({ item, index }: { item: T; index: number }) => renderItem(item, index),
    [renderItem]
  );

  const keyExtractor = useCallback(
    (item: T, index: number) => {
      if (keyField && item[keyField] != null) {
        return String(item[keyField]);
      }
      return String(index);
    },
    [keyField]
  );

  const getItemLayout = useMemo(() => {
    if (!itemHeight) return undefined;
    return (_data: ArrayLike<T> | null | undefined, index: number) => ({
      length: itemHeight,
      offset: itemHeight * index,
      index,
    });
  }, [itemHeight]);

  return (
    <FlatList
      data={data}
      renderItem={memoizedRenderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      maxToRenderPerBatch={10}
      windowSize={5}
      initialNumToRender={10}
      updateCellsBatchingPeriod={50}
      ListEmptyComponent={emptyComponent}
      showsVerticalScrollIndicator={false}
      {...rest}
    />
  );
}

/**
 * OptimizedHorizontalList — Horizontal variant with snap-to-item support.
 */
export function OptimizedHorizontalList<T extends Record<string, any>>({
  data,
  renderItem,
  itemHeight,
  keyField = 'id' as keyof T,
  ...rest
}: OptimizedListProps<T>) {
  const memoizedRenderItem = useCallback(
    ({ item, index }: { item: T; index: number }) => renderItem(item, index),
    [renderItem]
  );

  const keyExtractor = useCallback(
    (item: T, index: number) => {
      if (keyField && item[keyField] != null) {
        return String(item[keyField]);
      }
      return String(index);
    },
    [keyField]
  );

  return (
    <FlatList
      data={data}
      renderItem={memoizedRenderItem}
      keyExtractor={keyExtractor}
      horizontal
      showsHorizontalScrollIndicator={false}
      maxToRenderPerBatch={5}
      windowSize={3}
      {...rest}
    />
  );
}
