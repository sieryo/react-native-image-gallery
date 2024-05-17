import { View, Text, ScrollView, TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "./CustomButton";
import { showToast } from "@/lib/showToast";
import { StatusBar } from "expo-status-bar";
import apiBaseUrl from "@/constants/api";

import { type UserProfile } from "@/app/(tabs)/profile";
import { Ionicons } from "@expo/vector-icons";
import ConfirmAlert from "./ConfirmAlert";
import useConfirmAlert from "@/hooks/useConfirmAlert";
import ActionButton from "./ActionButton";

const ProfileComponent = ({
  token,
  removeToken,
}: {
  token: string;
  removeToken: () => void;
}) => {
  const { setCallback, toggleIsClosed } = useConfirmAlert();
  const [profileData, setProfileData] = useState<UserProfile>();
  const [isLoading, setIsLoading] = useState(true);

  const getProfileData = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/profile`, {
        headers: {
          Authorization: token,
        },
      });
      const resData: UserProfile = await res.json();
      setProfileData(resData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const signOut = () => {
    removeToken();
    showToast("info", "Anda telah logout");
  };
  return (
    <>
      <ConfirmAlert
        buttonTitle="Logout"
        title="Apakah kamu yakin ingin logout?"
      />

      <SafeAreaView className=" flex-1 bg-primary">
        <ScrollView>
          <View className=" flex-row w-full min-h-[120px] p-2 pt-6 border-b border-b-secondary-100/50">
            <View className=" w-[60px] h-[60px] bg-slate-200 rounded-full"></View>
            <View className=" ml-2 flex-1">
              {isLoading ? (
                <>
                  <View className=" w-[220px] h-[35px] rounded-lg bg-slate-400/50"></View>
                  <View className=" w-[220px] h-[15px] mt-3 rounded-lg bg-slate-400/50"></View>
                  <View className=" w-[180px] h-[15px] mt-2 rounded-lg bg-slate-400/50"></View>
                </>
              ) : (
                <>
                  <Text className=" text-2xl font-pbold text-secondary">
                    {profileData?.name}
                  </Text>
                  <Text className=" text-md font-pregular text-secondary-200">
                    {profileData?.address}
                  </Text>
                </>
              )}
            </View>
          </View>
          <Text className=" font-pregular text-md px-2 mt-2">Akun</Text>
          <ActionButton
            title="Logout"
            description=" Jika kamu logout, kamu harus memasukkan username dan
          password lagi."
            confirmAlertTitle="Apakah kamu yakin ingin logout?"
            callback={signOut}
          >
            <Ionicons size={34} name="log-out-outline" />
          </ActionButton>
          <StatusBar backgroundColor="black" />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ProfileComponent;
