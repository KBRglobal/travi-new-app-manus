import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const PreTripChecklist = () => {
  const checklistItems = [
    { id: '1', text: 'Confirm flight details', completed: true },
    { id: '2', text: 'Pack essential documents', completed: false },
    { id: '3', text: 'Arrange airport transfer', completed: true },
    { id: '4', text: 'Check weather forecast', completed: false },
    { id: '5', text: 'Notify bank of travel plans', completed: true },
    { id: '6', text: 'Download offline maps', completed: false },
    { id: '7', text: 'Charge all electronics', completed: true },
    { id: '8', text: 'Prepare local currency', completed: false },
  ];

  return (
    <ScreenWrapper title="Pre-Trip Checklist" scrollable={true}>
      <View style={styles.container}>
        {checklistItems.map((item) => (
          <BlurView key={item.id} intensity={20} tint="dark" style={styles.card}>
            <View style={styles.itemContent}>
              <MaterialIcons
                name={item.completed ? "check-circle" : "radio-button-unchecked"}
                size={24}
                color={item.completed ? DS.success : DS.muted}
                style={styles.icon}
              />
              <Text style={[styles.itemText, item.completed && styles.itemTextCompleted]}>
                {item.text}
              </Text>
            </View>
          </BlurView>
        ))}

        <TouchableOpacity activeOpacity={0.8} style={styles.ctaButton}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            <Text style={styles.ctaButtonText}>Complete Checklist</Text>
            <MaterialIcons name="arrow-forward" size={20} color={DS.white} style={styles.ctaIcon} />
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
    backgroundColor: DS.bg,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginBottom: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 15,
  },
  itemText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.white,
    flex: 1,
  },
  itemTextCompleted: {
    textDecorationLine: 'line-through',
    color: DS.muted,
  },
  ctaButton: {
    marginTop: 30,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 25,
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginRight: 10,
  },
  ctaIcon: {
    marginLeft: 5,
  },
});

export default PreTripChecklist;
