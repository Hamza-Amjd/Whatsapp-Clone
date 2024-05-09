import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";


const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Updates",
          headerLargeTitle: true,
          headerShadowVisible: false,
          headerStyle:{backgroundColor:Colors.background},
          headerTitleStyle:{fontSize:24,fontWeight:"700",color:'rgba(1,1,1,0.7)'},
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
          statusBarColor:'#000000',
          }
        }
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
});

export default _layout;
