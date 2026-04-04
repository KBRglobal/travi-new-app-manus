import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const FRIENDS = [
 { id: '1', name: 'Sarah K.', avatar: 'person', selected: false, amount: 0 },
 { id: '2', name: 'Mike R.', avatar: 'person', selected: false, amount: 0 },
 { id: '3', name: 'Emma L.', avatar: 'person‍', selected: false, amount: 0 },
 { id: '4', name: 'David W.', avatar: 'person', selected: false, amount: 0 },
];

export default function SplitScreen() {
 const router = useRouter();
 const [total, setTotal] = useState('120');
 const [splitType, setSplitType] = useState<'equal' | 'custom'>('equal');
 const [friends, setFriends] = useState(FRIENDS);
 const [sent, setSent] = useState(false);

 const selectedFriends = friends.filter(f => f.selected);
 const splitAmount = selectedFriends.length > 0 ? (parseFloat(total) / (selectedFriends.length + 1)).toFixed(2) : '0';

 const toggleFriend = (id: string) => setFriends(prev => prev.map(f => f.id === id ? { ...f, selected: !f.selected } : f));

 if (sent) return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} items-center justify-center px-8">
 <Ionicons name="cash" size={24} color="#FFFFFF" />
 <Text className=" text-2xl font-[Satoshi-Bold] mb-2" style={{ color: colors.text.primary }}>Split Sent!</Text>
 <Text className="/60 text-center mb-6" style={{ color: colors.text.primary }}>Payment requests sent to {selectedFriends.length} people.</Text>
 <TouchableOpacity onPress={() => router.back()} className="bg-[#6443F4] px-8 py-3 rounded-xl"><Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Done</Text></TouchableOpacity>
 </View>
 );

 return (
 <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <ScreenHeader title="Split Payment" />
 </View>
 <View className="mx-4 mb-4">
 <Text className="/60 text-xs uppercase mb-2 ml-1" style={{ color: colors.text.primary }}>Total Amount</Text>
 <TextInput className="bg-[#120824] rounded-xl px-4 py-4 text-white text-2xl font-[Satoshi-Bold] text-center border border-white/[0.08]" value={total} onChangeText={setTotal} keyboardType="numeric" />
 </View>
 <View className="flex-row mx-4 mb-4">
 <TouchableOpacity onPress={() => setSplitType('equal')} className={`flex-1 py-2 rounded-xl mr-1 ${splitType === 'equal' ? 'bg-[#6443F4]' : 'bg-white/[0.05]'}`}>
 <Text className={`text-center font-[Satoshi-Bold] ${splitType === 'equal' ? 'text-white' : 'text-white/60'}`}>Equal Split</Text>
 </TouchableOpacity>
 <TouchableOpacity onPress={() => setSplitType('custom')} className={`flex-1 py-2 rounded-xl ml-1 ${splitType === 'custom' ? 'bg-[#6443F4]' : 'bg-white/[0.05]'}`}>
 <Text className={`text-center font-[Satoshi-Bold] ${splitType === 'custom' ? 'text-white' : 'text-white/60'}`}>Custom</Text>
 </TouchableOpacity>
 </View>
 <View className="mx-4 mb-4">
 <Text className="/60 text-xs uppercase mb-3 ml-1" style={{ color: colors.text.primary }}>Split With</Text>
 {friends.map(f => (
 <TouchableOpacity key={f.id} onPress={() => toggleFriend(f.id)} className={`flex-row items-center p-4 mb-2 rounded-2xl border ${f.selected ? 'bg-[#6443F4]/10 border-[#6443F4]' : 'bg-[#120824] border-white/[0.08]'}`}>
 <Text className="text-2xl mr-3">{f.avatar}</Text>
 <Text className=" font-[Satoshi-Bold] flex-1" style={{ color: colors.text.primary }}>{f.name}</Text>
 {f.selected && splitType === 'equal' && <Text className="text-[#6443F4] font-[Satoshi-Bold]">${splitAmount}</Text>}
 {f.selected && <Ionicons name="checkmark" size={24} color="#FFFFFF" />}
 </TouchableOpacity>
 ))}
 </View>
 {selectedFriends.length > 0 && (
 <View className="mx-4 mb-4 p-4 bg-[#120824] rounded-2xl border border-white/[0.08]">
 <View className="flex-row justify-between mb-1"><Text className="/60" style={{ color: colors.text.primary }}>Total</Text><Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>${total}</Text></View>
 <View className="flex-row justify-between mb-1"><Text className="/60" style={{ color: colors.text.primary }}>Your share</Text><Text className="" style={{ color: colors.text.primary }}>${splitAmount}</Text></View>
 <View className="flex-row justify-between"><Text className="/60" style={{ color: colors.text.primary }}>Each pays</Text><Text className="text-[#6443F4] font-[Satoshi-Bold]">${splitAmount}</Text></View>
 </View>
 )}
 <TouchableOpacity onPress={() => selectedFriends.length > 0 ? setSent(true) : null} className={`mx-4 mb-8 py-4 rounded-2xl items-center ${selectedFriends.length > 0 ? 'bg-[#6443F4]' : 'bg-white/[0.05]'}`}>
 <Text className={`font-[Satoshi-Bold] ${selectedFriends.length > 0 ? 'text-white' : 'text-white/30'}`}>Send Split Request</Text>
 </TouchableOpacity>
 </ScrollView>
 );
}
