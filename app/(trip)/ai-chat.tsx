import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const AIChatScreen = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: '1', text: 'Hello! How can I help you today?', sender: 'ai' },
    { id: '2', text: 'I need help planning a trip to Paris.', sender: 'user' },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages([...chatMessages, { id: String(chatMessages.length + 1), text: message, sender: 'user' }]);
      setMessage('');
      // Simulate AI response
      setTimeout(() => {
        setChatMessages(prevMessages => [...prevMessages, { id: String(prevMessages.length + 1), text: 'Great! What dates are you thinking for your trip to Paris?', sender: 'ai' }]);
      }, 1000);
    }
  };

  return (
    <ScreenWrapper title="AI Chat" scrollable={true}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // Adjust offset as needed
      >
        <ScrollView contentContainerStyle={styles.chatContainer}>
          {chatMessages.map((msg) => (
            <View key={msg.id} style={msg.sender === 'user' ? styles.userMessageContainer : styles.aiMessageContainer}>
              <BlurView intensity={20} tint="dark" style={styles.blurCard}>
                <Text style={msg.sender === 'user' ? styles.userMessageText : styles.aiMessageText}>
                  {msg.text}
                </Text>
              </BlurView>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputArea}>
          <TextInput
            style={styles.textInput}
            placeholder="Type your message..."
            placeholderTextColor={DS.placeholder}
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity onPress={handleSendMessage} disabled={!message.trim()}>
            <LinearGradient
              colors={[DS.purple, DS.pink] as const}
              style={styles.sendButton}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            >
              <MaterialIcons name="send" size={24} color={DS.white} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  chatContainer: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'flex-end',
  },
  aiMessageContainer: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    maxWidth: '80%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    maxWidth: '80%',
  },
  blurCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 12,
  },
  aiMessageText: {
    color: DS.white,
    fontSize: 16,
    // fontFamily: 'Satoshi-Regular', // Placeholder for Satoshi-Regular
  },
  userMessageText: {
    color: DS.white,
    fontSize: 16,
    // fontFamily: 'Satoshi-Regular', // Placeholder for Satoshi-Regular
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: DS.bg, // Ensure input area background matches overall background
    borderTopWidth: 1,
    borderColor: DS.border,
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 10,
    fontSize: 16,
    color: DS.white,
    backgroundColor: DS.surfaceHigh, // Use a slightly different surface for input
    borderWidth: 1,
    borderColor: DS.borderStrong,
    // fontFamily: 'Satoshi-Regular', // Placeholder for Satoshi-Regular
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AIChatScreen;
