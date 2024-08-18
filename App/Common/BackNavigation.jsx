import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function BackNavigation({title, handle=true, onclick}) {

     //defind navigation
  const navigation =useNavigation()

  return (
    <TouchableOpacity style={styles.navContainer} 
      onPress={handle? ()=> navigation.goBack(): () => onclick()}>
        <Ionicons name="arrow-back-outline" size={30} color="black" />
        <Text style={styles.navCategoryName}>{title}</Text>
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
    
      navCategoryName: {
        fontSize: 25,
        fontFamily: 'outfit-medium'
      }
})
