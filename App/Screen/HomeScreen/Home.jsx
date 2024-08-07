// App/Screen/HomeScreen.jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header';
import Slider from './Slider';

export default function Home() {
  return (
    <View>
      {/* header section */}
      <Header />

      <View style={styles.homeViewContainer}>
        {/* slider sectioin */}
        <Slider />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeViewContainer: {
    padding: 20
  }
})
