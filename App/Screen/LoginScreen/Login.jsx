import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../Utils/Colors';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from '../../hooks/WarmUpBrowser';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@clerk/clerk-react';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const navigation = useNavigation();
  const { signOut } = useAuth();

  const onPressLogin = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();
      console.log('OAuth flow result:', { createdSessionId, signIn, signUp });

      if (createdSessionId) {
        console.log('Created Session ID:', createdSessionId);
        await setActive({ session: createdSessionId });
        console.log('Session is active.');
        navigation.navigate('Home');
      } else {
        console.log('No session created. Use signIn or signUp for next steps such as MFA.');
      }
    } catch (err) {
      console.log('OAuth error:', err);
    }
  }, [startOAuthFlow, navigation]);

  // const onPressLogout = async () => {
  //   try {
  //     await signOut();
  //     navigation.navigate('Login');
  //   } catch (err) {
  //     console.log('Logout error:', err);
  //   }
  // };

  return (
    <View style={styles.loginContainer}>
      <Image source={require('../../../assets/images/login.jpg')} style={styles.loginImage} />
      <View style={styles.subContainer}>
        <Text style={styles.subContainerText}>
          Let's
          <Text style={styles.subContainerTextSubtext}> Find Professional Cleaning and Repair </Text>
          Services
        </Text>
        <Text style={styles.subContainerTextDescription}>
          Best app to find services near you which deliver you professional services
        </Text>

        <TouchableOpacity style={styles.loginButton} onPress={onPressLogin}>
          <Text style={styles.loginButtonText}>Let's Get Started</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.logoutButton} onPress={onPressLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginImage: {
    width: 230,
    height: 450,
    marginTop: 30,
    borderWidth: 4,
    borderColor: Colors.BLACK,
    borderRadius: 15
  },

  loginContainer: {
    alignItems: 'center'
  },

  subContainer: {
    width: '100%',
    backgroundColor: Colors.PRIMARY,
    height: '70%',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20
  },

  subContainerText: {
    fontSize: 22,
    color: Colors.WHITE,
    textAlign: 'center'
  },

  subContainerTextSubtext: {
    fontWeight: 'bold'
  },

  subContainerTextDescription: {
    fontSize: 13,
    color: Colors.WHITE,
    textAlign: 'center',
    marginTop: 10
  },

  loginButton: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 99,
    marginTop: 20
  },

  loginButtonText: {
    textAlign: 'center',
    fontSize: 17,
    color: Colors.PRIMARY
  }
});
