
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  text: string;
  isMe?: boolean;
};

export default function ChatBubble({ text, isMe = false }: Props) {
  return (
    <View
      style={[
        styles.container,
        isMe ? styles.rightContainer : styles.leftContainer
      ]}
    >
      <View
        style={[
          styles.bubble,
          isMe ? styles.rightBubble : styles.leftBubble
        ]}
      >
        <Text style={[styles.text, isMe ? styles.rightText : styles.leftText]}>
          {text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 4,
    paddingHorizontal: 10,
  },

  rightContainer: {
    alignItems: 'flex-end',
  },
  leftContainer: {
    alignItems: 'flex-start',
  },

  bubble: {
    maxWidth: '75%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
  },

  leftBubble: {
    backgroundColor: '#e6e6e6',
    borderBottomLeftRadius: 2,
  },
  rightBubble: {
    backgroundColor: '#3CB050',
    borderBottomRightRadius: 2,
  },

  // Yazı
  text: {
    fontSize: 15,
  },
  leftText: {
    color: '#202020FF',

  },
  rightText: {
    color: '#fff',
  },
});
