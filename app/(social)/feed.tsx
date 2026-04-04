import { Skeleton } from '@/components/ui/Skeleton';
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/ui/EmptyState';

const FEED_POSTS = [
  { id: '1', user: 'Sarah K.', avatar: '👩', destination: 'Barcelona', image: '🏰', caption: 'Sagrada Familia at sunset!', likes: 42, comments: 8, timeAgo: '2h', liked: false },
  { id: '2', user: 'Mike R.', avatar: '👨', destination: 'Tokyo', image: '🗼', caption: 'Lost in Shibuya crossing', likes: 67, comments: 12, timeAgo: '4h', liked: true },
  { id: '3', user: 'Emma L.', avatar: '👱‍♀️', destination: 'Bali', image: '🌴', caption: 'Rice terraces are unreal', likes: 89, comments: 15, timeAgo: '6h', liked: false },
  { id: '4', user: 'David W.', avatar: '🧔', destination: 'Iceland', image: '🏔️', caption: 'Northern lights finally!', likes: 134, comments: 23, timeAgo: '8h', liked: false },
  { id: '5', user: 'Lisa M.', avatar: '👩‍🦰', destination: 'Marrakech', image: '🕌', caption: 'Spice market vibes', likes: 56, comments: 9, timeAgo: '12h', liked: true },
];

export default function SocialFeedScreen() {
  const router = useRouter();
  const [posts, setPosts] = useState(FEED_POSTS);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const toggleLike = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
  };

  const renderPost = ({ item }: { item: typeof FEED_POSTS[0] }) => (
    <View className="bg-bg-secondary mx-4 mb-4 rounded-2xl overflow-hidden border border-white/[0.08]">
      <TouchableOpacity onPress={() => router.push(`/(social)/profile/${item.id}`)} className="flex-row items-center p-4 pb-2">
        <Text className="text-2xl mr-3">{item.avatar}</Text>
        <View className="flex-1">
          <Text className="text-white font-bold text-base">{item.user}</Text>
          <Text className="text-white/60 text-xs">{item.destination} · {item.timeAgo}</Text>
        </View>
        <TouchableOpacity><Text className="text-white/40 text-xl">···</Text></TouchableOpacity>
      </TouchableOpacity>
      <View className="bg-white/[0.05] h-64 items-center justify-center">
        <Text className="text-8xl">{item.image}</Text>
      </View>
      <View className="p-4">
        <Text className="text-white text-sm mb-3">{item.caption}</Text>
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => toggleLike(item.id)} className="flex-row items-center mr-5">
            <Text className="text-lg mr-1">{item.liked ? '❤️' : '🤍'}</Text>
            <Text className="text-white/60 text-sm">{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center mr-5">
            <Text className="text-lg mr-1">💬</Text>
            <Text className="text-white/60 text-sm">{item.comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center">
            <Text className="text-lg">📤</Text>
          </TouchableOpacity>
          <View className="flex-1" />
          <TouchableOpacity><Text className="text-lg">🔖</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center justify-between px-4 py-3">
        <Text className="text-white text-2xl font-bold">Feed</Text>
        <View className="flex-row">
          <TouchableOpacity onPress={() => router.push('/(social)/discover')} className="mr-4"><Text className="text-2xl">🔍</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(social)/messages')}><Text className="text-2xl">✉️</Text></TouchableOpacity>
        </View>
      </View>
      <FlatList
            ListEmptyComponent={() => <EmptyState stateKey="feed" />}
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6443F4" />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
