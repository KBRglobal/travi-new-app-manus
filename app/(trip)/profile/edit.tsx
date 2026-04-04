import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

export default function EditProfileScreen() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState('John Doe');
  const [bio, setBio] = useState('Adventure seeker & foodie traveler');
  const [location, setLocation] = useState('New York, USA');
  const [website, setWebsite] = useState('');
  const [instagram, setInstagram] = useState('');

  return (
    <ScrollView className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold">Edit Profile</Text>
        <TouchableOpacity onPress={() => router.back()}><Text className="text-primary font-bold">Save</Text></TouchableOpacity>
      </View>
      <View className="items-center py-6">
        <View className="w-24 h-24 rounded-full bg-primary/20 items-center justify-center mb-3">
          <Text className="text-5xl">🧑</Text>
        </View>
        <TouchableOpacity><Text className="text-primary font-bold">Change Photo</Text></TouchableOpacity>
      </View>
      <View className="px-4">
        <View className="mb-4">
          <Text className="text-white/60 text-xs uppercase mb-2 ml-1">Display Name</Text>
          <TextInput className="bg-bg-secondary rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={displayName} onChangeText={setDisplayName} />
        </View>
        <View className="mb-4">
          <Text className="text-white/60 text-xs uppercase mb-2 ml-1">Bio</Text>
          <TextInput className="bg-bg-secondary rounded-xl px-4 py-3 text-white border border-white/[0.08] h-24" value={bio} onChangeText={setBio} multiline textAlignVertical="top" maxLength={150} />
          <Text className="text-white/30 text-xs text-right mt-1">{bio.length}/150</Text>
        </View>
        <View className="mb-4">
          <Text className="text-white/60 text-xs uppercase mb-2 ml-1">Location</Text>
          <TextInput className="bg-bg-secondary rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={location} onChangeText={setLocation} />
        </View>
        <View className="mb-4">
          <Text className="text-white/60 text-xs uppercase mb-2 ml-1">Website</Text>
          <TextInput className="bg-bg-secondary rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={website} onChangeText={setWebsite} placeholder="https://" placeholderTextColor="rgba(255,255,255,0.3)" />
        </View>
        <View className="mb-4">
          <Text className="text-white/60 text-xs uppercase mb-2 ml-1">Instagram</Text>
          <TextInput className="bg-bg-secondary rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={instagram} onChangeText={setInstagram} placeholder="@username" placeholderTextColor="rgba(255,255,255,0.3)" />
        </View>
      </View>
    </ScrollView>
  );
}
