// App/Screen/HomeScreen.jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header';
import Slider from './Slider';
import Categories from './Categories';

export default function Home() {
  return (
    <View>
      {/* header section */}
      <Header />

      <View style={styles.homeViewContainer}>
        {/* slider sectioin */}
        <Slider />

        {/* Category section */}
        <Categories />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeViewContainer: {
    padding: 20
  }
})
