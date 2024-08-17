import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../Utils/Colors';
import Heading from '../../Common/Heading';

export default function ServiceDetailScreen() {
    const param = useRoute().params
    const [service, setService] = useState()
    const navigation = useNavigation()
    const [isReadMore, setIsReadMore] = useState(false)

    useEffect(()=>{
        param&&setService(param?.service)
    }, [param])
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.navContainer} onPress={()=> navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={30} color="black" />
        </TouchableOpacity>
      <Image source={{uri:service?.images[0]?.url}} style={styles.serviceImage} />

      {/* Basic information section  */}
      <ScrollView contentContainerStyle={styles.infoContainer}>
        <Text style={styles.Servicename}>{service?.name}</Text>
        <View style={styles.catProviderContainer}>
            <Text style={styles.serviceProvider}>{service?.contactPerson} 🌟</Text>
            <Text style={styles.ServiceCategory}>{service?.category.name}</Text>
        </View>
        <Text style={styles.serviceAddress}>
            <Ionicons name="location-sharp" size={20} color={Colors.PRIMARY}/>
            {service?.address}
        </Text>

        {/* Horrizontal Line */}
        <View style={{borderWidth: 0.2, color: Colors.GREY, marginTop: 30, marginBottom: 20}}></View>
        
        {/* About service section */}
        <View>
            <Heading text={'About Service'} />
            <Text style={styles.serviceAbout} numberOfLines={isReadMore? 100 : 7}>{service?.about}</Text>
            <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)}>
                <Text style={styles.readMoreBtn}>{isReadMore ? 'Read Less': 'Read more'}</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  navContainer: {
    position: 'absolute',
    zIndex: 10,
    margin: 20,
    marginTop: 25

  },

  serviceImage: {
    width: '100%',
    height: 300
  },

  infoContainer: {
    padding: 20,
    display: 'flex',
    gap: 7,
    paddingBottom: 30,
    flexGrow: 1,
    justifyContent: 'flex-start',
  },

   Servicename: {
    fontFamily: 'outfit-bold',
    fontSize: 25
   },

   catProviderContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center'
   },

   serviceProvider: {
    fontFamily: 'outfit-medium',
    color: Colors.PRIMARY,
    fontSize: 20
   },

   ServiceCategory: {
    color: Colors.PRIMARY,
    backgroundColor: Colors.PRIMARY_LIGHT,
    padding: 3, 
    borderRadius: 5,
    fontSize: 14
   },

   serviceAddress: {
    fontSize: 18,
    fontFamily: 'outfit',
    color: Colors.GREY
   },

   serviceAbout: {
    fontFamily: 'outfit',
    color: Colors.GREY, 
    fontSize: 17,
    lineHeight: 28
   },

   readMoreBtn: {
    color: Colors.PRIMARY,
    fontSize: 17,
     fontFamily: 'outfit'
   }
})
