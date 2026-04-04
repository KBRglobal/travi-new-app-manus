import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const DeleteAccountScreen = () => {
  const router = useRouter();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteAccount = () => {
    if (confirmDelete) {
      // Logic to delete account
      console.log('Account deletion confirmed');
      alert('Account deleted successfully!');
    } else {
      alert('Please confirm to delete your account.');
    }
  };

  return (
    <ScreenWrapper title="Delete Account" scrollable={true}>
      <View style={styles.container}>
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="warning" size={48} color={DS.warning} />
          </View>
          <Text style={styles.headerText}>Are you sure?</Text>
          <Text style={styles.bodyText}>
            Deleting your account is a permanent action and cannot be undone. All your data, including travel plans, bookings, and personal information, will be permanently erased.
          </Text>
          <Text style={styles.bodyText}>
            Please consider this carefully before proceeding.
          </Text>

          <View style={styles.confirmationRow}>
            <Text style={styles.label}>I understand and want to delete my account</Text>
            <Switch
              trackColor={{ false: DS.muted, true: DS.pink }}
              thumbColor={confirmDelete ? DS.purple : DS.white}
              ios_backgroundColor={DS.muted}
              onValueChange={setConfirmDelete}
              value={confirmDelete}
            />
          </View>

          <TouchableOpacity
            onPress={handleDeleteAccount}
            disabled={!confirmDelete}
            style={styles.buttonContainer}
          >
            <LinearGradient
              colors={confirmDelete ? DS.gradient : [DS.muted, DS.muted]}
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.buttonText}>Delete My Account</Text>
            </LinearGradient>
          </TouchableOpacity>
        </BlurView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  headerText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 24,
    color: DS.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  bodyText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.secondary,
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 22,
  },
  confirmationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
    flexShrink: 1,
    marginRight: 10,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  gradientButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 18,
    color: DS.white,
  },
});

export default DeleteAccountScreen;
