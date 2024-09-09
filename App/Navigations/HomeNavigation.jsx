import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screen/HomeScreen/Home';
import ServiceListByCategoryScreen from '../Screen/ServiceListByCategoryScreen/ServiceListByCategoryScreen';
import ServiceDetailScreen from '../Screen/ServiceDetailScreen/ServiceDetailScreen';
import LatestServicesScreen from '../Screen/LatestServicesScreen/LatestServicesScreen';

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
   <Stack.Navigator screenOptions={{
    headerShown: false
   }}>
    <Stack.Screen name='home' component={Home}/>
    <Stack.Screen name='service-list' component={ServiceListByCategoryScreen} />
    <Stack.Screen name='service-details' component={ServiceDetailScreen} />
    <Stack.Screen name='latest-services' component={LatestServicesScreen} />
   </Stack.Navigator>
  )
}