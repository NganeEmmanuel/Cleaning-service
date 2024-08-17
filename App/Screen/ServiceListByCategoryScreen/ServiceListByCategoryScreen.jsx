import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useEffect} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import GlobalApi from '../../Utils/GlobalApi';

export default function ServiceListByCategoryScreen() {
  //fetch category being sent
  const param = useRoute().params;

  //defind navigation
  const navigation =useNavigation()
  useEffect(() =>{
    param&&getServiceListByCategory()
  }, [param])

  //fetch the service list for the category
  const getServiceListByCategory = () =>{
    GlobalApi.getServiceListByCategory(param.category).then(resp => {
      console.log(resp)
    })
  }
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navContainer} onPress={()=> navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={30} color="black" />
        <Text style={styles.navCategoryName}>{param.category}</Text>
      </TouchableOpacity>
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
