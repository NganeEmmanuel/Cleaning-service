import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MyServiceScreen from '../Screen/MyServiceScreen/MyServiceScreen'
import AddServiceScreen from '../Screen/MyServiceScreen/AddServiceScreen'

const Stack = createStackNavigator();

export default function MyServicesNavigation() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
       }}>
        <Stack.Screen name='my-services' component={MyServiceScreen}/>
        <Stack.Screen name='add-service' component={AddServiceScreen} />
    </Stack.Navigator>
  )
}