import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import React, { ReactElement, useState } from "react";
import useAlertConfirm from "@/hooks/useAlertConfirm";
import { Ionicons } from "@expo/vector-icons";

type AlertConfirm = {
  title: string;
  buttonTitle: string
};

const AlertConfirm = ({ title,buttonTitle }: AlertConfirm) => {
  const { isClosed, callback, setCallback, toggleIsClosed } = useAlertConfirm();

  if (isClosed) {
    console.log("testing jika true");
    return;
  } else {
    return (
      <>
        <TouchableWithoutFeedback onPress={toggleIsClosed}>
          <View className=" absolute bottom-0 z-20 w-full min-h-screen bg-secondary-200/40"></View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={toggleIsClosed}>
          <View className=" absolute bottom-[150px] items-center justify-center right-[20px] rounded-full w-[45px] h-[45px] z-20 bg-primary">
            <Ionicons size={32} name="close-outline" color={"#1f2937"} />
          </View>
        </TouchableWithoutFeedback>
        <View className=" w-full h-[140px] z-50 bg-primary/90 rounded-t-2xl bottom-0 absolute">
          <View className=" w-full h-full p-2 px-4 pt-4">
            <Text className=" text-xl font-psemibold">{title}</Text>
            <TouchableOpacity
            onPress={() => {
                callback()
                setCallback(() => {})
            }}
            >
                <View className=" w-full min-h-[50px] bg-red-600 rounded-full items-center justify-center mt-3"><Text className=" text-primary font-psemibold text-base ">{buttonTitle}</Text></View>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
};

export default AlertConfirm;
