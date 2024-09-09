import { View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import ServiceActions from './ServiceActions'
import Heading from './../../Common/Heading'
import { useUser } from '@clerk/clerk-expo'
import GlobalApi from './../../Utils/GlobalApi'
import ActiveService from './ActiveService'
import Colors from '../../Utils/Colors'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import CustomModal from '../../Common/CustomModal'
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';

export default function MyServiceScreen() {

    const navigation = useNavigation()

    // Get screen dimensions
    const { height: screenHeight } = Dimensions.get('window');

    const [services, setServices] = useState()
    const [isModalVisible, setModalVisible] = useState(false)
    const [modalService, setModalService] = useState()
    const {user} = useUser()

    useEffect(() => {
        getServiceByUserEmail()
    }, [user, services])

    const showModal = (serviceToView) => {
        setModalService(serviceToView)
        setModalVisible(true)
    }

    const getServiceByUserEmail = () => {
        GlobalApi.getServicesByUserEmail(user?.primaryEmailAddress.emailAddress)
        .then(resp => {
            setServices(resp?.serviceLists)
        })
    }

    const deleteServiceById = (id) => {
        GlobalApi.deleteServiceById(id).then(resp => {
            if(resp === 'success'){
                setModalVisible(false)
                showMessage({
                    message: "Service deleted successfully",
                    type: "success",
                  });
            }else{
                showMessage({
                    message: "An error occured while trying to delete the service please try again",
                    type: "danger",
                  });
            }
        })
    }

    const updateServiceStatus = (status, serviceId) => {
        GlobalApi.updateServiceStatus(serviceId, status)
        .then(resp => {
            if(resp === 'success'){
                setModalVisible(false)
                showMessage({
                    message: `Service ${status}`,
                    type: "success",
                  });
            }else{
                showMessage({
                    message: "An error occured while trying to update the service status please try again",
                    type: "danger",
                  });
            }
        })
    }
  return (
    <View style={{backgroundColor: Colors.WHITE, flex: 1}}>
        {/* heading section  */}
        <View style={{padding: 20, paddingBottom: 0, marginTop: 20}}>
            <Heading text={'My Services'} />
        </View>
        
        {/* add service and brows order button section  */}
        <ServiceActions />
        <ScrollView>

            {/* active service section  */}
            <View style={{padding: 20, paddingBottom: 0}}>
                <Heading text={'Active Services'} />
                <View>
                    <FlatList 
                    data={services}
                    renderItem={({item, index}) => (
                        <ActiveService service={item} onClick={showModal} />
                    )}
                    />
                </View>
            </View>
        </ScrollView>

        {/* floating button section  */}
        <TouchableOpacity onPress={()=>navigation.push('add-service')} style={styles.floatingAddBtn}>
            <FontAwesome6 name="add" size={35} color={Colors.WHITE} />
        </TouchableOpacity>

        {/* Modal section for service action  */}
        <CustomModal visible={isModalVisible} height={screenHeight * .6} onClose={setModalVisible} title={modalService?.name}>
            <View style={styles.modalBtnContainer}>
                <TouchableOpacity style={styles.deleteBtn} 
                    onPress={() => deleteServiceById(modalService?.id)}
                >
                    <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>

                {modalService?.serviceStatus === 'active'?<TouchableOpacity style={styles.disableBtn} 
                    onPress={() => updateServiceStatus('disabled', modalService?.id)}
                >
                    <Text style={styles.disableText}>Disble</Text>
                </TouchableOpacity> :
                <TouchableOpacity style={styles.enableBtn} onPress={() => updateServiceStatus('active', modalService?.id)}>
                    <Text style={styles.enableText}>Enable</Text>
                </TouchableOpacity>}
            </View>

        </CustomModal>
        <FlashMessage position="bottom"/>
    </View>
  )
}

const styles = StyleSheet.create({
    floatingAddBtn: {
        backgroundColor: Colors.PRIMARY,
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 20, // Distance from the bottom of the screen
        right: 20,  // Distance from the right of the screen
        borderRadius: 20,
        padding: 15,
        elevation: 5, // Add elevation for shadow effect on Android
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
        shadowOpacity: 0.25, // Shadow opacity for iOS
        shadowRadius: 3.84, // Shadow radius for iOS
    },
    
    modalBtnContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        paddingHorizontal: 30
    },

    disableBtn: {
        padding: 10,
        paddingHorizontal: 30,
        backgroundColor: Colors.BLACK,
        borderRadius: 99,
    },

    disableText: {
        color: Colors.WHITE,
        fontFamily: 'outfit',
        fontSize: 17
    },

    enableBtn: {
        padding: 10,
        paddingHorizontal: 30,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 99,
    },

    enableText: {
        color: Colors.WHITE,
        fontFamily: 'outfit',
        fontSize: 17
    },

    deleteBtn: {
        padding: 10,
        paddingHorizontal: 30,
        backgroundColor: Colors.WARNING,
        borderRadius: 99,
    },

    deleteText: {
        color: Colors.WHITE,
        fontFamily: 'outfit',
        fontSize: 17
    }

})
