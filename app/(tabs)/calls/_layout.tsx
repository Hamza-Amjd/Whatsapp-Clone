import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";


const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Calls",
          headerLargeTitle: true,
          headerShadowVisible: false,
          headerStyle:{backgroundColor:Colors.background}
        }}
      />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
