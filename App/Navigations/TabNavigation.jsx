import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screen/HomeScreen/Home';
import BookingScreen from '../Screen/BookingScreen/BookingScreen';
import ProfileScreen from '../Screen/ProfileScreen/ProfileScreen'
import Colors from '../Utils/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY
    }}>
        <Tab.Screen name='Home' component={Home} options={{
            headerShown: false,
            tabBarLabel: ({color}) =>(
                <Text style={{color:color, fontSize:12, marginTop: -7 }}>Home</Text>
            ),
            tabBarIcon:({color, size})=>(
                <FontAwesome name="home" size={size} color={color} />
            )
        }}
        />
        <Tab.Screen name='Booking' component={BookingScreen} options={{
            headerShown: false,
            tabBarLabel: ({color}) =>(
                <Text style={{color:color, fontSize:12, marginTop: -7 }}>Bookings</Text>
            ),
            tabBarIcon:({color, size})=>(
                <FontAwesome name="bookmark" size={size} color={color} />
            )
        }}/>
        <Tab.Screen name='Profile' component={ProfileScreen} options={{
            headerShown: false,
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