import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useRoute } from '@react-navigation/native';

const DetailImageLayout = () => {
  const route = useRoute();


  return (
    <Stack>
        <Stack.Screen name='index' options={{headerShown: false}} initialParams={route.params} />
    </Stack>
  )
}

export default DetailImageLayout;
