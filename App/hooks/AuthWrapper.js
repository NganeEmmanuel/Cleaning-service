import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useAuth, useSignIn } from '@clerk/clerk-expo';

const AuthWrapper = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const { signIn } = useSignIn();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const userToken = await SecureStore.getItemAsync('userToken');
      if (userToken && !isSignedIn) {
        // Correctly call signIn method
        const result = await signIn({ sessionId: userToken });
        console.log('SignIn Result:', result);
      }
      setIsLoading(false);
    };

    if (isLoaded) {
      checkToken();
    }
  }, [isLoaded, isSignedIn, signIn]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return children;
};

export default AuthWrapper;