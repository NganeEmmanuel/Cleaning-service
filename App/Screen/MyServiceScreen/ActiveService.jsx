import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'

export default function ActiveService({service}) {
  return (
    <View style={styles.container}>
      <Image source={{uri:service?.images[0].url}} style={styles.serviceImage} />
      <View style={styles.serviceInfoContainer}>
            <Text style={styles.name}>{service?.name}</Text>
            <Text style={styles.price}>{service?.pricePerHour}</Text>
            <Text style={styles.category}>{service?.category?.name}</Text>
            <Text style={styles.dateCreated}>{service?.createdAt}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },

    serviceImage: {
        width: 130,
        height: 130,
        marginRight: 5,
        borderRadius: 10
    }
})
