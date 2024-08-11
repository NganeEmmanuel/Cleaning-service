import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Heading({text, isViewAll=false}) {
  return (
    <View>
      <Text style={styles.heading}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontFamily: 'outfit-medium',
        marginBottom: 10,
    }
})
