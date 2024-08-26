import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function ServiceListItem({service, booking, showModal}) {
    const navigation =useNavigation()
  return (
    <TouchableOpacity style={styles.container} 
        onPress={!booking?.id?
          ()=>navigation.push('service-details',{
            service:service
        }) :
        () => showModal(booking)

      }
    >
      <Image source={{uri:service?.images[0]?.url}} 
        style={!booking?.bookingStatus? styles.serviceImage: styles.serviceBookingImage} />
      <View style={styles.serviceInforContainer}>
        <Text style={styles.serviceName}>{service?.name}</Text>

        {/* show only if is not for booking screen  */}
        <Text style={styles.serviceContactPerson}>{!booking?.service? service?.contactPerson : booking?.userName}</Text>

        {!booking?.id&&<Text style={styles.serviceAddress}>
            <Ionicons name="location-sharp" size={15} color={Colors.PRIMARY}/>
            {service.address}
        </Text>}  

        {/* section for when used in the booking screen  */}
        {booking?.id&&<View>
          <Text style={styles.bookingTime}>
              <FontAwesome name="calendar-check-o" size={20} color={Colors.PRIMARY} />
              {`${booking?.date} at ${booking?.time}`}
              </Text>
          {booking?.bookingStatus === "booked"&&<Text style={styles.bookingStatusBooked}>{booking?.bookingStatus}</Text>}
          {booking?.bookingStatus === "inProgress"&&<Text style={styles.bookingStatusInProgress}>{booking?.bookingStatus}</Text>}
          {booking?.bookingStatus === "completed"&&<Text style={styles.bookingStatusComplete}>{booking?.bookingStatus}</Text>}
          {booking?.bookingStatus === "canceled"&&<Text style={styles.bookingStatusCanceled}>{booking?.bookingStatus}</Text>}
          </View>}
      </View>
    </TouchableOpacity>
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
    height: 100, 
    borderRadius: 15
  },

  serviceBookingImage: {
    width: 120,
    height: 130, 
    borderRadius: 15
  },

  serviceInforContainer: {
    display: 'flex',
    gap: 8
  },

  serviceName:{
    fontFamily: 'outfit-bold',
    fontSize: 18
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
  },

  bookingStatusBooked: {
    fontSize: 16,
    fontFamily: 'outfit',
    padding: 3,
    color: Colors.WHITE,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 3,
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    marginTop: 10
},

bookingStatusInProgress: {
  fontSize: 16,
    fontFamily: 'outfit',
    padding: 3,
    color: Colors.WHITE,
    backgroundColor: Colors.INFO,
    borderRadius: 3,
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    marginTop: 10
},

bookingStatusComplete: {
  fontSize: 16,
    fontFamily: 'outfit',
    padding: 3,
    color: Colors.WHITE,
    backgroundColor: Colors.SUCCESS,
    borderRadius: 3,
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    marginTop: 10
},

bookingStatusCanceled: {
  fontSize: 16,
    fontFamily: 'outfit',
    padding: 3,
    color: Colors.WHITE,
    backgroundColor: Colors.WARNING,
    borderRadius: 3,
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    marginTop: 10
},

bookingTime: {
  fontFamily: 'outfit',
  fontSize: 13,
  color: Colors.GREY
}

})
