import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Heading from '../../Common/Heading'
import GlobalApi from '../../Utils/GlobalApi'
import { useUser } from '@clerk/clerk-expo';
import ServiceListItem from '../ServiceListByCategoryScreen/ServiceListItem';
import BookingDetailsModal from './BookingDetailsModal';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../Utils/Colors';

export default function BookingScreen() {

  const [bookings, setBookings] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalBooking, setModalBooking] = useState()
  const {user} = useUser()
  const [modalDisplay, setModalDisplay] = useState('none')

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
    setModalDisplay('flex')
  }
  return (
    <View>
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
        {/* <Modal animationType='slide' visible={showModal} style={styles.bookingDetails}
          presentationStyle='formSheet'
        >
            <BookingDetailsModal 
                hideModal={() => setShowModal(false)} 
                booking={modalBooking}
                serviceCompleted={serviceCompleted}
            />
        </Modal> */}
      </ScrollView>
      
      {/* modal section  */}
      <TouchableOpacity 
      onPress={() => setModalDisplay('none')}
      style={{
        position: 'absolute',
        backgroundColor: Colors.BLACK,
        opacity: .3,
        width: '100%',
        zIndex: 11,
        height: 700,
        display: modalDisplay
      }}></TouchableOpacity>
        <View style={{
          height: 260, 
          marginTop: 440, 
          backgroundColor: Colors.WHITE,
          zIndex: 20,
          position: 'absolute',
          width: '98%',
          marginLeft: "1%",
          borderRadius: 10,
          display: modalDisplay
          }}>
          <View style={styles.modalHead}>
            <Text style={styles.modalTile}>{modalBooking?.service?.name}</Text>
            <TouchableOpacity onPress={() => setModalDisplay('none')}>
              <Ionicons name="close-circle" size={30} color={Colors.WARNING} />
            </TouchableOpacity>
          </View>
          <View style={{ height:'50%', padding: 20}}>
            <Text style={{fontFamily: 'outfit', fontSize: 17, color: Colors.GREY, marginVertical: 12}}>
              <FontAwesome name="calendar-check-o" size={20} color={Colors.PRIMARY} />
              {`Booked for ${modalBooking?.date}`}
            </Text>
            <Text style={{fontFamily: 'outfit', fontSize: 17, color: Colors.GREY, marginVertical: 12}}>
            <FontAwesome name="clock-o" size={24} color={Colors.PRIMARY}/>
              {`Starts at ${modalBooking?.time}`}
            </Text>
          </View>
          <View style={styles.modalActionContainer}>
              <TouchableOpacity>
                <Text style={styles.actionBtn1}>Cancle</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.actionBtn2}>Completed</Text>
              </TouchableOpacity>
          </View>
        </View>
      <FlashMessage position="bottom"/>
    </View>
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
  },

  modalHead: {
    borderBottomWidth: .2,
    padding: 10,
    paddingBottom: 15,
    paddingTop: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  modalTile: {
    fontFamily: 'outfit-bold',
    fontSize: 17,
    color:Colors.BLACK
  },
  modalActionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10
    
  },

  actionBtn1: {
    padding: 16,
    paddingHorizontal: 40,
    borderColor: Colors.PRIMARY,
    color: Colors.PRIMARY,
    backgroundColor: Colors.WHITE,
    borderRadius: 99,
    fontFamily: 'outfit',
    fontSize: 17,
    borderWidth: 1

  },

  actionBtn2: {
    padding: 16,
    paddingHorizontal: 40,
    borderColor: Colors.PRIMARY,
    color: Colors.WHITE,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    fontFamily: 'outfit',
    fontSize: 17,
    borderWidth: 1

  }
})
