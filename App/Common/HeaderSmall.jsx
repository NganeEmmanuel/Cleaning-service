import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '../Utils/Colors';
import BackNavigation from './BackNavigation';
import GlobalApi from '../Utils/GlobalApi';

export default function Header({term, setService}) {
    const {user, isLoading} = useUser(); // fetch data from server
    const [searchTerm, setSearchTerm] = useState('')
    
    const SearchService = () => {
            GlobalApi.SearchServiceList(searchTerm)
            .then(resp => {
                if(resp != 'error'){
                    setService(resp?.serviceLists)
                }else{
                    // handle error appropriately
                }
            })
    }

  return user&&(
    <View style={styles.container}>
        {/* back navigation section  */}
        <BackNavigation title={'Search result'}/>
        {/* search bar section */}
        <View style={styles.searchBarContainer}>
            <TextInput placeholder="Search for services ..." style={styles.searchbarTextInput}
                onChangeText={setSearchTerm}
            />
            <TouchableOpacity onPress={() => SearchService()}>
                <FontAwesome name="search" size={24} color={Colors.PRIMARY} style={styles.searchBarButton} />
            </TouchableOpacity>
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
