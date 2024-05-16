import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { DataImage } from "@/app/(tabs)";
import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";

export const resizeImage = (
    originalWidth: number,
    originalHeight: number,
    newWidth: number
  ) => {
    const aspectRatio = originalHeight / originalWidth;
    const newHeight = newWidth * aspectRatio;
    return { width: newWidth, height: Math.round(newHeight) };
  };

const windowDimension = Dimensions.get("window");

const ImageResizeComponent = ({ id, image, name }: DataImage) => {
  const [newDimensions, setNewDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // @ts-ignore
    Image.getSize(image, (originalWidth, originalHeight) => {
      const { width, height } = resizeImage(
        originalWidth,
        originalHeight,
        windowDimension.width / 2
      );
      setNewDimensions({ width, height });
    });
  }, []);

  return (
    <View
      style={{
        width: newDimensions.width,
        height: newDimensions.height,
        padding: 4,
      }}
    >
      <Image
        source={{ uri: image }}
        className=" w-full h-full rounded-lg  "
        resizeMode="contain"
      />
    </View>
  );
};

export default ImageResizeComponent;
