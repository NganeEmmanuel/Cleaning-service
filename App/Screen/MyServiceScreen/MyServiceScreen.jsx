import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ServiceActions from './ServiceActions'
import Heading from './../../Common/Heading'

export default function MyServiceScreen() {
  return (
    <ScrollView>
        {/* heading section  */}
        <View style={{padding: 20, paddingBottom: 0, marginTop: 20}}>
            <Heading text={'My Services'} />
        </View>
        
        {/* add service and brows order button section  */}
        <ServiceActions />

        {/* active service section  */}
        <View style={{padding: 20, paddingBottom: 0}}>
            <Heading text={'Active Services'} />
        
        </View>
    </ScrollView>
  )
}