import { View, Text } from 'react-native';

// S60 — No Internet Overlay (component, not a route)
export default function NoInternetOverlay() {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.95)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <Text style={{ color: '#FFFFFF', fontSize: 40 }}>📶</Text>
      <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>
        No Internet Connection
      </Text>
      <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 8 }}>
        Check your connection and try again
      </Text>
    </View>
  );
}
