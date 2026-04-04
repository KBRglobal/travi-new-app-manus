import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const InvitePartnerScreen = () => {
  return (
    <ScreenWrapper title="Invite Partner" scrollable={true}>
      <View style={styles.contentContainer}>
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <Text style={styles.label}>Partner Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter partner's email"
            placeholderTextColor={DS.placeholder}
            keyboardType="email-address"
          />
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.card}>
          <Text style={styles.label}>Personal Message (Optional)</Text>
          <TextInput
            style={[styles.textInput, styles.messageInput]}
            placeholder="Add a personal touch to your invitation"
            placeholderTextColor={DS.placeholder}
            multiline
            numberOfLines={4}
          />
        </BlurView>

        <TouchableOpacity activeOpacity={0.8} style={styles.ctaButton}>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            <MaterialIcons name="send" size={20} color={DS.white} />
            <Text style={styles.ctaButtonText}>Send Invitation</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <MaterialIcons name="info-outline" size={20} color={DS.muted} />
          <Text style={styles.infoText}>
            Your partner will receive an email with instructions to join your TRAVI trip.
          </Text>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    marginBottom: 20,
    padding: 15,
  },
  label: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
    marginBottom: 10,
  },
  textInput: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.white,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: DS.borderStrong,
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  ctaButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 20,
  },
  gradientBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginLeft: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 10,
  },
  infoText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.muted,
    marginLeft: 10,
    flexShrink: 1,
  },
});

export default InvitePartnerScreen;
