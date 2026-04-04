import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

// The DS object is assumed to be exported from ScreenWrapper.tsx
// For demonstration, defining it here as it's not directly accessible in this context

const ProspectsCrmScreen = () => {
  return (
    <ScreenWrapper title="Prospects CRM" scrollable={true}>
      <View style={styles.contentContainer}>
        {/* Glass Card Example */}
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <Text style={styles.cardTitle}>New Prospect</Text>
          <Text style={styles.cardText}>Add a new prospect to your CRM.</Text>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaButton}
          >
            <Text style={styles.ctaButtonText}>Add Prospect <MaterialIcons name="add" size={16} color={DS.white} /></Text>
          </LinearGradient>
        </BlurView>

        {/* Another Glass Card for existing prospects */}
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <Text style={styles.cardTitle}>Existing Prospects</Text>
          <Text style={styles.cardText}>View and manage your current prospects.</Text>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaButton}
          >
            <Text style={styles.ctaButtonText}>View All <MaterialIcons name="arrow-forward" size={16} color={DS.white} /></Text>
          </LinearGradient>
        </BlurView>

        {/* Example of a list item within a glass card */}
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.prospectItem}>
            <MaterialIcons name="person" size={24} color={DS.purple} />
            <View style={styles.prospectInfo}>
              <Text style={styles.prospectName}>John Doe</Text>
              <Text style={styles.prospectStatus}>Status: <Text style={{ color: DS.success }}>Active</Text></Text>
            </View>
            <MaterialIcons name="edit" size={20} color={DS.muted} />
          </View>
          <View style={styles.prospectItem}>
            <MaterialIcons name="person" size={24} color={DS.purple} />
            <View style={styles.prospectInfo}>
              <Text style={styles.prospectName}>Jane Smith</Text>
              <Text style={styles.prospectStatus}>Status: <Text style={{ color: DS.warning }}>Pending</Text></Text>
            </View>
            <MaterialIcons name="edit" size={20} color={DS.muted} />
          </View>
        </BlurView>

      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    backgroundColor: DS.bg, // Ensure background is dark
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: "hidden",
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 20,
    color: DS.white,
    marginBottom: 10,
  },
  cardText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.muted,
    marginBottom: 15,
  },
  ctaButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
    marginRight: 5,
  },
  prospectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: DS.border,
    marginBottom: 5,
  },
  prospectInfo: {
    flex: 1,
    marginLeft: 10,
  },
  prospectName: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
  },
  prospectStatus: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 12,
    color: DS.muted,
  },
});

export default ProspectsCrmScreen;
