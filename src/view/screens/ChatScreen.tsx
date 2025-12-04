import React from 'react';
import { View, StyleSheet, Text, Image, KeyboardAvoidingView, Platform, TextInput, Pressable } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatBubble from '../../core/components/ChatBubble';
import { RootStackParamList } from '../../navigation/types';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'ChatScreen'>;

export default function ChatScreen({ route }: { route: ChatScreenRouteProp }) {
  const { chat } = route.params;
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADERR */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={30} color="#999" style={{marginRight: 10}} />
        </Pressable>
        <Image source={{ uri: chat.avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{chat.name}</Text>
          <Text style={styles.subtitle}>{chat.time}</Text>
        </View>
      </View>
       {/* Mesajlar */}
      <View style={styles.messagesArea}>
        <ChatBubble text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'></ChatBubble>
        <ChatBubble text='Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' isMe={true}></ChatBubble>
      </View>
       <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Mesaj yaz..."
            style={styles.input}
            placeholderTextColor="#999"
          />

          <Pressable style={styles.sendButton}>
            <Ionicons name="send" size={20} color="#fff" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    marginTop: 75,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 2,
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  messagesArea: {
    flex: 1,
    padding: 16,
  },
  messageBubble : {
    backgroundColor: '#D0E9D5FF',
    width: 170,
    height: 75,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 16
  },

  input: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    fontSize: 16,
  },

  sendButton: {
    marginLeft: 10,
    backgroundColor: '#3CB050',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
