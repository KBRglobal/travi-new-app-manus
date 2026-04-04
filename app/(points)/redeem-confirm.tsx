import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const RedeemConfirm = () => {
  return (
    <ScreenWrapper title="Redeem Points" scrollable={true}>
      <View style={styles.container}>
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <MaterialIcons name="confirmation-number" size={60} color={DS.purple} style={styles.icon} />
          <Text style={styles.title}>Confirm Redemption</Text>
          <Text style={styles.message}>You are about to redeem your points for a reward. Please confirm your selection.</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => { /* Handle confirmation */ }}>
              <LinearGradient
                colors={[DS.purple, DS.pink] as const}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => { /* Handle cancellation */ }}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 30,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Chillax-Bold',
    fontSize: 28,
    color: DS.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.muted,
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    width: '100%',
    borderRadius: 12,
    marginBottom: 15,
  },
  gradientButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.white,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: DS.borderStrong,
  },
  cancelButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: DS.secondary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});

export default RedeemConfirm;
