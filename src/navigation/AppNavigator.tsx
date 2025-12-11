import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import { RootStackParamList } from './types';
import { useAuthViewModel } from '../feature/state/auth/AuthViewModel';
import ChatListScreen from '../feature/view/screens/ChatListScreen';
import ChatScreen from '../feature/view/screens/ChatScreen';
import LoginScreen from '../feature/view/screens/LoginScreen';
import RegisterScreen from '../feature/view/screens/RegisterScreen';


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
        <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </>
          
      )}
      
    </Stack.Navigator>
  );
}
