import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type ListItemProps = {
  icon: string;
  title: string;
  onPress?: () => void;
  isSettings?: boolean;
};

export default function ListItem({ icon, title, onPress, isSettings }: ListItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.left}>
        <Ionicons name={icon} size={22} color="#333" />
        <Text style={styles.title}>{title}</Text>
      </View>
      {isSettings ? null : (
        <Ionicons name="chevron-forward" size={20} color="#999" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e3e3e3',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 14,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});
