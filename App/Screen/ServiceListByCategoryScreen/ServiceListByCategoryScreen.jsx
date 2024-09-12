import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react'
import {useRoute } from '@react-navigation/native'
import GlobalApi from '../../Utils/GlobalApi';
import ServiceListItem from './ServiceListItem';
import Colors from '../../Utils/Colors';
import BackNavigation from '../../Common/BackNavigation';
import LoadingOverlay from '../../Common/LoadingOverlay';

export default function ServiceListByCategoryScreen() {
  // fetch category being sent
  const param = useRoute().params;

  const [serviceList, setServiceList] = useState([]);
  const [loading, setLoading] = useState(true);  // Add loading state
  const [errorMessage, setErrorMessage] = useState('No Service found')

  useEffect(() => {
    if (param) {
      getServiceListByCategory();
    }
  }, [param]);

  /**
   * fetch the service list for the category
   */
  const getServiceListByCategory = () => {
    setLoading(true);  // Start loading
    GlobalApi.getServiceListByCategory(param.category).then(resp => {
      setServiceList(resp.serviceLists);
      setLoading(false);  // End loading
    }).catch(() => {
      setErrorMessage('Something went wrong. Please check your internet connection and try again')
      setLoading(false);  // Ensure loading ends even if there is an error
    });
  };

  return (
    <View style={styles.container}>
      <BackNavigation title={param.category} />

      {loading ? (
        // loading overlay section 
        <LoadingOverlay visible={loading}/>
      ) : serviceList?.length > 0 ? (

        // Display results section 
        <FlatList 
          data={serviceList}
          nestedScrollEnabled={true}
          style={{marginTop: 15}}
          renderItem={({item, index}) => (
            <ServiceListItem service={item} />
          )}
        />
      ) : (
        <Text style={styles.noServiceText}>{errorMessage}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    flex: 1,  // Ensure full screen coverage
    backgroundColor: 'white'
  },
  noServiceText: {
    fontFamily: 'outfit',
    fontSize: 20,
    color: Colors.GREY,
    textAlign: 'center',
    marginTop: '50%',
  }
});
