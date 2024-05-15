import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const DetailScreen = () => {
  const route = useRoute();

  // @ts-ignore
  const test = route.params;

  console.log(test)
  return (
    <View className=' flex-1 bg-white-100'>
      <Text>detail</Text>
      
    </View>
  )
}

export default DetailScreen