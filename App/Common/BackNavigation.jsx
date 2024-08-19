import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function BackNavigation({title, handle=true, onclick, color="black"}) {

     //defind navigation
  const navigation =useNavigation()

  return (
    <TouchableOpacity style={styles.navContainer} 
      onPress={handle? ()=> navigation.goBack(): () => onclick()}>
        <Ionicons name="arrow-back-outline" size={30} color={color} />
        <Text style={{fontSize: 25, fontFamily: 'outfit-medium', color:color }}>{title}</Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    navContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
      },
    
    
})
