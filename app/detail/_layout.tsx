import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useRoute } from '@react-navigation/native';

const ImagesLayout = () => {
  const route = useRoute();

  // @ts-ignore
  const imageData = route.params;

  return (
    <Stack>
        <Stack.Screen name='index' options={{headerShown: false}} initialParams={imageData} />
        {/* <Stack.Screen name='index' options={{headerShown: true}} /> */}
    </Stack>
  )
}

export default ImagesLayout