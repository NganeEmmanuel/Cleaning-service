import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import {useRoute } from '@react-navigation/native'
import GlobalApi from '../../Utils/GlobalApi';
import ServiceListItem from './ServiceListItem';
import Colors from '../../Utils/Colors';
import BackNavigation from '../../Common/BackNavigation';

export default function ServiceListByCategoryScreen() {
  //fetch category being sent
  const param = useRoute().params;

  const [serviceList, setServiceList] = useState([])

  useEffect(() =>{
    param&&getServiceListByCategory()
  }, [param])

  /** 
   * fetch the service list for the category
   */
  const getServiceListByCategory = () =>{
    GlobalApi.getServiceListByCategory(param.category).then(resp => {
      setServiceList(resp.serviceLists)
    })
  }

  return (
    <View style={styles.container}>
      <BackNavigation title={param.category}/>

      {serviceList?.length > 0? <FlatList 
      data={serviceList}
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
        }>No Service found</Text>
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
