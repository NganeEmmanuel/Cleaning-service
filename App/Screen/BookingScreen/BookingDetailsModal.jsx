import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import BackNavigation from '../../Common/BackNavigation'
import Colors from '../../Utils/Colors'
import Heading from '../../Common/Heading'

export default function BookingDetailsModal({hideModal, booking, serviceCompleted}) {
  return (
    <View style={styles.container}>
        <View style={{position: 'absolute', zIndex: 10}}>
        <BackNavigation 
                handle={false} 
                title={booking?.service?.name} 
                onclick={() => hideModal()}
                color={Colors.BLACK}
            />
        </View>

        {/* notes section  */}
        <Image source={{ uri: booking?.service?.images[0]?.url }} style={styles.bookingImage} />
        <View style={{padding: 20}}>
            <Heading text={'Service Description'} />
            <Text>{booking?.service?.about}</Text>
        </View>

        {/* buttons sections */}
        <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.messageBtn}>
                <Text style={styles.messageBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bookinBtn} onPress={() => setShowModal(true)} >
                <Text style={styles.bookingBtnText}>Completed</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '99%'
  },

  bookingImage: {
    width: '100%',
    height: 300
  },

  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
    marginBottom: 2,
    gap: 10,
},

messageBtn: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor:Colors.PRIMARY,
    borderRadius: 99,
    flex: 1
},

messageBtnText: {
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    color: Colors.PRIMARY,
    fontSize: 18
},

bookinBtn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderWidth: 1,
    borderColor:Colors.WHITE,
    borderRadius: 99,
    flex: 1
},

bookingBtnText: {
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    color: Colors.WHITE,
    fontSize: 18
}

})
