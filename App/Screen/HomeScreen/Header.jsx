import { View, Text, Image, StyleSheet, TextInput} from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import Colors from '../../Utils/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Header() {
    const {user, isLoading} = useUser(); // fetch data from server
  return user&&(
    <View style={styles.container}>
        {/* profile section */}
        <View style={styles.headerContainer}>
            <View style={styles.profileContainer}>
                <Image source={{uri:user?.imageUrl}} style={styles.headerUserImage} />
                <View>
                    <Text style={styles.headerWelcomeText}>Welcome</Text>
                    <Text style={styles.headerUsername}>{user?.fullName}</Text>
                </View>
            </View>
            <FontAwesome name="bookmark-o" size={27} color={Colors.WHITE} />
        </View>

        {/* search bar section */}
        <View style={styles.searchBarContainer}>
            <TextInput placeholder="Search for services ..." style={styles.searchbarTextInput} />
            <FontAwesome name="search" size={24} color={Colors.PRIMARY} style={styles.searchBarButton} />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.PRIMARY,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25
    },

    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    profileContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },

    headerUserImage: {
        width: 45,
        height: 45,
        borderRadius: 99,
    },

    headerWelcomeText:{
        color: Colors.WHITE,
        fontFamily: 'outfit'
        
    },

    headerUsername:{
        color: Colors.WHITE,
        fontSize: 20,
        fontFamily: 'outfit-medium'
    },

    searchBarContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginTop: 15,
        marginBottom: 5

    },

    searchbarTextInput: {
        padding: 7,
        paddingHorizontal: 16,
        backgroundColor: Colors.WHITE,
        borderRadius: 8,
        width: '85%',
        fontSize: 16,
        fontFamily: 'outfit'
    },
    
    searchBarButton: {
        backgroundColor: Colors.WHITE,
        padding: 10,
        borderRadius: 8
    }
})
