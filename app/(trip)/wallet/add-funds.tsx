import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

const AMOUNTS = [10, 25, 50, 100, 250, 500];

export default function AddFundsScreen() {
 const router = useRouter();
 const [amount, setAmount] = useState(0);
 const [customAmount, setCustomAmount] = useState('');
 const [method, setMethod] = useState('');
 const [success, setSuccess] = useState(false);

 const methods = [
 { id: 'card', iconName: 'card', name: 'Credit/Debit Card', last4: '4242' },
 { id: 'apple', emoji: '', name: 'Apple Pay', last4: '' },
 { id: 'google', emoji: 'ellipse', name: 'Google Pay', last4: '' },
 { id: 'paypal', emoji: '🅿', name: 'PayPal', last4: 'john@...' },
 ];

 if (success) return (
 <View style={{ flex: 1, backgroundColor: colors.bg.primary }} items-center justify-center px-8">
 <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
 <Text className=" text-2xl font-[Satoshi-Bold] mb-2" style={{ color: colors.text.primary }}>Funds Added!</Text>
 <Text className="/60 text-center mb-6" style={{ color: colors.text.primary }}>${amount || customAmount} has been added to your wallet.</Text>
 <TouchableOpacity onPress={() => router.back()} className="bg-[#6443F4] px-8 py-3 rounded-xl"><Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Done</Text></TouchableOpacity>
 </View>
 );

 return (
 <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <ScreenHeader title="Add Funds" />
 </View>
 <View className="mx-4 mb-4">
 <Text className="/60 text-xs uppercase mb-3 ml-1" style={{ color: colors.text.primary }}>Select Amount</Text>
 <View className="flex-row flex-wrap">
 {AMOUNTS.map(a => (
 <TouchableOpacity key={a} onPress={() => { setAmount(a); setCustomAmount(''); }} className={`w-[31%] py-4 rounded-xl m-[1%] items-center ${amount === a ? 'bg-[#6443F4]' : 'bg-[#120824] border border-white/[0.08]'}`}>
 <Text className={`font-[Satoshi-Bold] text-lg ${amount === a ? 'text-white' : 'text-white/60'}`}>${a}</Text>
 </TouchableOpacity>
 ))}
 </View>
 <TextInput className="bg-[#120824] rounded-xl px-4 py-3 text-white border border-white/[0.08] mt-3 text-center text-lg" value={customAmount} onChangeText={(t) => { setCustomAmount(t); setAmount(0); }} placeholder="Custom amount" placeholderTextColor="rgba(255,255,255,0.3)" keyboardType="numeric" />
 </View>
 <View className="mx-4 mb-6">
 <Text className="/60 text-xs uppercase mb-3 ml-1" style={{ color: colors.text.primary }}>Payment Method</Text>
 {methods.map(m => (
 <TouchableOpacity key={m.id} onPress={() => setMethod(m.id)} className={`flex-row items-center p-4 mb-2 rounded-2xl border ${method === m.id ? 'bg-[#6443F4]/10 border-[#6443F4]' : 'bg-[#120824] border-white/[0.08]'}`}>
 <Text className="text-2xl mr-3">{m.emoji}</Text>
 <View className="flex-1">
 <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{m.name}</Text>
 {m.last4 ? <Text className="/40 text-xs" style={{ color: colors.text.primary }}>{m.last4}</Text> : null}
 </View>
 {method === m.id && <Ionicons name="checkmark" size={24} color="#FFFFFF" />}
 </TouchableOpacity>
 ))}
 </View>
 <TouchableOpacity onPress={() => (amount > 0 || customAmount) && method ? setSuccess(true) : null} className={`mx-4 mb-8 py-4 rounded-2xl items-center ${(amount > 0 || customAmount) && method ? 'bg-[#6443F4]' : 'bg-white/[0.05]'}`}>
 <Text className={`font-[Satoshi-Bold] text-lg ${(amount > 0 || customAmount) && method ? 'text-white' : 'text-white/30'}`}>Add ${amount || customAmount || '0'}</Text>
 </TouchableOpacity>
 </ScrollView>
 );
}
