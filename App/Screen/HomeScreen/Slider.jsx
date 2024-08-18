import { View, StyleSheet, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalApi from '../../Utils/GlobalApi';
import Heading from '../../Common/Heading';

export default function Slider() {
    const [slider, setSlider] = useState([]);
    useEffect(() => {
        getSliders();
    }, []);
    
    const getSliders = () => {
        GlobalApi.getSlider().then(resp => {
            setSlider(resp?.sliders);
        });
    };

    return (
        <View>
            <Heading text={'Offers For You'}/>
            <FlatList 
                data={slider}
                nestedScrollEnabled={true}
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
