import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ListItem from '../../core/components/ProfileListItem';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <View style = {styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      <View style={{ marginTop: 20, alignItems: 'flex-start', justifyContent: 'center' }}>
        <ListItem
          icon="notifications-outline"
          title="Push Notifications"
          onPress={() => console.log("Push Notifications")}
          isSettings={true}
        />
        <ListItem
          icon="lock-closed-outline"
          title="Privacy Settings"
          onPress={() => console.log("Privacy Settings")}
          isSettings={true}
        />
        <ListItem
          icon="language-outline"
          title="Language"
          onPress={() => console.log("Language")}
          isSettings={true}
        />
        <ListItem
          icon="information-circle-outline"
          title="About"
          onPress={() => console.log("About")}
          isSettings={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 70,
    alignItems: 'center'
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
  },
});
