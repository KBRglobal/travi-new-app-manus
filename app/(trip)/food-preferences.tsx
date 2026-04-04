import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

// DS object as provided in the prompt

const foodOptions = [
  { id: 'vegetarian', label: 'Vegetarian', icon: 'leaf' },
  { id: 'vegan', label: 'Vegan', icon: 'spa' },
  { id: 'gluten-free', label: 'Gluten-Free', icon: 'grain' },
  { id: 'dairy-free', label: 'Dairy-Free', icon: 'free-breakfast' },
  { id: 'nut-allergy', label: 'Nut Allergy', icon: 'no-food' },
  { id: 'halal', label: 'Halal', icon: 'mosque' },
  { id: 'kosher', label: 'Kosher', icon: 'star-of-david' },
  { id: 'pescatarian', label: 'Pescatarian', icon: 'fish' },
];

const FoodPreferences = () => {
  const router = useRouter();
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const togglePreference = (id: string) => {
    setSelectedPreferences(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSavePreferences = () => {
    console.log('Saving preferences:', selectedPreferences);
    // In a real app, you would send this data to your backend
  };

  return (
    <ScreenWrapper title="Food Preferences" scrollable={true}>
      <View style={styles.container}>
        <Text style={styles.description}>Select your dietary preferences to help us tailor your travel experience.</Text>

        <View style={styles.optionsContainer}>
          {foodOptions.map(option => {
            const isSelected = selectedPreferences.includes(option.id);
            return (
              <TouchableOpacity
                key={option.id}
                style={styles.optionWrapper}
                onPress={() => togglePreference(option.id)}
              >
                <BlurView intensity={20} tint="dark" style={[
                  styles.glassCard,
                  isSelected && styles.selectedGlassCard
                ]}>
                  <MaterialIcons
                    name={option.icon as any}
                    size={24}
                    color={isSelected ? DS.purple : DS.white}
                  />
                  <Text style={[
                    styles.optionLabel,
                    isSelected && styles.selectedOptionLabel
                  ]}>
                    {option.label}
                  </Text>
                </BlurView>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSavePreferences}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.saveButtonText}>Save Preferences</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: DS.bg, // ScreenWrapper handles this, but good to have for consistency if not using SW
  },
  description: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  optionWrapper: {
    width: '45%', // Roughly two columns
    marginVertical: 10,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  selectedGlassCard: {
    borderColor: DS.borderStrong,
    backgroundColor: DS.surfaceHigh,
  },
  optionLabel: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
    color: DS.white,
    marginTop: 8,
    textAlign: 'center',
  },
  selectedOptionLabel: {
    color: DS.purple,
  },
  saveButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
  },
  gradientButton: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
  },
});

export default FoodPreferences;
