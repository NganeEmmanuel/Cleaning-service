import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackNavigation from '../../Common/BackNavigation'
import CalendarPicker from "react-native-calendar-picker";
import Colors from '../../Utils/Colors';
import Heading from '../../Common/Heading';

export default function BookingModal({hideModal}) {
    const [timeList, setTimeList] = useState([])
    const [selectedTime, setSelectedTime] = useState()
    const [selectedDate, setSelectedDate] = useState()
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

  return (
    <View style={styles.container}>
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
    </View>
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
  }
})
