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
} from "react-native";
import { StatusBar } from "expo-status-bar";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useEffect, useState } from "react";

import { images } from "@/constants";
import { Link } from "expo-router";
import apiBaseUrl from "@/constants/api";
import { useNavigation } from "@react-navigation/native";
import { resizeImage } from "../detail";
import ImageResizeComponent from "@/components/ImageResizeComponent";

export type DataImage = {
  id: string;
  image: string;
  name: string;
};

const windowDimentions = Dimensions.get("window");

const GalleryScreen = () => {
  const [dataImages, setDataImages] = useState<DataImage[]>();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const getDataImages = async () => {
    try {
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
  }, []);

  const leftColumnData = dataImages?.filter((_, index) => index % 2 !== 0);
  const rightColumnData = dataImages?.filter((_, index) => index % 2 === 0);

  return (
    <View className=" bg-primary flex-1">
      <ParallaxScrollView
        title="Gallery"
        headerImage={<Image source={images.testing} />}
      >
        <View className=" w-full flex-1 min-h-screen  bg-primary overflow-hidden flex-row flex-wrap ">
          <View className=" flex-1">
            {!isLoading &&
              leftColumnData?.map((data) => (
                <ImageResizeComponent key={data.id} {...data} />
              ))}
          </View>
          <View className=" flex-1">
            {!isLoading &&
              rightColumnData?.map((data) => (
                <ImageResizeComponent key={data.id} {...data} />
              ))}
          </View>

          {isLoading && <Text>Loading.....</Text>}

        </View>
      </ParallaxScrollView>
      <StatusBar backgroundColor="black" />
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
