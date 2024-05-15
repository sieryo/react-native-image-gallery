import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";


type FormFieldProps = {
  title: string;
  value: any;
  handleChangeText: (e: any) => void;
  otherStyles?: string;
  placeholder?: string;
};

const FormField = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  placeholder,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`${otherStyles}`}>
      <Text className=" text-base text-gray-800 font-pmedium my-2">{title}</Text>
      <View className=" w-full h-14 px-4 bg-black-100 border border-black-200 rounded-2xl focus:border-blue-700 flex-row items-center">
        <TextInput
          className=" flex-1 text-gray-700 font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons color={"#1C3139"} size={28} name={!showPassword ? "eye" : "eye-off" } />
            </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
