import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ServiceDetailScreen() {
    const param = useRoute().params
    const [service, setService] = useState()
    const navigation = useNavigation()

    useEffect(()=>{
        param&&setService(param?.service)
    }, [param])
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.navContainer} onPress={()=> navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={30} color="black" />
        </TouchableOpacity>
      <Image source={{uri:service?.images[0]?.url}} style={styles.serviceImage} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },

  navContainer: {
    position: 'absolute',
    zIndex: 10,
    margin: 20,
    marginTop: 25

  },

  serviceImage: {
    width: '100%',
    height: 300
  }
})
