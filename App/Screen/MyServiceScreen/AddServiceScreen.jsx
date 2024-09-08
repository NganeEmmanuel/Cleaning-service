import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import BackNavigation from './../../Common/BackNavigation';
import { Picker } from '@react-native-picker/picker';
import Colors from '../../Utils/Colors';
import GlobalApi from '../../Utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo';

/**
 * Todo for GPT. Please implement the following
 * 
 * 1. Make sure that, when the user clicks the "confirm & save" button, a loading screen is displayed over the content.
 * 2. if the save is sucessfull, you will display a success message in green text and after two seconds, go back to the previous screen (that is call navigation.goBack())
 * 3. if not successfull or there is any error, you will display an appropriate error to fit the situations
 * 
 * You will design the load screen as foollows:
 * - It will have an opacity of .5 so that the main components of this page are still visble but can't be interacted with
 * - it will cover the entire screean and cannot be closed
 * - it will have a background color of white
 * - it will have a loading spinner icon at the center withe text underneath saying "Verifying & Saving Service now..."
 * - it will be above all other elements.
 * - let it be a new component on its own that we can reuse in other place. Use props if need be to make it functional
 * 
 */
export default function AddServiceScreen() {
    const [serviceName, setServiceName] = useState('');
    const [pricePerHour, setPricePerHour] = useState('');
    const [description, setDescription] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [images, setImages] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [categories, setCategories] = useState([])
    const [address, setAddress] = useState('')
    const {user} = useUser();

    useEffect(() => {
        GlobalApi.getCategories().then(resp => {
            setCategories(resp?.categories)
        })
    }, [categories])

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });
    
        if (!result.canceled && result.assets) {
            const selectedImages = result.assets.map(img => ({
                uri: img.uri, // Required by your backend
                filename: img.fileName,
                type: img.mimeType, // Optional, include if needed
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

    const handleSubmit = () => {
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

        /**
         * TODO for you GPT. I want you to check the values and make sure of the following
         * 
         * 1. Only Valid strings can be entered in for the input [service name]
         * 2. Only Valid positive decimals can be entered in for the input [price per hourse]
         * 3. Only a valid 9-digit number can be entered for the input [Contact Number]
         * 4. the value of selected option must not be empty or blank
         * 5. Atleast one image must be added
         */
       if(GlobalApi.addService(data) === "success"){
            //implement for success
       }else{
            //implement for unsuccessfu
       }
    //    console.log(images)
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
