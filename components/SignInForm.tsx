import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import FormField from "./FormField";
import CustomButton from "./CustomButton";
import useAuthStore from "@/hooks/useAuthStore";
import apiBaseUrl from "@/constants/api";
import { showToast } from "@/lib/showToast";

const SignInForm = () => {
  const {setToken} = useAuthStore()

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    try {

      const formData = new FormData();
      formData.append('username', form.username);
      formData.append('password', form.password);

      setIsSubmitting(true)
      const res = await fetch(`${apiBaseUrl}/login`, {
        method: "POST",
        body: formData, 
      })
      const status = await res.status;
      if (status == 200) {
        let {access_token, message} = await res.json();
        setToken(access_token);
        showToast("success", message);
      } else if (status == 401) {
        const {message} = await res.json();
        showToast("error", message);
      }

    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  };

  return (
    <>
      <SafeAreaView className=" bg-primary h-full flex-1">
        <ScrollView>
          <View className=" w-full justify-center px-4 py-6">
            <Text className=" text-5xl text-secondary-100 font-psemibold mt-2 mb-2 text-center">
              Hello
            </Text>
            <Text className=" text-xl text-center text-secondary-100 font-pmedium mt-2 mb-4">
              Log in to Sieryo Gallery
            </Text>
            <FormField
              title="Username"
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
            />
            <CustomButton
              title="Sign in"
              handlePress={submit}
              containerStyles=" mt-7"
              isLoading={isSubmitting}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignInForm;
