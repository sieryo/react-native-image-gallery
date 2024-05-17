import {
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useEffect, useState } from "react";

import { images } from "@/constants";
import { Link, useNavigation } from "expo-router";
import apiBaseUrl from "@/constants/api";
import ImageResizeComponent from "@/components/ImageResizeComponent";
import useAuthStore from "@/hooks/useAuthStore";

export type DataImage = {
  id: string;
  image: string;
  name: string;
};

const windowDimentions = Dimensions.get("window");

const GalleryScreen = () => {
  const {loadToken} = useAuthStore()
  const [dataImages, setDataImages] = useState<DataImage[]>();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const getDataImages = async () => {
    try {
      console.log("TESTING");
      const res = await fetch(`${apiBaseUrl}/gallery`);
      const json: DataImage[] = await res.json();
      json[1].image =
        "https://gallery-api.baradeveloper.com/static/images/beautiful-scenery.jpeg";
      setDataImages(json);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDataImages();
    // Cek apakah ada token atau tidak.
    loadToken();
  }, []);

  const leftColumnData = dataImages?.filter((_, index) => index % 2 !== 0);
  const rightColumnData = dataImages?.filter((_, index) => index % 2 === 0);

  return (
    <View className=" bg-primary flex-1">
      <ParallaxScrollView
        title="Galleries"
        headerImage={<Image source={images.testing} />}
      >
        <View className=" w-full flex-1 min-h-screen  bg-primary overflow-hidden flex-row flex-wrap ">
          {isLoading ? (
            <>
              <View className=" flex-1 p-1 space-y-1">
                <View className=" w-full h-[250px] bg-slate-400"></View>
                <View className=" w-full h-[200px] bg-slate-400"></View>
                <View className=" w-full h-[180px] bg-slate-400"></View>
              </View>
              <View className=" flex-1 p-1 space-y-1">
                <View className=" w-full h-[200px] bg-slate-400"></View>
                <View className=" w-full h-[190px] bg-slate-400"></View>
                <View className=" w-full h-[180px] bg-slate-400"></View>
              </View>
            </>
          ) : (
            <>
              <View className=" flex-1 ">
                {!isLoading &&
                  leftColumnData?.map((data) => (
                    <TouchableWithoutFeedback
                      onPress={() => {
                        console.log("woi halo ");

                        // @ts-ignore
                        navigation.navigate("detail", data);
                      }}
                      key={data.id}
                    >
                      <View>
                        <ImageResizeComponent {...data} />
                      </View>
                    </TouchableWithoutFeedback>
                  ))}
              </View>
              <View className=" flex-1">
                {!isLoading &&
                  rightColumnData?.map((data) => (
                    <TouchableWithoutFeedback
                      onPress={() => {
                        console.log("woi halo ");

                        // @ts-ignore
                        navigation.navigate("detail", data);
                      }}
                      key={data.id}
                    >
                      <View>
                        <ImageResizeComponent {...data} />
                      </View>
                    </TouchableWithoutFeedback>
                  ))}
              </View>
            </>
          )}
        </View>
      </ParallaxScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

export default GalleryScreen;
