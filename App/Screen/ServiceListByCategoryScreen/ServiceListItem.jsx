import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ServiceListItem({service}) {
  return (
    <View style={styles.container}>
      <Image source={{uri:service?.images[0]?.url}} style={styles.serviceImage} />
      <View style={styles.serviceInforContainer}>
        <Text style={styles.serviceName}>{service.name}</Text>
        <Text style={styles.serviceContactPerson}>{service.contactPerson}</Text>
        <Text style={styles.serviceAddress}>
            <Ionicons name="location-sharp" size={15} color={Colors.PRIMARY}/>
            {service.address}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row', gap: 10
  },

  serviceImage: {
    width: 100,
    height: 100, borderRadius: 15
  },

  serviceInforContainer: {
    display: 'flex',
    gap: 8
  },

  serviceName:{
    fontFamily: 'outfit-bold',
    fontSize: 20
  },

  serviceContactPerson: {
    fontFamily: 'outfit-medium',
    color: Colors.GREY,
    fontSize: 17
  },

  serviceAddress: {
    fontFamily: 'outfit',
    color: Colors.GREY,
    fontSize: 17,
  }
})