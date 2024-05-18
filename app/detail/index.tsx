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

import { Ionicons } from "@expo/vector-icons";
import { resizeImage } from "@/components/ImageResizeComponent";
import RenderComment from "@/components/RenderComment";

export type CommentType = {
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
const DetailImageScreen = () => {
  const windowDimension = Dimensions.get("window");
  const { id, image } = useLocalSearchParams();

  const [detailImageData, setDetailImageData] = useState<ImageDetailType>();
  const [isLoading, setIsLoading] = useState(true);
  const [newDimensions, setNewDimensions] = useState({ width: 0, height: 0 });

  const getDetailImageData = async () => {
    try {
      const res = await fetch(
        `https://gallery-api.baradeveloper.com/gallery/${id}`
      );
      const resData: ImageDetailType = await res.json();
      if (resData.id === "339caf3c-7fbe-4861-b13a-01da3c3225a2") {
        resData.image =
          "https://gallery-api.baradeveloper.com/static/images/beautiful-scenery.jpeg";
      }
      setDetailImageData(resData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDetailImageData();
    // @ts-ignore
    Image.getSize(image, (originalWidth, originalHeight) => {
      const { width, height } = resizeImage(
        originalWidth,
        originalHeight,
        windowDimension.width
      );
      setNewDimensions({ width, height });
    });
  }, []);

  const totalComments = detailImageData?.comments.length;

  {
    isLoading && <Text className=" text-5xl font-pmedium">Loading....</Text>;
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
      <SafeAreaView className=" bg-slate-100 flex-1 relative">
        <ScrollView className="flex-1" overScrollMode="never">
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
          <View className={`h-[500px] bg-primary w-full `}>
            <View className=" min-h-[50px]  p-3 border-b border-gray-100">
              {isLoading ? (
                <>
                  <View className=" h-[40px] rounded-xl w-[300px] bg-gray-400/50"></View>
                  <View className=" h-[20px] mt-4 rounded-xl w-[100px] bg-gray-400/50"></View>
                </>
              ) : (
                <>
                  <Text className=" text-secondary-200 text-2xl font-pmedium">
                    {detailImageData?.name}
                  </Text>
                  <View className=" flex-row px-1 mt-2">
                    <Ionicons
                      size={20}
                      name="heart-sharp"
                      color={"#C40C0C"}
                      className=" w-full "
                    />
                    <Text className=" text-secondary-200 ml-1 text-md font-pregular">
                      {detailImageData?.like}
                    </Text>
                  </View>
                </>
              )}
            </View>
            <View className=" p-3">
              {isLoading ? (
                <View className=" w-full h-[40px] bg-gray-400/50 rounded-lg"></View>
              ) : (
                <Text className=" text-secondary-200 text-xl font-pregular">
                  {totalComments} komentar
                </Text>
              )}
              {isLoading ? (
                <View className=" w-full bg-gray-400/50 h-[250px] overflow-hidden mt-4 rounded-md"></View>
              ) : (
                <FlatList
                  data={detailImageData?.comments}
                  scrollEnabled={false}
                  className=""
                  renderItem={({ item }) => <RenderComment {...item} />}
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

export default DetailImageScreen;
