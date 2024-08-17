import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screen/HomeScreen/Home';
import ServiceListByCategoryScreen from '../Screen/ServiceListByCategoryScreen/ServiceListByCategoryScreen';

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
   <Stack.Navigator screenOptions={{
    headerShown: false
   }}>
    <Stack.Screen name='home' component={Home}/>
    <Stack.Screen name='service-list' component={ServiceListByCategoryScreen} />
   </Stack.Navigator>
  )
}