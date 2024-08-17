import {Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookingScreen from '../Screen/BookingScreen/BookingScreen';
import ProfileScreen from '../Screen/ProfileScreen/ProfileScreen'
import Colors from '../Utils/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import HomeNavigation from './HomeNavigation';

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY,
        initialRouteName:"Home",
        headerShown: false
    }}>
        <Tab.Screen name='Home' component={HomeNavigation} options={{
            tabBarLabel: ({color}) =>(
                <Text style={{color:color, fontSize:12, marginTop: -7 }}>Home</Text>
            ),
            tabBarIcon:({color, size})=>(
                <FontAwesome name="home" size={size} color={color} />
            )
        }}
        />
        <Tab.Screen name='Booking' component={BookingScreen} options={{
            tabBarLabel: ({color}) =>(
                <Text style={{color:color, fontSize:12, marginTop: -7 }}>Bookings</Text>
            ),
            tabBarIcon:({color, size})=>(
                <FontAwesome name="bookmark" size={size} color={color} />
            )
        }}/>
        <Tab.Screen name='Profile' component={ProfileScreen} options={{
            tabBarLabel: ({color}) =>(
                <Text style={{color:color, fontSize:12, marginTop: -7 }}>Profile</Text>
            ),
            tabBarIcon:({color, size})=>(
                <FontAwesome name="user-circle" size={size} color={color} />
            )
        }}/>
    </Tab.Navigator>
  )
}