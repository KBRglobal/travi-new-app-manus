import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function EditProfileScreen() {
 const router = useRouter();
 const [displayName, setDisplayName] = useState('John Doe');
 const [bio, setBio] = useState('Adventure seeker & foodie traveler');
 const [location, setLocation] = useState('New York, USA');
 const [website, setWebsite] = useState('');
 const [instagram, setInstagram] = useState('');

 return (
 <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <View className="flex-row items-center justify-between px-4 py-3">
 <TouchableOpacity onPress={() => router.back()}><Text className=" text-lg" style={{ color: colors.text.primary }}>←</Text></TouchableOpacity>
 <Text className=" text-xl font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Edit Profile</Text>
 <TouchableOpacity onPress={() => router.back()}><Text className="text-[#6443F4] font-[Satoshi-Bold]">Save</Text></TouchableOpacity>
 </View>
 <View className="items-center py-6">
 <View className="w-24 h-24 rounded-full bg-[#6443F4]/20 items-center justify-center mb-3">
 <Text className="text-5xl">person</Text>
 </View>
 <TouchableOpacity><Text className="text-[#6443F4] font-[Satoshi-Bold]">Change Photo</Text></TouchableOpacity>
 </View>
 <View className="px-4">
 <View className="mb-4">
 <Text className="/60 text-xs uppercase mb-2 ml-1" style={{ color: colors.text.primary }}>Display Name</Text>
 <TextInput className="bg-[#120824] rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={displayName} onChangeText={setDisplayName} />
 </View>
 <View className="mb-4">
 <Text className="/60 text-xs uppercase mb-2 ml-1" style={{ color: colors.text.primary }}>Bio</Text>
 <TextInput className="bg-[#120824] rounded-xl px-4 py-3 text-white border border-white/[0.08] h-24" value={bio} onChangeText={setBio} multiline textAlignVertical="top" maxLength={150} />
 <Text className="/30 text-xs text-right mt-1" style={{ color: colors.text.primary }}>{bio.length}/150</Text>
 </View>
 <View className="mb-4">
 <Text className="/60 text-xs uppercase mb-2 ml-1" style={{ color: colors.text.primary }}>Location</Text>
 <TextInput className="bg-[#120824] rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={location} onChangeText={setLocation} />
 </View>
 <View className="mb-4">
 <Text className="/60 text-xs uppercase mb-2 ml-1" style={{ color: colors.text.primary }}>Website</Text>
 <TextInput className="bg-[#120824] rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={website} onChangeText={setWebsite} placeholder="https://" placeholderTextColor="rgba(255,255,255,0.3)" />
 </View>
 <View className="mb-4">
 <Text className="/60 text-xs uppercase mb-2 ml-1" style={{ color: colors.text.primary }}>Instagram</Text>
 <TextInput className="bg-[#120824] rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={instagram} onChangeText={setInstagram} placeholder="@username" placeholderTextColor="rgba(255,255,255,0.3)" />
 </View>
 </View>
 </ScrollView>
 );
}
