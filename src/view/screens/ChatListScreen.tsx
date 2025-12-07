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
  const {getConversations, conversations, isLoading, error, subscribeToConversationUpdates} = useConversationViewModel();

  useEffect(() => {
  getConversations();
  const unsub = subscribeToConversationUpdates();
  return unsub;
}, []);


  const renderStoryItem = ({ item }: { item: typeof stories[number] }) => (
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
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Stories</Text>
              <View style={styles.headerIcons}>
                <Icon name="search-outline" size={22} color="red" style={{ marginRight: 20 }} />
                <Icon name="ellipsis-horizontal" size={22} color="#000" />
              </View>
            </View>

            <FlatList
              data={stories}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.storyContent}
              style={styles.storyList}
              keyExtractor={(item) => item.id}
              renderItem={renderStoryItem}
            />

            <Text style={styles.sectionTitle}>Chats</Text>
          </View>
        }
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

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  listHeader: {
    paddingTop: 50,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  storyList: {
    marginTop: 12,
    height: 90,
    flexGrow: 0,
  },

  storyContent: {
    paddingVertical: 4,
  },

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
    paddingHorizontal: 8,
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
