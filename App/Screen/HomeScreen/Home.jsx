// App/Screen/HomeScreen.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from './Header';
import Slider from './Slider';

export default function Home() {
  return (
    <View>
      {/* header section */}
      <Header />

      {/* slider sectioin */}
      <Slider />
    </View>
  );
}
