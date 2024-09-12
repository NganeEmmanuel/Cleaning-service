import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-expo'; // Fetch data from server
import Colors from '../../Utils/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
  const { user, isLoading } = useUser(); 
  const navigation = useNavigation();
  const [term, setTerm] = useState('');

  return user && (
    <View style={styles.container}>
      {/* Profile section */}
      <View style={styles.headerContainer}>
        <View style={styles.profileContainer}>
          {/* Navigate to the Profile tab */}
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={{ uri: user?.imageUrl }} style={styles.headerUserImage} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerWelcomeText}>Welcome</Text>
            <Text style={styles.headerUsername}>{user?.fullName}</Text>
          </View>
        </View>

        {/* Navigate to the Booking tab */}
        <TouchableOpacity onPress={() => navigation.navigate('Booking')}>
          <FontAwesome name="bookmark-o" size={27} color={Colors.WHITE} />
        </TouchableOpacity>
      </View>

      {/* Search bar section */}
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Search for services ..."
          style={styles.searchbarTextInput}
          onChangeText={setTerm}
        />
        <TouchableOpacity onPress={() => navigation.push('search-result', { searchTerm: term })}>
          <FontAwesome name="search" size={24} color={Colors.PRIMARY} style={styles.searchBarButton} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: Colors.PRIMARY,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerUserImage: {
    width: 45,
    height: 45,
    borderRadius: 99,
  },
  headerWelcomeText: {
    color: Colors.WHITE,
    fontFamily: 'outfit',
  },
  headerUsername: {
    color: Colors.WHITE,
    fontSize: 20,
    fontFamily: 'outfit-medium',
  },
  searchBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
    marginBottom: 5,
  },
  searchbarTextInput: {
    padding: 7,
    paddingHorizontal: 16,
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    width: '85%',
    fontSize: 16,
    fontFamily: 'outfit',
  },
  searchBarButton: {
    backgroundColor: Colors.WHITE,
    padding: 10,
    borderRadius: 8,
  },
});
