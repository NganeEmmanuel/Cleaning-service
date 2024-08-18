import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Animated, Easing, Modal } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../Utils/Colors';
import ServiceImages from './ServiceImages';
import ServiceAbout from './ServiceAbout';
import BookingModal from './BookingModal';

export default function ServiceDetailScreen() {
    const param = useRoute().params;
    const [service, setService] = useState();
    const [showModal, setShowModal] = useState(false)
    const navigation = useNavigation();
    const scrollY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        console.log(param?.service)
        param && setService(param?.service);
    }, [param]);

    const imageHeight = scrollY.interpolate({
        inputRange: [0, 500], // Extended scroll distance for smoother transition
        outputRange: [300, 70], // Height transition range
        extrapolate: 'clamp',
        easing: Easing.out(Easing.ease), // Easing function for smooth transition
    });

    return (
        <View style={styles.container}>
            <View style={{height: '99.5%'}}>
                <TouchableOpacity style={styles.navContainer} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={30} color="black" />
                </TouchableOpacity>

                {/* Main image */}
                <Animated.Image source={{ uri: service?.images[0]?.url }} style={[styles.serviceImage, { height: imageHeight }]} />

                {/* Basic information section */}
                <Animated.ScrollView 
                    contentContainerStyle={styles.infoContainer}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={16}
                >
                    <Text style={styles.Servicename}>{service?.name}</Text>
                    <View style={styles.catProviderContainer}>
                        <Text style={styles.serviceProvider}>{service?.contactPerson} 🌟</Text>
                        <Text style={styles.ServiceCategory}>{service?.category.name}</Text>
                    </View>
                    <Text style={styles.serviceAddress}>
                        <Ionicons name="location-sharp" size={20} color={Colors.PRIMARY} />
                        {service?.address}
                    </Text>

                    {/* Horizontal Line */}
                    <View style={{ borderWidth: 0.2, color: Colors.GREY, marginTop: 30, marginBottom: 20 }}></View>

                    <ServiceAbout service={service} />

                    {/* Horizontal Line */}
                    <View style={{ borderWidth: 0.2, color: Colors.GREY, marginTop: 30, marginBottom: 20 }}></View>

                    <ServiceImages service={service} />
                </Animated.ScrollView>

                {/* buttons sections */}
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.messageBtn}>
                        <Text style={styles.messageBtnText}>Message</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bookinBtn} onPress={() => setShowModal(true)} >
                        <Text style={styles.bookingBtnText}>Book Now</Text>
                    </TouchableOpacity>
                </View>

                {/* Modal section for booking */}
                <Modal animationType='slide' visible={showModal}>
                    <BookingModal  hideModal={()=>setShowModal(false)} serviceID={service?.id}/>
                </Modal>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    navContainer: {
        position: 'absolute',
        zIndex: 10,
        margin: 20,
        marginTop: 25
    },

    serviceImage: {
        width: '100%',
    },

    infoContainer: {
        padding: 20,
        display: 'flex',
        gap: 7,
        paddingBottom: 30,
        flexGrow: 1,
        justifyContent: 'flex-start',
    },

    Servicename: {
        fontFamily: 'outfit-bold',
        fontSize: 25
    },

    catProviderContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    },

    serviceProvider: {
        fontFamily: 'outfit-medium',
        color: Colors.PRIMARY,
        fontSize: 20
    },

    ServiceCategory: {
        color: Colors.PRIMARY,
        backgroundColor: Colors.PRIMARY_LIGHT,
        padding: 3,
        borderRadius: 5,
        fontSize: 14
    },

    serviceAddress: {
        fontSize: 18,
        fontFamily: 'outfit',
        color: Colors.GREY
    },

    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 8,
        marginBottom: 2,
        gap: 10,
    },

    messageBtn: {
        padding: 15,
        backgroundColor: Colors.WHITE,
        borderWidth: 1,
        borderColor:Colors.PRIMARY,
        borderRadius: 99,
        flex: 1
    },

    messageBtnText: {
        textAlign: 'center',
        fontFamily: 'outfit-medium',
        color: Colors.PRIMARY,
        fontSize: 18
    },

    bookinBtn: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderWidth: 1,
        borderColor:Colors.WHITE,
        borderRadius: 99,
        flex: 1
    },

    bookingBtnText: {
        textAlign: 'center',
        fontFamily: 'outfit-medium',
        color: Colors.WHITE,
        fontSize: 18
    }

});
