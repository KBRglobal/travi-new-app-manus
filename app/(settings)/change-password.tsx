import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

// Simulate DS object from ScreenWrapper for styling

const ChangePasswordScreen = () => {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleChangePassword = () => {
    // Handle password change logic here
    console.log('Changing password...');
  };

  return (
    <ScreenWrapper title="Change Password" scrollable={true}>
      <View style={styles.container}>
        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <Text style={styles.label}>Current Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter current password"
            placeholderTextColor={DS.placeholder}
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            placeholderTextColor={DS.placeholder}
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          <Text style={styles.label}>Confirm New Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm new password"
            placeholderTextColor={DS.placeholder}
            secureTextEntry
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
          />
        </BlurView>

        <TouchableOpacity onPress={handleChangePassword} style={styles.buttonContainer}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Change Password</Text>
            <MaterialIcons name="arrow-forward" size={20} color={DS.white} style={styles.buttonIcon} />
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
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: "hidden",
    padding: 15,
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Satoshi-Medium', // Assuming Satoshi-Medium is loaded
    fontSize: 16,
    color: DS.white,
    marginBottom: 10,
  },
  input: {
    fontFamily: 'Satoshi-Regular', // Assuming Satoshi-Regular is loaded
    fontSize: 16,
    color: DS.white,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: DS.borderStrong,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontFamily: 'Chillax-Bold', // Assuming Chillax-Bold is loaded
    fontSize: 18,
    color: DS.white,
    marginRight: 10,
  },
  buttonIcon: {
    // Icon styling if needed
  },
});

export default ChangePasswordScreen;
