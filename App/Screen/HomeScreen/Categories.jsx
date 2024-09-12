import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalApi from '../../Utils/GlobalApi';
import Heading from '../../Common/Heading';
import Colors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';
import CardLoadingOverlay from '../../Common/CardLoadingOverlay';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [allCategories, setAllCategories] = useState(3);
    const [isViewAll, setIsViewAll] = useState(false);
    const [loading, setLoading] = useState(true)

    const navigation = useNavigation();

    // Toggle view all on categories
    const viewAllCategories = () => {
        if (isViewAll) {
            setAllCategories(3);
            setIsViewAll(false);
        } else {
            setAllCategories(12);
            setIsViewAll(true);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = () => {
        GlobalApi.getCategories().then(resp => {
            setCategories(resp?.categories);
            setLoading(false);
        }).catch(() => {
            // setErrorMessage('Something went wrong. Please check your internet connection and try again')
            setLoading(false);  // Ensure loading ends even if there is an error
        });
    };

    return (
        <View style={styles.categoriesContainer}>
            <Heading 
                text={'Categories'} 
                isViewAll={true} 
                onPress={viewAllCategories} 
                isViewAllText={isViewAll ? 'View Less' : 'View All'}
            />

            {loading?
                <CardLoadingOverlay visible={loading}/>
            :   <FlatList 
                    data={categories}
                    numColumns={4}
                    nestedScrollEnabled={true}
                    renderItem={({ item, index }) => index <= allCategories && (
                        <TouchableOpacity
                            onPress={() => navigation.push('service-list', {
                                category: item.name
                            })}
                            style={styles.mainIconContainer}
                        >
                            <View style={styles.iconContainer}>
                                <Image source={{ uri: item?.icon?.url }} style={styles.icons} />
                            </View>
                            <Text style={styles.categoryName}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />}
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
