import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSession } from '@/hooks/useSession'
import { router } from 'expo-router'
import SignInForm from '@/components/SignInForm'
import useAuthStore from '@/hooks/useAuthStore'
import CustomButton from '@/components/CustomButton'
import { showToast } from '@/lib/showToast'
import ProfileComponent from '@/components/ProfileComponent'



const Profile = () => {
  const {token, removeToken, loadToken} = useAuthStore()

 

  useEffect(() => {
    loadToken()
  },[loadToken])

  if(!token) {
    return (
      <SignInForm />
    )
  };

  return (
    <ProfileComponent 
      token={token}
      removeToken={removeToken}
    />
  )
}

export default Profile