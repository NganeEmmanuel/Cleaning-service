import { View, Text, SafeAreaView, ScrollView, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../Utils/GlobalApi'
import { useUser } from '@clerk/clerk-expo'
import ServiceListItem from '../ServiceListByCategoryScreen/ServiceListItem'
import BackNavigation from './../../Common/BackNavigation'
import Colors from '../../Utils/Colors'
import CustomModal from '../../Common/CustomModal'
import FlashMessage, { showMessage } from 'react-native-flash-message';

export default function BrowseOrdersScreen() {

  // Get screen dimensions
  const { height: screenHeight } = Dimensions.get('window');

    const [orders, setOrders] = useState()
    const {user} = useUser()
    const [isModalVisible, setModalVisible] = useState(false)
    const [modalBooking, setModalBooking] = useState()

    useEffect(() => {
        getOrdersByUserEmail()
    }, [orders])

    const showModal = (serviceToView) => {
      setModalBooking(serviceToView)
      setModalVisible(true)
    }

    const updateBookingStatus = (status, bokingId) => {
      GlobalApi.updateBookingStatus(bokingId, status)
      .then(resp => {
        if(resp === 'success'){
          setModalVisible(false)
          showMessage({
              message: "Status successfully updated",
              type: "success",
            });
      }else{
          showMessage({
              message: "An error occured while trying to update the booking status please try again",
              type: "danger",
            });
      }
      })
    }

    /**
     * Get all the orders made to the searvices rendered by this user
     */
    const getOrdersByUserEmail = () => {
        GlobalApi.getOrdersByUserEmail(user?.primaryEmailAddress.emailAddress).then(resp => {
            // console.log(resp)
            setOrders(resp?.bookings)
        })
    }

  return (
    <SafeAreaView>
      <ScrollView>

        {/* Heading section */}
        <View style={styles.headingContainer}>
            <BackNavigation title={'My Orders'} />
        </View>

        {/* list of bookings section  */}
        <View>
          <FlatList 
          data={orders}
          renderItem={({item, index}) => (
            <ServiceListItem service={item.service} booking={item} showModal={showModal} isOrder={true} />
          )}
          />
        </View>
      </ScrollView>

      {/* Modal section for service action  */}
      <CustomModal visible={isModalVisible} height={screenHeight * .6} onClose={setModalVisible} title={modalBooking?.service?.name}>
            <View style={styles.modalBtnContainer}>
                <TouchableOpacity style={styles.disableBtn} 
                    onPress={() => updateBookingStatus('canceled', modalBooking?.id)}>
                    <Text style={styles.disableText}>Cancle</Text>
                </TouchableOpacity> 

                {modalBooking?.bookingStatus === 'booked'&&<TouchableOpacity style={styles.enableBtn} onPress={() => updateBookingStatus('inProgress', modalBooking?.id)}>
                    <Text style={styles.enableText}>Begin</Text>
                </TouchableOpacity>}
            </View>

        </CustomModal>
        <FlashMessage position="bottom"/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headingContainer: {
    marginTop: 20,
    padding: 20
  },

  modalBtnContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 30,
    gap: 10
},

disableBtn: {
    padding: 10,
    paddingHorizontal: 30,
    backgroundColor: Colors.BLACK,
    borderRadius: 99,
    flex: 1
},

disableText: {
    color: Colors.WHITE,
    fontFamily: 'outfit',
    fontSize: 17,
    textAlign: 'center'
},

enableBtn: {
    padding: 10,
    paddingHorizontal: 30,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    flex: 1
},

enableText: {
    color: Colors.WHITE,
    fontFamily: 'outfit',
    fontSize: 17,
    textAlign: 'center'
}
})
