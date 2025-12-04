import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import { RootStackParamList } from './types';
import ChatScreen from '../view/screens/ChatScreen';
import ChatListScreen from '../view/screens/ChatListScreen';
import LoginScreen from '../view/screens/LoginScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="LoginScreen"
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="ChatList" component={ChatListScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
}
