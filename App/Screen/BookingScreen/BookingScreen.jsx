import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Heading from '../../Common/Heading'
import GlobalApi from '../../Utils/GlobalApi'
import { useUser } from '@clerk/clerk-expo';
import BookingItem from './BookingItem';
import ServiceListItem from '../ServiceListByCategoryScreen/ServiceListItem';

export default function BookingScreen() {

  const [bookings, setBookings] = useState([])
  const {user} = useUser()

  useEffect(() =>{
    user&&getUserBookings()
  },[user])

  const getUserBookings = () => {
    GlobalApi.getBookingByUserEmail(user?.primaryEmailAddress.emailAddress).then(resp => {
      setBookings(resp?.bookings)
    })
  }

  return (
    <ScrollView style={styles.container}>

      {/* Heading section */}
      <View style={styles.headingContainer}>
        <Heading text={'My Bookings'} />
      </View>

      {/* list of bookings section  */}
      <View>
        <FlatList 
        data={bookings}
        renderItem={({item, index}) => (
          <ServiceListItem service={item.service} booking={item}/>
        )}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },

  headingContainer: {
    marginTop: 20
  }
})
