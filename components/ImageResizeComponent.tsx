import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { resizeImage } from "@/app/detail";
import { DataImage } from "@/app/(tabs)";
import { useNavigation } from "@react-navigation/native";

const windowDimension = Dimensions.get("window");

const ImageResizeComponent = ({ id, image, name }: DataImage) => {
  const [newDimensions, setNewDimensions] = useState({ width: 0, height: 0 });
  const navigation = useNavigation();


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
      <TouchableOpacity
        onPress={() =>
          // @ts-ignore
          navigation.navigate("detail", {id,image,name})
        }
      >
        <Image
          source={{ uri: image }}
          className=" w-full h-full rounded-lg"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ImageResizeComponent;
