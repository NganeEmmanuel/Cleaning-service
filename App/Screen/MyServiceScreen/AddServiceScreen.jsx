import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, Button, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import BackNavigation from './../../Common/BackNavigation';
import { Picker } from '@react-native-picker/picker'; // Correct import
import Colors from '../../Utils/Colors';

export default function AddServiceScreen() {
    const [serviceName, setServiceName] = useState('');
    const [pricePerHour, setPricePerHour] = useState('');
    const [description, setDescription] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [images, setImages] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

    const options = ['Option 1', 'Option 2', 'Option 3'];

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImages([...images, ...result.selected || [result]]);
        }
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const renderImageItem = ({ item, index }) => (
        <View style={styles.imageContainer}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <TouchableOpacity onPress={() => removeImage(index)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <BackNavigation title={'Add Service'} />
            
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Service Name"
                    value={serviceName}
                    onChangeText={setServiceName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Price per hour"
                    keyboardType="numeric"
                    value={pricePerHour}
                    onChangeText={setPricePerHour}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    multiline
                    numberOfLines={4}
                    value={description}
                    onChangeText={setDescription}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contact Number"
                    keyboardType="phone-pad"
                    value={contactNumber}
                    onChangeText={setContactNumber}
                />

                <View style={styles.dropdown}>
                    <Text style={styles.dropdownLabel}>Select Category:</Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={selectedOption}
                            onValueChange={(itemValue) => setSelectedOption(itemValue)}
                            
                        >
                            {options.map((option, index) => (
                                <Picker.Item key={index} label={option} value={option} />
                            ))}
                        </Picker>
                    </View>
                </View>
                
                <TouchableOpacity onPress={pickImage} style={{
                    backgroundColor: Colors.PRIMARY,
                    padding: 15,
                    borderRadius: 5,
                    alignItems: 'center',
                    marginTop: 20}}>
                    <Text style={{color: Colors.WHITE}}>Add Images</Text>
                </TouchableOpacity>
                <FlatList
                    data={images}
                    renderItem={renderImageItem}
                    keyExtractor={(item) => item.uri}
                    horizontal
                    style={styles.imageList}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 20,
    },
    form: {
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.GREY,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    dropdown: {
        marginBottom: 20,
    },
    dropdownLabel: {
        fontSize: 16,
        marginBottom: 10,
    },
    picker: {
        borderWidth: 1,
        borderColor: Colors.GREY,
        borderRadius: 5,
        height: 50,
    },
    imageList: {
        marginTop: 15,
    },
    imageContainer: {
        position: 'relative',
        marginRight: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    removeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 5,
    },
    removeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
