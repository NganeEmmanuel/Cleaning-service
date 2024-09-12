import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useUser } from '@clerk/clerk-expo';
import Colors from '../../Utils/Colors';

export default function ProfileScreen() {
  const {user} = useUser()
  const profileMenue = [
    {
      id: 1,
      name: 'Home',
      icon: 'home'
    },

    {
      id: 2,
      name: 'My booking',
      icon: 'bookmark'
    },

    {
      id: 3,
      name: 'My Services',
      icon: 'dashboard-customize'
    },

    {
      id: 4,
      name: 'Logout',
      icon: 'log-out'
    }

  ]
  return (
    <View>
      {/* Profile header section  */}
      <View 
        style={{
          padding: 20, 
          paddingTop: 30, 
          backgroundColor: Colors.PRIMARY
        }}>
        <Text style={{fontSize: 25, fontFamily: 'outfit-bold', color: Colors.WHITE}}>Profile</Text>
        <View 
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}>
          <Image source={{uri: user?.imageUrl}} 
            style={{width: 90, height: 90, borderRadius: 99}}
          />
          <Text 
            style={{
              fontFamily: 'outfit-medium',
              marginTop: 8,
              fontSize: 24,
              color: Colors.WHITE
            }}>
                {user?.fullName}
          </Text>
          <Text 
            style={{
              fontFamily: 'outfit-medium',
              marginTop: 8,
              fontSize: 18,
              color: Colors.WHITE
            }}>
                {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>
      </View>

      {/* profile menue section  */}

      <View style={{paddingTop: 100}}>
        <FlatList 
          data={profileMenue}
          renderItem={({item, index}) => (
            <TouchableOpacity 
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginBottom: 20,
                paddingHorizontal: 80
              }}
            >
              {
                item.name != 'My Services'?
                  <Ionicons name={item.icon} size={30} color={Colors.PRIMARY} />
                :
                <MaterialIcons name={item.icon} size={30} color={Colors.PRIMARY} />
              }
              <Text 
                style={{
                  fontFamily: 'outfit',
                  fontSize: 20
                }}>
                    {item?.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}