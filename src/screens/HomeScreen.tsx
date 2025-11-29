import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { User } from '../data/user';
import { FlatList } from 'react-native';

export const users: User[] = [
  { id: '1', name: 'Bilal', age: 24 },
  { id: '2', name: 'Ahmet', age: 30 },
  { id: '3', name: 'Ayşe', age: 22 },
];

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello Bilal! 👋</Text>
      <FlatList<User>
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: User }) => (
          <View>
            <Text style={styles.title}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA'
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 16,
  },
  counter: {
    fontSize: 22,
    marginBottom: 30,
  }
});
