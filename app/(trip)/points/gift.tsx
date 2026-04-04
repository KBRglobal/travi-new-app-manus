import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

const AMOUNTS = [100, 250, 500, 1000, 2500, 5000];

export default function GiftPointsScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (sent) return (
    <View className="flex-1 bg-bg-primary items-center justify-center px-8">
      <Text className="text-5xl mb-4">🎁</Text>
      <Text className="text-white text-2xl font-bold mb-2">Points Sent!</Text>
      <Text className="text-white/60 text-center mb-6">{amount} points sent to {recipient}</Text>
      <TouchableOpacity onPress={() => router.back()} className="bg-primary px-8 py-3 rounded-xl"><Text className="text-white font-bold">Done</Text></TouchableOpacity>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Gift Points</Text>
      </View>
      <View className="items-center py-4">
        <Text className="text-white/60 text-sm">Available: 15,400 pts</Text>
      </View>
      <View className="mx-4 mb-4">
        <Text className="text-white/60 text-xs uppercase mb-2 ml-1">Amount</Text>
        <View className="flex-row flex-wrap">
          {AMOUNTS.map(a => (
            <TouchableOpacity key={a} onPress={() => setAmount(a)} className={`px-4 py-3 rounded-xl mr-2 mb-2 ${amount === a ? 'bg-primary' : 'bg-white/[0.05] border border-white/[0.08]'}`}>
              <Text className={`font-bold ${amount === a ? 'text-white' : 'text-white/60'}`}>{a} pts</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View className="mx-4 mb-4">
        <Text className="text-white/60 text-xs uppercase mb-2 ml-1">Recipient</Text>
        <TextInput className="bg-bg-secondary rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={recipient} onChangeText={setRecipient} placeholder="Search by name or email" placeholderTextColor="rgba(255,255,255,0.3)" />
      </View>
      <View className="mx-4 mb-6">
        <Text className="text-white/60 text-xs uppercase mb-2 ml-1">Message (optional)</Text>
        <TextInput className="bg-bg-secondary rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={message} onChangeText={setMessage} placeholder="Add a personal message" placeholderTextColor="rgba(255,255,255,0.3)" />
      </View>
      <TouchableOpacity onPress={() => amount > 0 && recipient ? setSent(true) : null} className={`mx-4 py-4 rounded-2xl items-center ${amount > 0 && recipient ? 'bg-primary' : 'bg-white/[0.05]'}`}>
        <Text className={`font-bold ${amount > 0 && recipient ? 'text-white' : 'text-white/30'}`}>Send Gift</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
