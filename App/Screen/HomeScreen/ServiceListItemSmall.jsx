import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'

export default function ServiceListItemSmall({service}) {
  return (
    <View style={styles.serviceListSmallContainer}>
      <Image source={{uri:service?.images[0]?.url}} style={styles.serviceImage} />
      <View style={styles.serviceDetailsContainer}>
        <Text style={styles.serviceName}>{service?.name}</Text>
        <Text style={styles.serviceContactPerson}>{service?.contactPerson}</Text>
        <Text style={styles.serviceCategory}>{service?.category.name}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    serviceListSmallContainer: {
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 10
    },

    serviceImage: {
        width: 200,
        height: 150,
        borderRadius: 10
    },

    serviceDetailsContainer: {
        padding: 7,
        display: 'flex',
        gap: 3
    },

    serviceName: {
        fontSize: 17,
        fontFamily: 'outfit-medium'
    },

    serviceContactPerson: {
        fontSize: 13,
        fontFamily: 'outfit',
        color: Colors.GREY
    },

    serviceCategory: {
        fontSize: 10,
        fontFamily: 'outfit',
        padding: 3,
        color: Colors.PRIMARY,
        backgroundColor: Colors.PRIMARY_LIGHT,
        borderRadius: 3,
        alignSelf: 'flex-start',
        paddingHorizontal: 7,
        marginTop: 10
    }
})
