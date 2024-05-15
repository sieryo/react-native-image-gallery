import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'


const SignIn = () => {
  return (
    <View className=' mt-10'>
      <Text>Ini adalah SignIn</Text>
      <Link href={"/"}>Kembali</Link>
    </View>
  )
}

export default SignIn