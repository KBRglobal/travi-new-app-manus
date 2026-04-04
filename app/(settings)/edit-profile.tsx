import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const EditProfileScreen = () => {
  const router = useRouter();
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');

  const handleSaveChanges = () => {
    console.log('Saving changes:', { name, email });
    // Add actual save logic here
  };

  return (
    <ScreenWrapper title="Edit Profile" scrollable={true}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100/6443F4/FFFFFF?text=JD' }} // Placeholder avatar
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.changeAvatarButton}>
          <MaterialIcons name="edit" size={20} color={DS.purple} />
          <Text style={styles.changeAvatarText}>Change Avatar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        {Platform.OS === 'ios' ? (
          <BlurView intensity={20} tint="dark" style={styles.glassCard}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor={DS.placeholder}
            />
          </BlurView>
        ) : (
          <View style={[styles.glassCard, { backgroundColor: DS.surface }]}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor={DS.placeholder}
            />
          </View>
        )}
      </View>

      <View style={styles.cardContainer}>
        {Platform.OS === 'ios' ? (
          <BlurView intensity={20} tint="dark" style={styles.glassCard}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={DS.placeholder}
              keyboardType="email-address"
            />
          </BlurView>
        ) : (
          <View style={[styles.glassCard, { backgroundColor: DS.surface }]}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={DS.placeholder}
              keyboardType="email-address"
            />
          </View>
        )}
      </View>

      <TouchableOpacity onPress={handleSaveChanges} style={styles.saveButtonContainer}>
        <LinearGradient
          colors={[DS.purple, DS.pink] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.saveButtonGradient}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: DS.purple,
  },
  changeAvatarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: DS.surfaceHigh,
  },
  changeAvatarText: {
    color: DS.white,
    fontFamily: 'Satoshi-Medium',
    marginLeft: 5,
    fontSize: 14,
  },
  cardContainer: {
    marginBottom: 20,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    overflow: 'hidden',
    padding: 20,
  },
  label: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.muted,
    marginBottom: 8,
  },
  input: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 18,
    color: DS.white,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: DS.borderStrong,
  },
  saveButtonContainer: {
    marginTop: 30,
    borderRadius: 16,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: DS.white,
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
  },
});

export default EditProfileScreen;
