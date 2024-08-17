import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Heading({ text, isViewAll = false, onPress, isViewAllText = 'View All' }) {
    return (
        <View style={styles.commonHeadingContainer}>
            <Text style={styles.heading}>{text}</Text>
            {isViewAll && 
                <TouchableOpacity onPress={onPress}>
                    <Text>{isViewAllText}</Text>
                </TouchableOpacity>
            }
        </View>
    );
}


const styles = StyleSheet.create({
    commonHeadingContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'

    },

    heading: {
        fontSize: 20,
        fontFamily: 'outfit-medium',
        marginBottom: 10,
    }
})
