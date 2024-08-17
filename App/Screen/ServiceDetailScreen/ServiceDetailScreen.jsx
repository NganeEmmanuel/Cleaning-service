import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../Utils/Colors';

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
      <View style={styles.infoContainer}>
        <Text style={styles.Servicename}>{service?.name}</Text>
        <View style={styles.catProviderContainer}>
            <Text style={styles.serviceProvider}>{service?.contactPerson} 🌟</Text>
            <Text style={styles.ServiceCategory}>{service?.category.name}</Text>
        </View>
        <Text style={styles.serviceAddress}>
            <Ionicons name="location-sharp" size={20} color={Colors.PRIMARY}/>
            {service?.address}
        </Text>
      </View>
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
  },

  infoContainer: {
    padding: 20,
    display: 'flex',
    gap: 7
  },

   Servicename: {
    fontFamily: 'outfit-bold',
    fontSize: 25
   },

   catProviderContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center'
   },

   serviceProvider: {
    fontFamily: 'outfit-medium',
    color: Colors.PRIMARY,
    fontSize: 20
   },

   ServiceCategory: {
    color: Colors.PRIMARY,
    backgroundColor: Colors.PRIMARY_LIGHT,
    padding: 3, 
    borderRadius: 5,
    fontSize: 14
   },

   serviceAddress: {
    fontSize: 18,
    fontFamily: 'outfit',
    color: Colors.GREY
   }
})
