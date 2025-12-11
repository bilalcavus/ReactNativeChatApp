import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ListItem from '../../../core/components/ProfileListItem';
import { useAuthViewModel } from '../../state/auth/AuthViewModel';
import { getRefreshToken } from '../../../data/storage/TokenStorage';



export default  function ProfileScreen() {
  const {logout, isLoading, error} = useAuthViewModel();
  

  const handleLogout = async () => {
    const storedRefreshToken = await getRefreshToken();
    if (!storedRefreshToken) {
      console.warn('No refresh token available');
      return;
    }
    const result = await logout({refreshToken: storedRefreshToken});
    return result;
  }
  return (
    <View style={styles.container}>

      <View style = {styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Icon name = "ellipsis-horizontal" size= {22} color="black" style={{marginRight: 20}}></Icon>
      </View>
      <View style= {styles.avatarSection}>
        <Image source={{ uri: 'https://i.pravatar.cc/150?img=4'}}
          style={styles.avatar} />
        <View style = {styles.textContainer}>
          <Text style= {styles.avatarTitle}>Jocelyn Gouse</Text>
        <Text style={styles.subtitle}>@jocelyngouse</Text>
        </View>
      </View>
      <View style = {styles.options} >
        <ListItem 
        icon="gift-outline" 
        title="Refer a friend" 
        onPress={() => console.log("Refer")} 
      />

      <ListItem 
        icon="notifications-outline" 
        title="Notification" 
        onPress={() => console.log("Notification")} 
      />

      <ListItem 
        icon="settings-outline" 
        title="Settings" 
        onPress={() => console.log("Settings")} 
      />

      <ListItem 
        icon="help-circle-outline" 
        title="Help center" 
        onPress={() => console.log("Help")} 
      />
      <ListItem 
        icon="log-out-outline" 
        title="Log out" 
        onPress={handleLogout} 
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 70,
    alignItems: 'center'
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
  },
  avatarSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 40,
    marginLeft: 10
  },

  avatar: {
    width:50,
    height:50,
    borderRadius:30,
  },
  textContainer: {
    marginLeft: 16,
  },
  avatarText: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  avatarTitle:{
    fontSize: 20,
    fontWeight: '600'
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  options: {
    marginTop: 20,
    backgroundColor: '#FFFFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
  }
});
