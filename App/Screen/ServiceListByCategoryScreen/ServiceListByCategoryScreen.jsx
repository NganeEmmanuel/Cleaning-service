import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import GlobalApi from '../../Utils/GlobalApi';
import ServiceListItem from './ServiceListItem';
import Colors from '../../Utils/Colors';

export default function ServiceListByCategoryScreen() {
  //fetch category being sent
  const param = useRoute().params;

  //defind navigation
  const navigation =useNavigation()

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
      <TouchableOpacity style={styles.navContainer} onPress={()=> navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={30} color="black" />
        <Text style={styles.navCategoryName}>{param.category}</Text>
      </TouchableOpacity>

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
  },

  navContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },

  navCategoryName: {
    fontSize: 25,
    fontFamily: 'outfit-medium'
  }
})
