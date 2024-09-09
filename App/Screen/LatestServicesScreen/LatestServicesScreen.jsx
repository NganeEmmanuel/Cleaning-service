import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackNavigation from '../../Common/BackNavigation'
import ServiceListItem from '../ServiceListByCategoryScreen/ServiceListItem'
import GlobalApi from '../../Utils/GlobalApi'
import Colors from '../../Utils/Colors'

export default function LatestServicesScreen() {

    const [serviceList, setServiceList] = useState()
    const [errorMessage, setErrorMessage] = useState('No Service Found')

    useEffect(() =>{
        getServiceListOrderedByLatest()
      }, [serviceList])

    /** 
   * fetch the service list and orders it by the latest uploaded service
   */
  const getServiceListOrderedByLatest = () =>{

    //upddate this after you implement the method in the GlobalAPI
    GlobalApi.getServiceList().then(resp => {
        if(resp != 'unsuccessfull'){
            setServiceList(resp.serviceLists)
        }else{
            setErrorMessage('Something went wrong. Please check your internet connection and try again')
        }
    })
  }
    return (
        <View style={styles.container}>
          <BackNavigation title={'Lates Services'}/>
    
          {serviceList?.length > 0? <FlatList 
          data={serviceList}
          nestedScrollEnabled={true}
          style={{marginTop:15}}
          renderItem={({item, index}) => (
            <ServiceListItem service={item} />
          )}
          />: 
            <Text style={
              {
                fontFamily: 'outfit', 
                fontSize: 20, 
                color: Colors.GREY, 
                textAlign: 'center',
                marginTop: '50%'
              }
            }>{errorMessage}</Text>
          }
        </View>
      )
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
      paddingTop: 40
    }
  })