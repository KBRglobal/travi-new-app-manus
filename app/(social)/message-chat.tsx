import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';


const MessageChatScreen = () => {
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const messages = [
    { id: '1', text: 'Hey, how are you?', sender: 'me', time: '10:00 AM' },
    { id: '2', text: 'I am good, thanks! How about you?', sender: 'other', time: '10:01 AM' },
    { id: '3', text: 'I am doing great. Planning a trip to Bali next month.', sender: 'me', time: '10:05 AM' },
    { id: '4', text: 'Wow, that sounds amazing! I always wanted to go there.', sender: 'other', time: '10:06 AM' },
    { id: '5', text: 'You should definitely come along!', sender: 'me', time: '10:07 AM' },
  ];

  return (
    <ScreenWrapper title="Chat" scrollable={true}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.messagesContainer}>
          {messages.map((message) => (
            <View key={message.id} style={[styles.messageBubble, message.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
              <BlurView intensity={20} tint="dark" style={styles.blurView}>
                <Text style={styles.messageText}>{message.text}</Text>
                <Text style={styles.messageTime}>{message.time}</Text>
              </BlurView>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor={DS.placeholder}
            value={inputText}
            onChangeText={setInputText}
            returnKeyType="send"
            onSubmitEditing={() => { if (inputText.trim()) { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setInputText(''); } }}
          />
          <TouchableOpacity style={styles.sendButton} onPress={() => { if (inputText.trim()) { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setInputText(''); } }}>
            <LinearGradient
              colors={[DS.purple, DS.pink] as const}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={styles.sendButtonGradient}
            >
              <MaterialIcons name="send" size={24} color={DS.white} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DS.bg,
  },
  messagesContainer: {
    padding: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    marginVertical: 5,
    borderRadius: 16,
    overflow: 'hidden',
  },
  myMessage: {
    alignSelf: 'flex-end',
  },
  otherMessage: {
    alignSelf: 'flex-start',
  },
  blurView: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 10,
  },
  messageText: {
    fontFamily: 'Satoshi-Regular',
    color: DS.white,
    fontSize: 16,
  },
  messageTime: {
    fontFamily: 'Satoshi-Medium',
    color: DS.muted,
    fontSize: 12,
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: DS.border,
    backgroundColor: DS.bg,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    color: DS.white,
    backgroundColor: DS.surfaceHigh,
    fontFamily: 'Satoshi-Regular',
    marginRight: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default MessageChatScreen;
