import { View, Text, ScrollView,  TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "./CustomButton";
import { showToast } from "@/lib/showToast";
import { StatusBar } from "expo-status-bar";
import apiBaseUrl from "@/constants/api";

import { type UserProfile } from "@/app/(tabs)/profile";
import { Ionicons } from "@expo/vector-icons";

const ProfileComponent = ({
  token,
  removeToken,
}: {
  token: string;
  removeToken: () => void;
}) => {
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
  }, [profileData]);

  const signOut = () => {
    removeToken();
    showToast("info", "Anda telah logout");
  };
  return (
    <SafeAreaView className=" flex-1 bg-primary">
      <ScrollView>
        <View className=" flex-row w-full min-h-[120px] p-2 pt-6 border-b border-b-secondary-100/50">
          <View className=" w-[60px] h-[60px] bg-slate-200 rounded-full"></View>
          <View className=" ml-2 flex-1">
            <Text className=" text-2xl font-pbold text-secondary">{profileData?.name}</Text>
            <Text className=" text-md font-pregular text-secondary-200">
              {profileData?.address}
            </Text>
          </View>
        </View>
        <Text className=" font-pregular text-md px-2 mt-2">Akun</Text>
          {/* Action Button, nanti dijadikan Reusable Component. Belum kepikiran nama. */}
        <TouchableWithoutFeedback
        onPress={signOut}
        >
          <View className=" w-full h-[90px]  flex-row">
            <View className=" w-[50px] pt-3 items-center ">
              <Ionicons size={34} name="log-out-outline" />
            </View>
            <View className=" flex-grow flex-row justify-between border-b border-gray-300">
              <View className="pt-2 flex-1">
                <Text className=" text-lg  font-pregular text-secondary">Logout</Text>
                <Text className=" text-xs  font-plight text-secondary-200">
                  Anda yakin ingin logout? Anda harus memasukkan username dan
                  password lagi.
                </Text>
              </View>
              <View className=" w-[40px] items-center justify-center ">
                <Ionicons size={28} name="chevron-forward-outline" />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
          {/* Action Button selesai disini. */}
        <StatusBar backgroundColor="black" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileComponent;
