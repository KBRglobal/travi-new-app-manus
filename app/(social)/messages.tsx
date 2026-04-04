import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const messagesData = [
  { id: '1', name: 'Alice', lastMessage: 'Hey, how are you?', time: '10:30 AM', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: '2', name: 'Bob', lastMessage: 'Meeting at 2 PM?', time: 'Yesterday', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: '3', name: 'Charlie', lastMessage: 'Don\'t forget the presentation!', time: 'Tuesday', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: '4', name: 'Diana', lastMessage: 'See you soon!', time: 'Monday', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
  { id: '5', name: 'Eve', lastMessage: 'Let\'s grab coffee.', time: 'Sunday', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
  { id: '6', name: 'Frank', lastMessage: 'Got the tickets!', time: 'Saturday', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' },
  { id: '7', name: 'Grace', lastMessage: 'Happy birthday!', time: 'Friday', avatar: 'https://randomuser.me/api/portraits/women/7.jpg' },
  { id: '8', name: 'Heidi', lastMessage: 'Call me later.', time: 'Thursday', avatar: 'https://randomuser.me/api/portraits/women/8.jpg' },
];

const MessagesScreen = () => {
  const router = useRouter();
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.messageItemContainer}>
      <BlurView intensity={20} tint="dark" style={styles.glassCard}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.messageContent}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.lastMessage}>{item.lastMessage}</Text>
        </View>
        <Text style={styles.time}>{item.time}</Text>
        <MaterialIcons name="chevron-right" size={24} color={DS.muted} />
      </BlurView>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper title="Messages" scrollable={true}>
      <FlatList
        data={messagesData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContentContainer}
      />
      <LinearGradient colors={[DS.purple, DS.pink] as const} style={styles.ctaButton}>
        <TouchableOpacity style={styles.ctaButtonInner}>
          <MaterialIcons name="add-comment" size={24} color={DS.white} />
          <Text style={styles.ctaButtonText}>New Message</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  listContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100, // To make space for the CTA button
  },
  messageItemContainer: {
    marginBottom: 10,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 1,
    borderColor: DS.borderStrong,
  },
  messageContent: {
    flex: 1,
  },
  name: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
  },
  lastMessage: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    color: DS.muted,
  },
  time: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 12,
    color: DS.secondary,
    marginRight: 10,
  },
  ctaButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  ctaButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  ctaButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18,
    color: DS.white,
    marginLeft: 10,
  },
});

export default MessagesScreen;
