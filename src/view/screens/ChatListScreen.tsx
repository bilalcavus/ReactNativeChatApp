import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Pressable } from 'react-native';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { Chat, MainTabParamList, RootStackParamList } from '../../navigation/types';
import { chats, stories } from '../../data/mock';
import { useConversationViewModel } from '../../feature/chat/ConversationViewModel';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Chat'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function ChatListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {getConversations, conversations, isLoading, error} = useConversationViewModel();

  useEffect(() => {
    getConversations();
  }, [])

  return (
    <View style={styles.container}>
      {/* Header gardaş */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Stories</Text>
        <View style={styles.headerIcons}>
          <Icon name="search-outline" size={22} color="red" style={{ marginRight: 20 }} />
          <Icon name="ellipsis-horizontal" size={22} color="#000" />
        </View>
      </View>

      {/* Story Flatlist gardaş */}
      <FlatList
        data={stories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        style={{ marginTop: 10 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.storyItem}>
            {item.id === 'add' ? (
              <View style={styles.addStoryCircle}>
                <Icon name="add" size={28} color="blue" />
              </View>
            ) : item.avatar ? (
              <Image source={{ uri: item.avatar }} style={styles.storyAvatar} />
            ) : (
              <View style={[styles.storyAvatar, styles.addStoryCircle]} />
            )}
            <Text style={styles.storyName}>{item.name}</Text>
          </View>
        )}
      />

        <Text style={styles.sectionTitle}>Chats</Text>

      {/* Chat Flatlist gardaş */}
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('ChatScreen', { chat: item, conversationId: item.id })}>
            <View style={styles.chatItem}>
              <Image source={{ uri: item.avatar }} style={styles.chatAvatar} />

              <View style={styles.chatTextContainer}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatMsg}>{item.msg}</Text>
              </View>

              <View style={styles.rightContainer}>
                <Text style={styles.time}>{item.time}</Text>
                {item.unread > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </Pressable>
        )}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
  },

  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  /* Stories */
  storyItem: {
    marginRight: 20,
    alignItems: 'center',
  },

  storyAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },

  addStoryCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  storyName: {
    marginTop: 6,
    fontSize: 12,
    color: '#444',
  },

  sectionTitle: {
    marginBottom: 8,
    paddingHorizontal: 16,
    fontSize: 26,
    fontWeight: '700',
    color: '#222',
  },

  /* Chats */
  chatItem: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  chatAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
  },

  chatTextContainer: {
    flex: 1,
  },

  chatName: {
    fontSize: 16,
    fontWeight: '600',
  },

  chatMsg: {
    marginTop: 4,
    fontSize: 13,
    color: '#555',
  },

  rightContainer: {
    alignItems: 'flex-end',
  },

  time: {
    fontSize: 12,
    color: '#777',
  },

  badge: {
    backgroundColor: '#f4c306',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
