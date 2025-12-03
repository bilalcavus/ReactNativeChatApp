import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ChatListScreen  from '../screens/ChatListScreen';
import Icon from 'react-native-vector-icons/Ionicons';


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
