import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import Heading from '../../Common/Heading'
import GlobalApi from '../../Utils/GlobalApi'
import ServiceListItemSmall from './ServiceListItemSmall'

export default function ServiceList() {

    const [serviceList, setServiceList] = useState([])

    useEffect(() => {
      getServiceList()
    }, [])

    /**
     * Get Service list from Global API
     */

    const getServiceList = () => {
        GlobalApi.getServiceList().then((resp) => {
            setServiceList(resp?.serviceLists)
        })
    }
  return (
    <View style={styles.serviceContainer}>
      <Heading text={'Latest Services'} isViewAll={true} />
      <FlatList 
      data={serviceList}
      nestedScrollEnabled={true}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => (
        <View style={styles.serviceListContainer}>
            <ServiceListItemSmall service={item} />
        </View>
    )}
      
      />
    </View>
  )
}

const styles = StyleSheet.create({
  serviceContainer: {
    marginTop: 20,
    marginBottom: 40
  },

  serviceListContainer: {
    marginRight: 10
  }
})
