import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import { formatDistance } from 'date-fns'

export default function ActiveService({service, onClick}) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onClick(service)}>
      <Image source={{uri:service?.images[0]?.url}} style={styles.serviceImage} />
      <View style={styles.serviceInfoContainer}>
            <Text style={styles.serviceName}>{service?.name}</Text>
            <Text style={styles.price}>{`2500 frs / hour`}</Text>
            <Text style={styles.category}>{service?.category?.name}</Text>
            <Text style={styles.dateCreated}>{formatDistance(new Date(service?.createdAt), new Date(), {
                addSuffix: true
                })}</Text>
      </View>
    </TouchableOpacity>
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
        elevation: 3,
        width: '96%',
        marginHorizontal: '2%',
        marginBottom: 10
    },

    serviceImage: {
        width: 130,
        height: 130,
        marginRight: 5,
        borderRadius: 10
    },

    serviceInfoContainer: {
        overflow: 'hidden',
        width: '100%',
        paddingRight: 20

    },

    serviceName: {
        fontFamily: 'outfit-medium',
        fontSize: 17,
        color: Colors.BLACK,
    },

    price: {
        fontFamily: 'outfit',
        color: Colors.GREY,
        fontSize: 15,
        marginTop: 10
    },

    category: {
        fontSize: 14,
        fontFamily: 'outfit',
        padding: 3,
        color: Colors.WHITE,
        backgroundColor: Colors.PRIMARY_LIGHT,
        borderRadius: 3,
        alignSelf: 'flex-start',
        paddingHorizontal: 15,
        marginTop: 12
    },

    dateCreated: {
        fontFamily: 'outfit',
        fontSize: 15,
        color: Colors.GREY,
        marginTop: 10,
        
    }

})
