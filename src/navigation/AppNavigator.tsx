import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import { RootStackParamList } from './types';
import ChatScreen from '../view/screens/ChatScreen';
import ChatListScreen from '../view/screens/ChatListScreen';
import LoginScreen from '../view/screens/LoginScreen';
import { useAuthViewModel } from '../feature/auth/AuthViewModel';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const {accessToken, isReady}  = useAuthViewModel();
  if(!isReady){
    return null;
  }
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}> 
      {accessToken ? (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="ChatList" component={ChatListScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </>
      ): (
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
      )}
      
    </Stack.Navigator>
  );
}
