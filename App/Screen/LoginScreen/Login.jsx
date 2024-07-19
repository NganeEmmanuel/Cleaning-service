import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'

export default function Login() {
  return (
    <View style={styles.loginContainer}>
      <Image source={require("../../../assets/images/login.jpg")} 
        style={styles.loginImage}
      />
      <View style={styles.subContainer}>
        <Text style={styles.subContainerText}>
            Let's 
            <Text style={styles.subContainerTextSubtext}> Find Proffesional Cleaning and Repair </Text>
            Services
        </Text>
        <Text style={styles.subContainerTextdescription}>Best App to find Services near you which deliver you a Proffesional Services</Text>
        
        <TouchableOpacity style={styles.loginButton} onPress={() => console.log("Button pressed")}>
            <Text style={styles.loginButtonText}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loginImage: {
    with: 230,
    height: 450,
    marginTop: 70,
    borderWidth: 4,
    borderColor: Colors.BLACK,
    borderRadius: 15
  },

  loginContainer: {

    alignItems: "center"
  },

  subContainer: {
    width: '100%',
    backgroundColor: Colors.PRIMARY,
    height: '70%',
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20
  },

  subContainerText: {
    fontSize: 27,
    color: Colors.WHITE,
    textAlign: 'center'
  },

  subContainerTextSubtext:{
    fontWeight: 'bold'
  },

  subContainerTextdescription: {
    fontSize: 17,
    color: Colors.WHITE,
    textAlign: 'center',
    marginTop: 20
  },

  loginButton: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 99,
    marginTop: 40
  },
  
  loginButtonText: {
    textAlign: 'center',
    fontSize: 17,
    color: Colors.PRIMARY
  }
})
