import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "./CustomButton";
import { showToast } from "@/lib/showToast";
import { StatusBar } from "expo-status-bar";
import apiBaseUrl from "@/constants/api";

const ProfileComponent = ({ token, removeToken }: {token: string, removeToken: () => void} ) => {
    const [profileData, setProfileData] = useState();

    const getProfileData = async () => {
        const res = await fetch(`${apiBaseUrl}/profile`, {
            headers: {
                "Authorization": token
            }
        })
        const resData = await res.json()
        console.log(resData)
    }   

    useEffect(() => {
        getProfileData()
    },[profileData])

  const signOut = () => {
    removeToken();
    showToast("info", "Anda telah logout");
  };
  return (
    <SafeAreaView>
      <Text>{token}</Text>
      <CustomButton  title="Logout" handlePress={signOut} />
      <StatusBar backgroundColor="black" />

    </SafeAreaView>
  );
};

export default ProfileComponent;
