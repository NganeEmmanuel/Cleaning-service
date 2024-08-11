import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import Constants from 'expo-constants';
import Login from './App/Screen/LoginScreen/Login';
import * as SecureStore from 'expo-secure-store'
import TabNavigation from './App/Navigations/TabNavigation';
import { useFonts } from 'expo-font';

//save login token to cache to enable auto login when
const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

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
console.log('Clerk Frontend API:', clerkFrontendApi);

const Stack = createNativeStackNavigator();

export default function App() {
  // add font loading to use in the app
  const [loaded, error] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
  });

  if (!clerkFrontendApi) {
    return (
      <View style={styles.container}>
        <Text>Missing Clerk Frontend API key</Text>
      </View>
    );
  }

  return (
      <ClerkProvider 
      tokenCache={tokenCache}
      publishableKey={clerkFrontendApi}>
        <NavigationContainer>
          <SignedIn>
            <TabNavigation />
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
