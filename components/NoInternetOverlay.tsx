import { View, Text } from 'react-native';
import { colors, fonts, fontSizes } from '../constants/theme';

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
        backgroundColor: colors.bg.overlay,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <Text style={{ fontSize: 40 }}>📶</Text>
      <Text
        style={{
          fontFamily: fonts.heading,
          fontSize: fontSizes.h3,
          color: colors.text.primary,
          marginTop: 16,
        }}
      >
        No Internet Connection
      </Text>
      <Text
        style={{
          fontFamily: fonts.body,
          fontSize: fontSizes.bodySm,
          color: colors.text.secondary,
          marginTop: 8,
        }}
      >
        Check your connection and try again
      </Text>
    </View>
  );
}
