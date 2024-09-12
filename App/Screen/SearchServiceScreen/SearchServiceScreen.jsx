import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import Header from '../../Common/HeaderSmall';
import Colors from '../../Utils/Colors';
import ServiceListItem from '../ServiceListByCategoryScreen/ServiceListItem';
import GlobalApi from '../../Utils/GlobalApi';
import LoadingOverlay from '../../Common/LoadingOverlay';

export default function SearchServiceScreen() {
 //fetch category being sent
 const param = useRoute().params;

 const [serviceList, setServiceList] = useState([])
 const [loading, setLoading] = useState(false)

 useEffect(() =>{
  param&&SearchServiceList()
 }, [param])

 /** 
  * fetch the service list for the category containing the search term
  */
 const SearchServiceList = () =>{
  setLoading(true)
   GlobalApi.SearchServiceList(param?.searchTerm).then(resp => {
    if(resp != 'error'){
      setServiceList(resp?.serviceLists)
      setLoading(false)
    }else{
      setLoading(false)
      //give an error message to check internet connection and try again

    }
   })
 }

 return (
   <View style={styles.container}>
    {/* Header section  */}
    <Header term={param?.searchTerm} setService={setServiceList}/>

    {/* search result section  */}
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
       }>No Service found</Text>
     }

     <LoadingOverlay visible={loading}/>
   </View>
 )
}

const styles = StyleSheet.create({
 container: {
   flex: 1
 }
})
