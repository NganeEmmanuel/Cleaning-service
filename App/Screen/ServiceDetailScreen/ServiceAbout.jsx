import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import Heading from '../../Common/Heading'
import Colors from '../../Utils/Colors'

export default function ServiceAbout({service}) {
    const [isReadMore, setIsReadMore] = useState(false)
  return service&&(
    <View>
        <Heading text={'About Service'} />
        <Text style={styles.serviceAbout} numberOfLines={isReadMore? 100 : 7}>{service?.about}</Text>
        <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)}>
            <Text style={styles.readMoreBtn}>{isReadMore ? 'Read Less': 'Read more'}</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    serviceAbout: {
        fontFamily: 'outfit',
        color: Colors.GREY, 
        fontSize: 17,
        lineHeight: 28
       },
    
       readMoreBtn: {
        color: Colors.PRIMARY,
        fontSize: 17,
         fontFamily: 'outfit'
       }
})
