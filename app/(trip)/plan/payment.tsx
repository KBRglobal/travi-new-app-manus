import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function PaymentScreen() {
 const router = useRouter();
 const [method, setMethod] = useState('card');
 const [useWallet, setUseWallet] = useState(false);
 const [processing, setProcessing] = useState(false);

 const handlePay = () => {
 setProcessing(true);
 setTimeout(() => {
 const success = Math.random() > 0.1;
 if (success) router.replace('/(trip)/plan/confirmation');
 else router.replace('/(trip)/plan/payment-failed');
 }, 2000);
 };

 return (
 <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
 <ScreenHeader title="Payment" />
 </View>
 <View className="mx-4 mb-4 p-4 bg-[#120824] rounded-2xl border border-white/[0.08]">
 <View className="flex-row justify-between"><Text className="/60" style={{ color: colors.text.primary }}>Total</Text><Text className=" font-[Satoshi-Bold] text-xl" style={{ color: colors.text.primary }}>$2,745</Text></View>
 </View>
 <View className="mx-4 mb-4">
 <Text className="/60 text-xs uppercase mb-3 ml-1" style={{ color: colors.text.primary }}>Payment Method</Text>
 {[
 { id: 'card', iconName: 'card', name: 'Credit Card', sub: '•••• 4242' },
 { id: 'apple', emoji: '', name: 'Apple Pay', sub: '' },
 { id: 'google', emoji: 'ellipse', name: 'Google Pay', sub: '' },
 ].map(m => (
 <TouchableOpacity key={m.id} onPress={() => setMethod(m.id)} className={`flex-row items-center p-4 mb-2 rounded-2xl border ${method === m.id ? 'bg-[#6443F4]/10 border-[#6443F4]' : 'bg-[#120824] border-white/[0.08]'}`}>
 <Text className="text-2xl mr-3">{m.emoji}</Text>
 <View className="flex-1"><Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>{m.name}</Text>{m.sub ? <Text className="/40 text-xs" style={{ color: colors.text.primary }}>{m.sub}</Text> : null}</View>
 {method === m.id && <Ionicons name="checkmark" size={24} color="#FFFFFF" />}
 </TouchableOpacity>
 ))}
 </View>
 <TouchableOpacity onPress={() => setUseWallet(!useWallet)} className={`flex-row items-center mx-4 mb-6 p-4 rounded-2xl border ${useWallet ? 'bg-[#6443F4]/10 border-[#6443F4]' : 'bg-[#120824] border-white/[0.08]'}`}>
 
 <View className="flex-1"><Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Use Wallet Balance</Text><Text className="/40 text-xs" style={{ color: colors.text.primary }}>Available: $142.50</Text></View>
 <Text className={useWallet ? 'text-[#6443F4]' : 'text-white/20'}>{useWallet ? 'checkmark' : '○'}</Text>
 </TouchableOpacity>
 <TouchableOpacity onPress={handlePay} disabled={processing} className="mx-4 mb-8 bg-[#6443F4] py-4 rounded-2xl items-center flex-row justify-center">
 {processing ? <ActivityIndicator color="white" className="mr-2" /> : null}
 <Text className=" font-[Satoshi-Bold] text-lg" style={{ color: colors.text.primary }}>{processing ? 'Processing...' : 'Pay $2,745'}</Text>
 </TouchableOpacity>
 </ScrollView>
 );
}
