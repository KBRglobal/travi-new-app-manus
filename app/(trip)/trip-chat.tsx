import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

// DS object exported from ScreenWrapper.tsx (provided in prompt)
const DS = {
  bg: "#0A0514", surface: "rgba(36,16,62,0.55)", surfaceHigh: "rgba(50,20,80,0.7)",
  border: "rgba(123,68,230,0.22)", borderStrong: "rgba(100,67,244,0.4)",
  purple: "#6443F4", pink: "#F94498", success: "#02A65C", warning: "#FF9327",
  error: "#FF6B6B", info: "#01BEFF", white: "#FFFFFF", secondary: "#D3CFD8",
  muted: "#A79FB2", placeholder: "#7B6A94", gradient: ["#6443F4", "#F94498"],
};

// Dummy data for chat messages
const dummyMessages = [
  { id: '1', text: 'Hey everyone, excited for the trip!', sender: 'Alice', time: '10:00 AM' },
  { id: '2', text: 'Me too! What\'s the plan for tomorrow?', sender: 'Bob', time: '10:05 AM' },
  { id: '3', text: 'We\'re thinking of visiting the local market first.', sender: 'Alice', time: '10:10 AM' },
  { id: '4', text: 'Sounds great! Looking forward to it.', sender: 'Charlie', time: '10:15 AM' },
];

const TripChat = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message.trim()) {
      // In a real app, you'd send this message to a backend or state management
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const renderMessage = ({ item }: { item: any }) => (
    <View style={[styles.messageBubble, item.sender === 'Alice' ? styles.myMessage : styles.otherMessage]}>
      <Text style={styles.messageSender}>{item.sender}</Text>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  return (
    <ScreenWrapper title="Trip Chat" scrollable={false} contentStyle={styles.screenWrapper}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // Adjust as needed
      >
        <FlatList
          data={dummyMessages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
          inverted // To show latest messages at the bottom
        />
        <BlurView intensity={20} tint="dark" style={styles.inputContainerBlur}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Type your message..."
              placeholderTextColor={DS.placeholder}
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <LinearGradient
                colors={[DS.purple, DS.pink] as const}
                style={styles.sendButtonGradient}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              >
                <MaterialIcons name="send" size={24} color={DS.white} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </BlurView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    backgroundColor: DS.bg,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messageList: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'flex-end',
  },
  messageBubble: {
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: DS.surfaceHigh, // Use a slightly different surface for own messages
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: DS.surface,
  },
  messageSender: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 12,
    color: DS.purple,
    marginBottom: 2,
  },
  messageText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.white,
  },
  messageTime: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 10,
    color: DS.muted,
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  inputContainerBlur: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: "hidden",
    marginHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 0 : 16, // Adjust for Android keyboard
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  textInput: {
    flex: 1,
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.white,
    paddingHorizontal: 10,
    paddingVertical: 8,
    maxHeight: 100, // Limit input height for multiline
  },
  sendButton: {
    marginLeft: 10,
    borderRadius: 25,
    overflow: 'hidden',
  },
  sendButtonGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TripChat;
