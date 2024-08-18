import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import BackNavigation from '../../Common/BackNavigation'

export default function BookingModal({hideModal}) {
  return (
    <View style={styles.container}>
      <BackNavigation handle={false} title={'Book Service'} onclick={() => hideModal()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
})
