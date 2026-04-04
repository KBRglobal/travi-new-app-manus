import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { travelers } from '../../lib/mockData';

export default function SocialScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-bg-primary" contentContainerClassName="pt-safe pb-24">
      <Text className="text-white text-heading-1 px-6 mb-6">Community</Text>

      {/* Travel Buddies */}
      <View className="px-6 mb-6">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-white text-heading-3">Travel Buddies</Text>
          <TouchableOpacity onPress={() => router.push('/(social)/find-buddies')}>
            <Text className="text-primary text-body-sm">Find More</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={travelers}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInDown.delay(index * 100)}>
              <TouchableOpacity className="mr-4 items-center w-20" onPress={() => router.push(`/(social)/profile/${item.id}`)}>
                <Image source={{ uri: item.avatar }} className="w-16 h-16 rounded-full mb-2 border-2 border-primary" />
                <Text className="text-white text-caption text-center" numberOfLines={1}>{item.name.split(' ')[0]}</Text>
                <View className="bg-primary/20 px-2 py-0.5 rounded-full mt-1">
                  <Text className="text-primary text-caption font-semibold">{Math.round(item.compatibility * 100)}%</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}
        />
      </View>

      {/* Feed */}
      <View className="px-6">
        <Text className="text-white text-heading-3 mb-3">Travel Feed</Text>
        {[
          { id: 'p1', user: travelers[0], text: 'Just arrived in Barcelona! The architecture is incredible 🏛️', image: 'https://picsum.photos/400/300?random=60', likes: 24, comments: 5 },
          { id: 'p2', user: travelers[1], text: 'Best street food in Bangkok 🍜', image: 'https://picsum.photos/400/300?random=61', likes: 18, comments: 3 },
          { id: 'p3', user: travelers[2], text: 'Sunset from Santorini. No filter needed.', image: 'https://picsum.photos/400/300?random=62', likes: 42, comments: 8 },
        ].map((post, i) => (
          <Animated.View key={post.id} entering={FadeInDown.delay(i * 100)}>
            <View className="bg-bg-card border border-border rounded-card mb-4 overflow-hidden">
              <View className="flex-row items-center p-3">
                <Image source={{ uri: post.user.avatar }} className="w-10 h-10 rounded-full mr-3" />
                <Text className="text-white text-body font-semibold">{post.user.name}</Text>
              </View>
              <Image source={{ uri: post.image }} className="w-full h-48" resizeMode="cover" />
              <View className="p-3">
                <Text className="text-white text-body mb-2">{post.text}</Text>
                <View className="flex-row items-center">
                  <TouchableOpacity className="flex-row items-center mr-4">
                    <Text className="text-lg mr-1">❤️</Text>
                    <Text className="text-text-secondary text-body-sm">{post.likes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row items-center">
                    <Text className="text-lg mr-1">💬</Text>
                    <Text className="text-text-secondary text-body-sm">{post.comments}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
}
