import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import ChatListScreen from '../feature/view/screens/ChatListScreen';
import ProfileScreen from '../feature/view/screens/ProfileScreen';
import SettingsScreen from '../feature/view/screens/SettingsScreen';



const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#3CB050',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          paddingBottom: 6,
          height: 55,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = '';
          if (route.name === 'Chat') {
            iconName = 'chatbubbles-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Chat" component={ChatListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
