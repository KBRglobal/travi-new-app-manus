import { View, Text } from 'react-native';
import { colors, fonts, fontSizes, radius, shadows } from '../constants/theme';

// Reused: S11 (Home), S12 (Explore), S14 (Destination Detail), S59 (Search Results)
interface DestinationCardProps {
  name?: string;
  country?: string;
  matchScore?: number;
}

export default function DestinationCard({ name, country, matchScore }: DestinationCardProps) {
  return (
    <View
      style={{
        backgroundColor: colors.bg.card,
        borderRadius: radius.card,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colors.border.default,
        ...shadows.card,
      }}
    >
      <Text
        style={{
          fontFamily: fonts.heading,
          fontSize: fontSizes.body,
          color: colors.text.primary,
        }}
      >
        {name || 'Destination'}
      </Text>
      <Text
        style={{
          fontFamily: fonts.body,
          fontSize: fontSizes.bodySm,
          color: colors.text.secondary,
          marginTop: 4,
        }}
      >
        {country || 'Country'}
      </Text>
      {matchScore !== undefined && (
        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: fontSizes.caption,
            color: colors.primary,
            marginTop: 4,
          }}
        >
          {matchScore}% Match
        </Text>
      )}
    </View>
  );
}
