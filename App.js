import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import Constants from 'expo-constants';
import Login from './App/Screen/LoginScreen/Login';
import Home from './App/Screen/HomeScreen/Home';

const getClerkFrontendApi = () => {
  if (Constants.expoConfig && Constants.expoConfig.extra) {
    return Constants.expoConfig.extra.clerkFrontendApi;
  } else if (Constants.manifest && Constants.manifest.extra) {
    return Constants.manifest.extra.clerkFrontendApi;
  } else {
    console.warn('Clerk Frontend API key is missing');
    return null;
  }
};

const clerkFrontendApi = getClerkFrontendApi();

const Stack = createNativeStackNavigator();

export default function App() {
  if (!clerkFrontendApi) {
    return (
      <View style={styles.container}>
        <Text>Missing Clerk Frontend API key</Text>
      </View>
    );
  }

  return (
    <ClerkProvider publishableKey={clerkFrontendApi}>
      <NavigationContainer>
        <SignedIn>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </SignedIn>
        <SignedOut>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </SignedOut>
      </NavigationContainer>
      <StatusBar style="auto" />
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
