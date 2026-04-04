import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

// DS object as provided in the prompt

const ChangeCredentials = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleChangePassword = () => {
    // Handle password change logic here
    console.log('Old Password:', oldPassword);
    console.log('New Password:', newPassword);
    console.log('Confirm New Password:', confirmNewPassword);
    alert('Password change initiated!');
  };

  return (
    <ScreenWrapper title="Change Credentials" scrollable={true}>
      <View style={styles.container}>
        <Text style={styles.header}>Update Your Password</Text>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <Text style={styles.label}>Old Password</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons name="lock-outline" size={20} color={DS.muted} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter old password"
              placeholderTextColor={DS.placeholder}
              secureTextEntry
              value={oldPassword}
              onChangeText={setOldPassword}
            />
          </View>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <Text style={styles.label}>New Password</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons name="lock" size={20} color={DS.muted} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter new password"
              placeholderTextColor={DS.placeholder}
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
          </View>
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <Text style={styles.label}>Confirm New Password</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons name="lock-reset" size={20} color={DS.muted} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm new password"
              placeholderTextColor={DS.placeholder}
              secureTextEntry
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
            />
          </View>
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
  header: {
    fontFamily: 'Chillax-Bold',
    fontSize: 28,
    color: DS.white,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 15,
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.secondary,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DS.surfaceHigh,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.white,
  },
  buttonContainer: {
    marginTop: 30,
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
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginRight: 10,
  },
  buttonIcon: {
    marginLeft: 5,
  },
});

export default ChangeCredentials;
