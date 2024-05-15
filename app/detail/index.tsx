import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withTiming,
  withRepeat,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

type CommentType = {
  comment: string;
  name: string;
};

type ImageDetailType = {
  id: string;
  image: string;
  like: number;
  name: string;
  comments: CommentType[];
};

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

const ImageDetailScreen = () => {
  const { id, image } = useLocalSearchParams();
  const [imageDetailData, setImageDetailData] = useState<ImageDetailType>();
  const [isLoading, setIsLoading] = useState(true);

  // Testing
  const [newDimensions, setNewDimensions] = useState({ width: 0, height: 0 });

  const getImageDetailData = async () => {
    try {
      const res = await fetch(
        `https://gallery-api.baradeveloper.com/gallery/${id}`
      );
      const resData: ImageDetailType = await res.json();
      if (resData.id === "339caf3c-7fbe-4861-b13a-01da3c3225a2") {
        resData.image =
          "https://gallery-api.baradeveloper.com/static/images/beautiful-scenery.jpeg";
      }
      setImageDetailData(resData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getImageDetailData();
    // @ts-ignore
    Image.getSize(image, (originalWidth, originalHeight) => {
      const { width, height } = resizeImage(
        originalWidth,
        originalHeight,
        windowDimension.width
      );
      setNewDimensions({ width, height });
    });
  }, [id]);

  const totalComments = imageDetailData?.comments.length;

  {
    isLoading && <Text className=" text-5xl font-pmedium">Loading..</Text>;
  }

  return (
    <>
      <View className=" w-[40px] h-[40px]  rounded-full bg-secondary-100/70 left-3 justify-center items-center top-12  absolute z-20">
        <Link className="" href={"/"}>
          <Ionicons
            size={22}
            name="chevron-back-outline"
            color={"#fff"}
            className=" w-full z-30"
          />
        </Link>
      </View>
      <SafeAreaView className=" bg-secondary-100 flex-1 relative">
        <ScrollView className="flex-1">
          <Image
            // @ts-ignore
            source={{ uri: image }}
            className="  shadow-2xl "
            resizeMode="contain"
            style={{
              width: newDimensions.width,
              height: newDimensions.height,
            }}
          />
          <View className={`h-[500px] bg-secondary-200 w-full `}>
            <View className=" min-h-[50px]  p-3 border-b border-gray-100">
              {isLoading ? (
                <View className=" h-[40px] rounded-xl w-[300px] bg-slate-600/90"></View>
              ) : (
                <Text className=" text-gray-200 text-xl font-pmedium">
                  {imageDetailData?.name}
                </Text>
              )}
            </View>
            <View className=" p-3">
              {isLoading ? (
                <View className=" w-full h-[40px] bg-gray-400/50 rounded-lg"></View>
              ) : (
                <Text className=" text-gray-300 text-2xl font-pregular">
                  {totalComments} komentar
                </Text>
              )}
              {isLoading ? (
                <View className=" w-full bg-gray-400 h-[250px] overflow-hidden mt-4 rounded-md"></View>
              ) : (
                <FlatList
                  data={imageDetailData?.comments}
                  scrollEnabled={false}
                  className=""
                  renderItem={({ item }) => (
                    <View className=" min-h-[50px] items-center p-1 mt-2  flex-row">
                      <View className=" min-h-[45px] items-center justify-center bg-slate-700 w-[45px] rounded-full">
                        <Ionicons
                          size={28}
                          name="person-outline"
                          color={"white"}
                          className=" w-full h-[30px] z-30"
                        />
                      </View>
                      <View className=" flex-1 ml-2">
                        <Text className=" text-white text-lg font-pregular">
                          {item.name}
                        </Text>
                        <Text className=" text-gray-200 text-sm font-plight">
                          {item.comment}
                        </Text>
                      </View>
                    </View>
                  )}
                />
              )}
            </View>
          </View>
          <StatusBar backgroundColor="black" />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animatedView: {
    marginTop: windowDimension.height - 50,
    position: "absolute", // Adjust to be below the fixed image
  },
  shimmer: {
    width: 350,
    height: 350,
    backgroundColor: "rgba(255,255,255,0.5)",
    position: "absolute",
    top: 0,
    left: 0,
  },
  content: {
    height: 500, // Adjust as needed for scrolling content
  },
});

export default ImageDetailScreen;
