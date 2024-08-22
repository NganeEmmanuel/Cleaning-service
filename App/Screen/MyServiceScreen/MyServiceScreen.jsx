import { View, Text, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ServiceActions from './ServiceActions'
import Heading from './../../Common/Heading'
import { useUser } from '@clerk/clerk-expo'
import GlobalApi from './../../Utils/GlobalApi'
import ActiveService from './ActiveService'

export default function MyServiceScreen() {

    const [services, setServices] = useState()
    const {user} = useUser()

    useEffect(() => {
        getServiceByUserEmail()
    }, [user, services])

    const getServiceByUserEmail = () => {
        GlobalApi.getServicesByUserEmail(user?.primaryEmailAddress.emailAddress)
        .then(resp => {
            setServices(resp?.serviceLists)
        })
    }
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
            <View>
                <FlatList 
                data={services}
                renderItem={({item, index}) => (
                    <ActiveService service={item} />
                )}
                />
            </View>
        </View>
    </ScrollView>
  )
}