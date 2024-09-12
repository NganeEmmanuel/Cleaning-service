import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import Heading from '../../Common/Heading'
import GlobalApi from '../../Utils/GlobalApi'
import ServiceListItemSmall from './ServiceListItemSmall'
import { useNavigation } from '@react-navigation/native'
import CardLoadingOverlay from '../../Common/CardLoadingOverlay'

export default function ServiceList() {

    const navigation = useNavigation()

    const [serviceList, setServiceList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      getServiceList()
    }, [])

    const viewLatestSerivce = () => {
      navigation.push('latest-services')
    }

    /**
     * Get Service list from Global API
     */

    const getServiceList = () => {
        GlobalApi.getServiceList().then((resp) => {
            setServiceList(resp?.serviceLists)
            setLoading(false);
        }).catch(() => {
          // setErrorMessage('Something went wrong. Please check your internet connection and try again')
          setLoading(false);  // Ensure loading ends even if there is an error
        });
    }
  return (
    <View style={styles.serviceContainer}>
      <Heading text={'Latest Services'} isViewAll={true} onPress={viewLatestSerivce}/>

      {loading?
      <CardLoadingOverlay visible={loading} />
      : <FlatList 
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
      }
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
