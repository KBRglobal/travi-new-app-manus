import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

// Global AI Chat FAB
export default function FABChat() {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push('/_modals/ai-chat')}
      style={{
        position: 'absolute',
        bottom: 100,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#6443F4',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#6443F4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      }}
    >
      <Text style={{ fontSize: 24 }}>🤖</Text>
    </TouchableOpacity>
  );
}
