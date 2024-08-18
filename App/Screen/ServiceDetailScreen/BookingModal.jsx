import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import BackNavigation from '../../Common/BackNavigation'
import CalendarPicker from "react-native-calendar-picker";
import Colors from '../../Utils/Colors';
import Heading from '../../Common/Heading';

export default function BookingModal({hideModal}) {
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
                onDateChange={this.onDateChange} 
                width={340}
                minDate={Date.now()}
                todayBackgroundColor={Colors.BLACK}
                todayTextStyle={{color:Colors.WHITE}}
                selectedDayColor={Colors.PRIMARY}
                selectedDayTextColor={Colors.WHITE}
                />
            </View>
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

  }
})
