import { View, Text } from 'react-native'
import React from 'react'

import { type CommentType } from '@/app/detail'
import { Ionicons } from '@expo/vector-icons'

const RenderComment = ({comment,name} : CommentType) => {
  return (
    <View className=" min-h-[50px] items-center p-1 mt-2  flex-row">
    <View className=" min-h-[45px] items-center justify-center bg-slate-500 w-[45px] rounded-full">
      <Ionicons
        size={28}
        name="person-outline"
        color={"white"}
        className=" w-full h-[30px] z-30"
      />
    </View>
    <View className=" flex-1 ml-2">
      <Text className=" text-secondary-200 text-lg font-pregular">
        {name}
      </Text>
      <Text className=" text-secondary-100 text-sm font-plight">
        {comment}
      </Text>
    </View>
  </View>
  )
}

export default RenderComment