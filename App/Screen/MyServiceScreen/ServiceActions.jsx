import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from './../../Utils/Colors'

export default function ServiceActions() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addServiceBtn}>
        <FontAwesome6 name="add" size={35} color={Colors.PRIMARY} />
        <Text style={styles.addBtnText}>Add service</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.browseOrdersBtn}>
        <MaterialIcons name="local-offer" size={35} color="white" />
        <Text style={styles.browseServiceBtnText}>Browse Orders</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 10,
    width: '92%',
    marginHorizontal: '4%',
  },

  addServiceBtn: {
    padding: 20,
    borderColor: Colors.PRIMARY_LIGHT,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
  },

  browseOrdersBtn: {
    padding: 20,
    borderColor: Colors.PRIMARY_LIGHT,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
  },

  addBtnText: {
    color: Colors.PRIMARY,
    fontFamily: 'outfit-medium',
    fontSize: 16
  },
  browseServiceBtnText: {
    color: Colors.WHITE,
    fontFamily: 'outfit-medium',
    fontSize: 16
  }
})
