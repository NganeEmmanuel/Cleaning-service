import { View, StyleSheet, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalApi from '../../Utils/GlobalApi';
import Heading from '../../Common/Heading';
import CardLoadingOverlay from '../../Common/CardLoadingOverlay';

export default function Slider() {
    const [slider, setSlider] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getSliders();
    }, []);
    
    const getSliders = () => {
        GlobalApi.getSlider().then(resp => {
            setSlider(resp?.sliders);
            setLoading(false);
        }).catch(() => {
            setErrorMessage('Something went wrong. Please check your internet connection and try again')
            setLoading(false);  // Ensure loading ends even if there is an error
        });
    };

    return (
        <View>
            <Heading text={'Offers For You'}/>

            {loading?
                <CardLoadingOverlay visible={loading} />
            :
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
            />}
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
