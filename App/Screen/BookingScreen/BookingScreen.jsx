import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import Heading from '../../Common/Heading'
import GlobalApi from '../../Utils/GlobalApi'
import { useUser } from '@clerk/clerk-expo';
import ServiceListItem from '../ServiceListByCategoryScreen/ServiceListItem';
import BookingDetailsModal from './BookingDetailsModal';
import FlashMessage, { showMessage } from 'react-native-flash-message';

export default function BookingScreen() {

  const [bookings, setBookings] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalBooking, setModalBooking] = useState()
  const {user} = useUser()

  useEffect(() =>{
    user&&getUserBookings()
  },[user])

  const getUserBookings = () => {
    GlobalApi.getBookingByUserEmail(user?.primaryEmailAddress.emailAddress).then(resp => {
      setBookings(resp?.bookings)
    })
  }

  const serviceCompleted = () => {
    showMessage({
        message: "Service complete successfully",
        type: "success",
      });
  }

  /**
   * 
   * @param {*} booking booking object to use in bookingDetailsModal
   */
  const showBookingDetailsModal = (booking) => {
    setModalBooking(booking)
    setShowModal(true)
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
          <ServiceListItem service={item.service} booking={item} showModal={showBookingDetailsModal}/>
        )}
        />
      </View>
      {/* Modal section for booking */}
      <Modal animationType='slide' visible={showModal} style={styles.bookingDetails}
        presentationStyle='formSheet'
      >
          <BookingDetailsModal 
              hideModal={() => setShowModal(false)} 
              booking={modalBooking}
              serviceCompleted={serviceCompleted}
          />
      </Modal>
      <FlashMessage position="bottom"/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },

  headingContainer: {
    marginTop: 20
  },

  bookingDetails: {
    flex: 0,
    width: 30,
    height: '50%'
  }

})
