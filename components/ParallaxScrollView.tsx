import { View, Text } from "react-native";
import React, { PropsWithChildren, ReactElement } from "react";

import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

type Props = PropsWithChildren<{
  title: string;
  headerImage: ReactElement;

  className?: string;
}>;

const HEADER_HEIGHT = 180;

const ParallaxScrollView = ({
  children,
  title,
  className,
  headerImage,
}: Props) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });
  return (
    <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
      <Animated.View
        style={[headerAnimatedStyle]}
        className={`h-[180px] overflow-hidden justify-center px-8 bg-secondary-100/90 `}
      >
        <Text className=" text-5xl p-2 text-gray-100 mt-12 font-pregular border-b border-b-gray-100">
          {title}
        </Text>
      </Animated.View>
      {children}
    </Animated.ScrollView>
  );
};

export default ParallaxScrollView;
