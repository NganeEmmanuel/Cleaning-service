import React, { useEffect, useRef, useState } from 'react';
import { View, Modal, Animated, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../Utils/Colors';

// Get screen dimensions
const { height: screenHeight } = Dimensions.get('window');

const CustomModal = ({ 
    title,
    visible, 
    onClose, 
    height = 300,  // Default height, can be adjusted via props
    backgroundColor = '#fff', 
    children 
}) => {
    const [showModal, setShowModal] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(screenHeight)).current;  // Ensure starting from screenHeight

    useEffect(() => {
        if (visible && !showModal) {  // Check if modal is already shown to avoid redundant animations
            setShowModal(true);
            animateIn();
        } else if (!visible && showModal) {
            animateOut();
        }
    }, [visible]);

    const animateIn = () => {

        // Start animations to slide up and fade in
        slideAnim.setValue(screenHeight);  // Explicitly set to screenHeight to ensure correct starting point
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: screenHeight - height,  // Slide up to the desired height
                duration: 500, // Adjusted duration for smoother animation
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500, // Match duration with slide for consistency
                useNativeDriver: true,
            }),
        ]).start();
    };

    const animateOut = () => {

        // Start animations to slide down and fade out
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: screenHeight,  // Slide back down off-screen
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setShowModal(false);  // Set modal to hidden state after animation
        });
    };

    return (
        <Modal
            transparent
            visible={showModal}
            onRequestClose={onClose}
            animationType="none"
        >
            <View style={styles.centeredView}>
                <Animated.View style={[
                    styles.modalView, 
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                        height,
                        width: '98%',
                        backgroundColor,
                    }
                ]}>
                    {/* Close button section  */}
                    <View style={styles.modalHead}>
                        {title?<Text style={styles.modalTile}>{title}</Text>:<Text></Text>}
                        <TouchableOpacity onPress={() => onClose(false)}>
                        <Ionicons name="close-circle" size={30} color={Colors.WARNING} />
                        </TouchableOpacity>
                    </View>

                    {/* Modal content */}
                    {children}
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',  // Align items at the bottom of the screen
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    modalHead: {
        borderBottomWidth: .2,
        padding: 10,
        paddingBottom: 15,
        paddingTop: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
    
      modalTile: {
        fontFamily: 'outfit-bold',
        fontSize: 17,
        color:Colors.BLACK
      },
});

export default CustomModal;
