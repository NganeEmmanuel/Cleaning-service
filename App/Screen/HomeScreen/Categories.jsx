import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../Utils/GlobalApi'
import Heading from '../../Common/Heading';
import Colors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [allCategories, setAllCategories] = useState(3)

    //initialize navigation for tracking and handling navigation to other screens from homescreen
    const navigation = useNavigation() 

    // toggle view all on categories  todo, finish the view all implementation on categories
    const viewAllCategories = () => {
        setAllCategories(12)
    }

    useEffect(() => {
      getCategories();
    }, []);

    /**
     * Get Category list function
     * Returns all the list of categories in the database(id, name, icons)
     */
    const getCategories=()=>{
        GlobalApi.getCategories().then(resp=>{
            setCategories(resp?.categories)
        });
    };
  return (
    <View style={styles.categoriesContainer}>
      <Heading text={'Categories'} isViewAll={true} />
      {/* <Text>{console.log(categories[0].icon.url)}</Text> */}
      <FlatList 
        data={categories}
        numColumns={4}
        renderItem={({item, index }) => index <= allCategories && (
            <TouchableOpacity
              onPress={() =>navigation.push('service-list',{
                category:item.name
              })}

              style={styles.mainIconContainer}
            >
                <View style={styles.iconContainer}>
                    <Image source={{uri:item?.icon?.url}} style={styles.icons}/>
                </View>
                <Text style={styles.categoryName}>{item.name}</Text>
            </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  categoriesContainer: {
    marginTop: 10,
  },

  mainIconContainer: {
    flex: 1,
    alignItems: 'center'
  },

  iconContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    padding: 17,
    borderRadius: 99
  },

  icons: {
    width: 30,
    height: 30
  },

  categoryName: {
    fontFamily: 'outfit-medium',
    marginTop: 5
  }
})
