import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import BackNavigation from './../../Common/BackNavigation';
import { Picker } from '@react-native-picker/picker';
import Colors from '../../Utils/Colors';
import GlobalApi from '../../Utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo';

// Loading screen component
const LoadingOverlay = ({ visible }) => {
    if (!visible) return null;
    
    return (
        <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={Colors.PRIMARY} />
            <Text style={styles.loadingText}>Verifying & Saving Service now...</Text>
        </View>
    );
};

export default function AddServiceScreen({ navigation }) {
    const [serviceName, setServiceName] = useState('');
    const [pricePerHour, setPricePerHour] = useState('');
    const [description, setDescription] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [images, setImages] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [categories, setCategories] = useState([]);
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const { user } = useUser();

    useEffect(() => {
        GlobalApi.getCategories().then(resp => {
            setCategories(resp?.categories);
        });
    }, [categories]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });
    
        if (!result.canceled && result.assets) {
            const selectedImages = result.assets.map(img => ({
                uri: img.uri,
                filename: img.fileName,
                type: img.mimeType,
            }));
            setImages([...images, ...selectedImages]);
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

    const validateInput = () => {
        const phoneRegex = /^[0-9]{9}$/;
        const decimalRegex = /^[0-9]+(\.[0-9]{1,2})?$/;

        if (!serviceName.trim()) {
            setMessage({ type: 'error', text: 'Service name cannot be empty' });
            return false;
        }

        if (!decimalRegex.test(pricePerHour)) {
            setMessage({ type: 'error', text: 'Price per hour must be a positive decimal' });
            return false;
        }

        if (!phoneRegex.test(contactNumber)) {
            setMessage({ type: 'error', text: 'Contact number must be a valid 9-digit number' });
            return false;
        }

        if (!selectedOption) {
            setMessage({ type: 'error', text: 'You must select a category' });
            return false;
        }

        if (images.length === 0) {
            setMessage({ type: 'error', text: 'You must add at least one image' });
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateInput()) return;

        setLoading(true); // Show loading overlay
        setMessage({ type: '', text: '' }); // Clear previous messages

        const data = {
            serviceName,
            pricePerHour,
            description,
            contactNumber,
            selectedOption,
            contactPerson: user.fullName,
            email: user?.primaryEmailAddress.emailAddress,
            address,
            images,
        };

        try {
            const response = await GlobalApi.addService(data);
            if (response === "success") {
                setMessage({ type: 'success', text: 'Service saved successfully!' });
                setTimeout(() => {
                    navigation.goBack();
                }, 2000);
            } else {
                throw new Error('Failed to save service');
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred while saving the service' });
        } finally {
            setLoading(false); // Hide loading overlay
        }
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
                    placeholder="Address"
                    value={address}
                    onChangeText={setAddress}
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
                            <Picker.Item key={0} label={''} value={""} />
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

                {message.text ? (
                    <Text style={message.type === 'success' ? styles.successMessage : styles.errorMessage}>
                        {message.text}
                    </Text>
                ) : null}
            </ScrollView>

            <TouchableOpacity onPress={handleSubmit} style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Confirm & Save</Text>
            </TouchableOpacity>

            {/* Loading overlay */}
            <LoadingOverlay visible={loading} />
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
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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
    successMessage: {
        color: 'green',
        textAlign: 'center',
        marginTop: 10,
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
});
