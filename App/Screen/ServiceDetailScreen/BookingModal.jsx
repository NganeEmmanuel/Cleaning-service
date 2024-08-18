import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackNavigation from '../../Common/BackNavigation'
import CalendarPicker from "react-native-calendar-picker";
import Colors from '../../Utils/Colors';
import Heading from '../../Common/Heading';
import GlobalApi from '../../Utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo'

export default function BookingModal({serviceID, hideModal}) {
    const [timeList, setTimeList] = useState([])
    const [selectedTime, setSelectedTime] = useState()
    const [selectedDate, setSelectedDate] = useState()
    const [notes, setNotes] = useState()
    const {user} = useUser()

    useEffect(() => {
        getTime()
    }, [])

    /**
     * Get time function to generate differnet time intervals from 8Am to 7PM
     */
    const getTime = () =>{
        const timeList =[]
        for(let i = 8; i <= 12; i++){
            timeList.push({
                time: i+':00 AM'
            })
            timeList.push({
                time: i+':30 AM'
            })
        }
    
        for(let i = 1; i <= 7; i++){
            timeList.push({
                time: i+':00 PM'
            })
            timeList.push({
                time: i+':30 PM'
            })
        }

        setTimeList(timeList)
    }

    /**
     * Create the booking in the database by calling the createbooking method in global api
     */
    const creatNewBooking = () => {
        if(!selectedTime || !selectedDate){
            ToastAndroid.show('Please select date and time', ToastAndroid.LONG)
            return;
        }
        const data = {
            username : user?.fullName,
            userEmail : user?.primaryEmailAddress.emailAddress,
            time : selectedTime,
            date : selectedDate,
            notes : notes,
            serviceID : serviceID
        }
        GlobalApi.createBooking(data).then(resp => {
            console.log(resp)
            ToastAndroid.show('Booking created successfully', ToastAndroid.LONG)
        })
    }

  return (
    <ScrollView>
        <KeyboardAvoidingView style={styles.container}>
            {/* back navigation section  */}
            <BackNavigation 
            handle={false} 
            title={'Book Service'} 
            onclick={() => hideModal()} 
            />
            
            {/* Calendar picker section  */}
            <View style={{marginTop: 20}}>
                <Heading text={'Select Date'}/>
                <View style={styles.calenderContainer} >
                    <CalendarPicker
                    onDateChange={setSelectedDate}
                    width={340}
                    minDate={Date.now()}
                    todayBackgroundColor={Colors.BLACK}
                    todayTextStyle={{color:Colors.WHITE}}
                    selectedDayColor={Colors.PRIMARY}
                    selectedDayTextColor={Colors.WHITE}
                    />
                </View>
            </View>

            {/* Select time Section  */}
            <View style={{marginTop: 20}}>
                <Heading text={'Select Time'} />
                <FlatList  
                    data={timeList}
                    nestedScrollEnabled={true}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => (
                        <TouchableOpacity style={{marginRight: 10}} 
                        onPress={() => setSelectedTime(item.time)}>
                            <Text style={[selectedTime == item.time?
                            styles.selectedTime: styles.unselectedTime]}>{item.time}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            {/* Additional note section  */}
            <View style={{marginTop:20}}>
                <Heading text={'Add Notes'} />
                <TextInput placeholder='add note ...' 
                style={styles.noteTetxtArea} 
                numberOfLines={6}
                multiline={true}
                onChangeText={text => setNotes(text)}
                />
            </View>

            {/* Confirmation Button section  */}
            <TouchableOpacity style={{marginTop: 20}} onPress={() => creatNewBooking()}>
                <Text style={styles.confirmBtn}>Confirm & Book</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },

  calenderContainer: {
    backgroundColor: Colors.PRIMARY_LIGHT,
    padding: 20,
    borderRadius: 15,

  },

  selectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor:Colors.PRIMARY,
    borderRadius: 99,
    paddingHorizontal: 18,
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
  },

  unselectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor:Colors.PRIMARY,
    borderRadius: 99,
    paddingHorizontal: 18,
    color: Colors.PRIMARY,
  },

  noteTetxtArea: {
    borderWidth: 1,
    borderRadius: 15,
    textAlignVertical: 'top',
    padding: 20,
    fontSize: 15,
    fontFamily: 'outfit-medium',
    borderColor: Colors.PRIMARY
  },

  confirmBtn: {
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    fontSize: 17,
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
    padding: 13,
    borderRadius: 99,
    elevation: 2

  }
})
