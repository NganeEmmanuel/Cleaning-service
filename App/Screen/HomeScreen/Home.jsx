// App/Screen/HomeScreen.jsx
import React from 'react';
import { View, StyleSheet, ScrollView, LogBox } from 'react-native';
import Header from './Header';
import Slider from './Slider';
import Categories from './Categories';
import ServiceList from './ServiceList';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']); //remove this when you want to debug this error

export default function Home() {
  return (
    <View style={styles.container}>
      {/* Header section */}
      <Header />

      {/* Scrollable content */}
      <ScrollView style={styles.homeViewContainer}>
        {/* Slider section */}
        <Slider />

        {/* Category section */}
        <Categories />

        {/* ServiceList section */}
        <ServiceList />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homeViewContainer: {
    padding: 20
  },
});

