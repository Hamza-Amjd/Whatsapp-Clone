import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Stack, router } from "expo-router";
import { Entypo,Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
const page = () => {
  const progress = useRef(new Animated.Value(0)).current;

  const animateProgress = () => {
    Animated.timing(progress, {
      toValue: 100,
      duration: 5000,
      useNativeDriver: false,
    }).start(({finished})=>{
      if(finished)
        router.back();
    });
  };
  useEffect(() => {
    return animateProgress();
  }, [])
  
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Animated.View 
        style={[
          {
            height: 5,
            backgroundColor: "white",
            borderRadius: 15,
          },{
            width: progress.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
              extrapolate: "clamp",
            }),
          }
        ]}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          padding: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>
        <Image
          source={{
            uri: "https://cdn.discordapp.com/attachments/733131581472112733/1221362885809148006/IMG_20230906_235517_996.jpg?ex=662dfd53&is=661b8853&hm=706a79ce9a1404c0af2eb061701e07eb07ce7b71d1fad2ff474b96e492c24d55&",
          }}
          style={{ width: 40, height: 40, borderRadius: 100 }}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "white",
          }}
        >
          Hamza Amjad
        </Text>
      </View>
      <Image
        style={{ flex: 1 }}
        source={require("@/assets/images/madinah.jpg")}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: "400",
          color: "white",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        My status
      </Text>
      <TouchableOpacity
        style={{
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Entypo name="chevron-up" size={24} color="white" />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: "white",
            textAlign: "center",
          }}
        >
          Reply
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default page;

const styles = StyleSheet.create({});
