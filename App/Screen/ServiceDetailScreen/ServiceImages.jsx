import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import React from 'react'
import Heading from '../../Common/Heading'

export default function ServiceImages({service}) {
  return (
    <View>
      <Heading text={'Photos'} />
      <FlatList 
      data={service?.images}
      numColumns={2}
      renderItem={({item, index}) => (
        <Image source={{uri:item?.url}} style={styles.moreImages}  />
      )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  moreImages: {
    width: '100%',
    height: 129,
    flex: 1,
    borderRadius: 15,
    margin: 7
  }
})
