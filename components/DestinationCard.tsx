import { View, Text } from 'react-native';

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
        backgroundColor: '#1A0B32',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
      }}
    >
      <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>
        {name || 'Destination'}
      </Text>
      <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 4 }}>
        {country || 'Country'}
      </Text>
      {matchScore !== undefined && (
        <Text style={{ color: '#6443F4', fontSize: 12, marginTop: 4 }}>
          {matchScore}% Match
        </Text>
      )}
    </View>
  );
}
