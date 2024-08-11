import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import GlobalApi from '../../Utils/GlobalApi'
import Heading from '../../Common/Heading';

export default function Categories() {

    const [categories, setCategories] = useState([]);
    useEffect(() => {
      getCategories();
    }, [])

    /**
     * Get Category list function
     * Returns all the list of categories in the database(id, name, icons)
     */
    const getCategories=()=>{
        GlobalApi.getCategories().then(resp=>{
            setCategories(resp?.Categories)
        })
    }
  return (
    <View>
      <Heading text={'Categories'} />
    </View>
  )
}