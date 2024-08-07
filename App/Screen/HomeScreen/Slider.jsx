import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalApi from '../../Utils/GlobalApi';
import { FlatList } from 'react-native-gesture-handler';

export default function Slider() {
    const [slider, setSlider] = useState([]);
    
    useEffect(() => {
        getSliders();
    }, []);
    
    const getSliders = () => {
        GlobalApi.getSlider().then(resp => {
            console.log("resp: ", resp.sliders);
            setSlider(resp?.sliders);
        });
    };

    return (
        <View>
            <Text style={styles.heading}>Offers For You</Text>
            <FlatList 
                data={slider}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index }) => (
                    <View style={styles.imageContainer}>
                        <Image source={{uri:item?.image?.url}} style={styles.sliderImage} />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontFamily: 'outfit-medium',
        marginBottom: 10,
    },

    sliderImage: {
        width: 217,
        height: 150,
        borderRadius: 20,
        objectFit: 'contain',

    },

    imageContainer: {
        marginRight: 20
    }
});
