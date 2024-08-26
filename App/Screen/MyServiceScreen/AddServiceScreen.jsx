import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import BackNavigation from './../../Common/BackNavigation';
import { Picker } from '@react-native-picker/picker';
import Colors from '../../Utils/Colors';
import GlobalApi from '../../Utils/GlobalApi';

export default function AddServiceScreen() {
    const [serviceName, setServiceName] = useState('');
    const [pricePerHour, setPricePerHour] = useState('');
    const [description, setDescription] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [images, setImages] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [categories, setCategories] = useState([])

    useEffect(() => {
        GlobalApi.getCategories().then(resp => {
            setCategories(resp?.categories)
        })
    }, [categories])

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImages([...images, ...(result.selected || [result])]);
        }
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const renderImageItem = ({ item, index }) => (
        <View style={styles.imageContainer} key={index}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <TouchableOpacity onPress={() => removeImage(index)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
        </View>
    );

    const handleSubmit = () => {
        const data = {
            serviceName,
            pricePerHour,
            description,
            contactNumber,
            selectedOption,
            images,
        };

        console.log('Form Data:', data);
        // Handle the data submission (e.g., send to backend)
    };

    return (
        <View style={styles.container}>
            <BackNavigation title={'Add Service'} />

            <ScrollView contentContainerStyle={styles.form}>
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
                            {categories.map((option) => (
                                <Picker.Item key={option.id} label={option.name} value={option.id} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <TouchableOpacity onPress={pickImage} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add Images</Text>
                </TouchableOpacity>

                <FlatList
                    data={images}
                    renderItem={renderImageItem}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    style={styles.imageList}
                />
            </ScrollView>

            {/* Fixed Confirm & Save Button */}
            <TouchableOpacity onPress={handleSubmit} style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Confirm & Save</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
    },
    form: {
        padding: 20,
        paddingBottom: 80, // Adds space at the bottom of the form to avoid overlap with the button
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
    addButton: {
        backgroundColor: Colors.BLACK,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: Colors.WHITE,
    },
    confirmButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: Colors.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
