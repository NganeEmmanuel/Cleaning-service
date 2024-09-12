import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useClerk, useUser } from '@clerk/clerk-expo';
import Colors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const {user} = useUser()
  const { signOut } = useClerk();
  const navigation = useNavigation()


  const profileMenue = [
    {
      id: 1,
      name: 'Home',
      icon: 'home',
      tab: 'Home'
    },

    {
      id: 2,
      name: 'My booking',
      icon: 'bookmark',
      tab: 'Booking'
    },

    {
      id: 3,
      name: 'My Services',
      icon: 'dashboard-customize',
      tab: 'MyServices'
    },

    {
      id: 4,
      name: 'Logout',
      icon: 'log-out',
      tab: 'none'
    }

  ]
  /**\
   * Gpt Handle this implementation gracefully
   * This method clears the authToken in cache and end the user's session Making sure user must sign back in to continue to use the app
   */
  const logOut = async () => {
    try {
      await signOut(); // Call Clerk's signOut function
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };
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
            onPress={
              item.tab != 'none'?
                () => navigation.navigate(item.tab)
              :
                () => logOut()
            }
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