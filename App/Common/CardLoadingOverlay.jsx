import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors';

export default function CardLoadingOverlay({ visible, height = 300}) {
    if (!visible) return null;
    
    return (
        <View style={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
            width: '100%',
            height: {height}
        }}>
            <ActivityIndicator size="large" color={Colors.PRIMARY} />
            <Text style={styles.loadingText}>laoding...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    loadingOverlay: {
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    loadingText: {
        marginTop: 10,
        color: Colors.PRIMARY,
        fontSize: 16,
    },
})
