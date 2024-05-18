import { View, Text, TouchableWithoutFeedback } from "react-native";
import React, { ComponentProps, PropsWithChildren, ReactElement } from "react";
import { Ionicons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import useConfirmAlert from "@/hooks/useConfirmAlert";

type ActionButton = PropsWithChildren<{
  title: string;
  description: string;
  children: ReactElement;
  callback: () => void;
  confirmAlertTitle: string;
}>;

const ActionButton = ({
  title,
  description,
  children,
  callback,
  confirmAlertTitle,
}: ActionButton) => {
  const { setCallback, toggleIsClosed } = useConfirmAlert();

    const handlePress = () => {
        toggleIsClosed()
        setCallback(callback)
    }
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View className=" w-full h-[90px]  flex-row">
        <View className=" w-[50px] pt-3 items-center ">{children}</View>
        <View className=" flex-grow flex-row justify-between border-b border-gray-300">
          <View className="pt-2 flex-1">
            <Text className=" text-lg  font-pregular text-secondary">
              {title}
            </Text>
            <Text className=" text-xs  font-plight text-secondary-200">
              {description}
            </Text>
          </View>
          <View className=" w-[40px] items-center justify-center ">
            <Ionicons size={28} name="chevron-forward-outline" />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ActionButton;
