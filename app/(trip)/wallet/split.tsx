import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

const FRIENDS = [
  { id: '1', name: 'Sarah K.', avatar: '👩', selected: false, amount: 0 },
  { id: '2', name: 'Mike R.', avatar: '👨', selected: false, amount: 0 },
  { id: '3', name: 'Emma L.', avatar: '👱‍♀️', selected: false, amount: 0 },
  { id: '4', name: 'David W.', avatar: '🧔', selected: false, amount: 0 },
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
    <View className="flex-1 bg-bg-primary items-center justify-center px-8">
      <Text className="text-5xl mb-4">💸</Text>
      <Text className="text-white text-2xl font-bold mb-2">Split Sent!</Text>
      <Text className="text-white/60 text-center mb-6">Payment requests sent to {selectedFriends.length} people.</Text>
      <TouchableOpacity onPress={() => router.back()} className="bg-primary px-8 py-3 rounded-xl"><Text className="text-white font-bold">Done</Text></TouchableOpacity>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Split Payment</Text>
      </View>
      <View className="mx-4 mb-4">
        <Text className="text-white/60 text-xs uppercase mb-2 ml-1">Total Amount</Text>
        <TextInput className="bg-bg-secondary rounded-xl px-4 py-4 text-white text-2xl font-bold text-center border border-white/[0.08]" value={total} onChangeText={setTotal} keyboardType="numeric" />
      </View>
      <View className="flex-row mx-4 mb-4">
        <TouchableOpacity onPress={() => setSplitType('equal')} className={`flex-1 py-2 rounded-xl mr-1 ${splitType === 'equal' ? 'bg-primary' : 'bg-white/[0.05]'}`}>
          <Text className={`text-center font-bold ${splitType === 'equal' ? 'text-white' : 'text-white/60'}`}>Equal Split</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSplitType('custom')} className={`flex-1 py-2 rounded-xl ml-1 ${splitType === 'custom' ? 'bg-primary' : 'bg-white/[0.05]'}`}>
          <Text className={`text-center font-bold ${splitType === 'custom' ? 'text-white' : 'text-white/60'}`}>Custom</Text>
        </TouchableOpacity>
      </View>
      <View className="mx-4 mb-4">
        <Text className="text-white/60 text-xs uppercase mb-3 ml-1">Split With</Text>
        {friends.map(f => (
          <TouchableOpacity key={f.id} onPress={() => toggleFriend(f.id)} className={`flex-row items-center p-4 mb-2 rounded-2xl border ${f.selected ? 'bg-primary/10 border-primary' : 'bg-bg-secondary border-white/[0.08]'}`}>
            <Text className="text-2xl mr-3">{f.avatar}</Text>
            <Text className="text-white font-bold flex-1">{f.name}</Text>
            {f.selected && splitType === 'equal' && <Text className="text-primary font-bold">${splitAmount}</Text>}
            {f.selected && <Text className="text-primary ml-2">✓</Text>}
          </TouchableOpacity>
        ))}
      </View>
      {selectedFriends.length > 0 && (
        <View className="mx-4 mb-4 p-4 bg-bg-secondary rounded-2xl border border-white/[0.08]">
          <View className="flex-row justify-between mb-1"><Text className="text-white/60">Total</Text><Text className="text-white font-bold">${total}</Text></View>
          <View className="flex-row justify-between mb-1"><Text className="text-white/60">Your share</Text><Text className="text-white">${splitAmount}</Text></View>
          <View className="flex-row justify-between"><Text className="text-white/60">Each pays</Text><Text className="text-primary font-bold">${splitAmount}</Text></View>
        </View>
      )}
      <TouchableOpacity onPress={() => selectedFriends.length > 0 ? setSent(true) : null} className={`mx-4 mb-8 py-4 rounded-2xl items-center ${selectedFriends.length > 0 ? 'bg-primary' : 'bg-white/[0.05]'}`}>
        <Text className={`font-bold ${selectedFriends.length > 0 ? 'text-white' : 'text-white/30'}`}>Send Split Request</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
