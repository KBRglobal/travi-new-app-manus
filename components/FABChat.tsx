import { Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, shadows } from '../constants/theme';

// Global AI Chat FAB — uses mascot duck emoji as placeholder
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
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.fab,
      }}
    >
      <Text style={{ fontSize: 24 }}>🦆</Text>
    </TouchableOpacity>
  );
}
