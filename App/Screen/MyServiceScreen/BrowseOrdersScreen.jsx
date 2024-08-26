import { View, Text, SafeAreaView, ScrollView, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../Utils/GlobalApi'
import { useUser } from '@clerk/clerk-expo'
import ServiceListItem from '../ServiceListByCategoryScreen/ServiceListItem'
import BackNavigation from './../../Common/BackNavigation'

export default function BrowseOrdersScreen() {

    const [orders, setOrders] = useState()
    const {user} = useUser()

    useEffect(() => {
        getOrdersByUserEmail()
    }, [orders])

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
            <ServiceListItem service={item.service} booking={item}/>
          )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headingContainer: {
    marginTop: 20,
    padding: 20
  }
})
