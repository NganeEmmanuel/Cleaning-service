import React, { useEffect, useState, useRef } from 'react';
import { View, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '@clerk/clerk-expo';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const AuthHandler = ({ children }) => {
  const { setActive } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const hasNavigated = useRef(false);

  useEffect(() => {
    const checkToken = async () => {
      const userToken = await SecureStore.getItemAsync('userToken');
      if (userToken) {
        await setActive({ session: userToken });
        navigation.navigate('Home');
      } else {
        navigation.navigate('Login');
      }
      setIsLoading(false);
      hasNavigated.current = true;
    };

    if (isFocused && !hasNavigated.current) {
      checkToken();
    }
  }, [setActive, navigation, isFocused]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return children;
};

export default AuthHandler;
