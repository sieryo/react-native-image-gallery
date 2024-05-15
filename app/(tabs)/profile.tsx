import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSession } from '@/hooks/useSession'
import { router } from 'expo-router'
import SignInForm from '@/components/SignInForm'
import useAuthStore from '@/hooks/useAuthStore'
import CustomButton from '@/components/CustomButton'
import { showToast } from '@/lib/showToast'

const Profile = () => {
  const {token, loadToken, removeToken} = useAuthStore()

  const signOut = () => {
    removeToken();
    showToast("info", "Anda telah logout")
  }

  useEffect(() => {
    loadToken()
  },[loadToken])

  if(!token) {
    return (
      <SignInForm />
    )
  };

  return (
    <SafeAreaView>
      <Text>{token}</Text>
      <CustomButton 
      title='Logout'
      handlePress={signOut}
      />
    </SafeAreaView>
  )
}

export default Profile