import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

const AudioMessageBox = ({ props}: { props: any }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundPosition, setSoundPosition] = useState(0);
  const sound = new Audio.Sound();

  useEffect(() => {
    // Load audio when component mounts
    const loadAudio = async () => {
      await sound.loadAsync({ uri: props.currentMessage.audio });
    };

    loadAudio();

  }, [props.currentMessage.audio]); // Reload audio if the source changes

  const playAudio = async () => {
    if (isPlaying) {
      await sound.stopAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const updatePosition = async () => {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        setSoundPosition(status.positionMillis);
      }
    };

    const interval = setInterval(updatePosition, 1000); // Update position every second

    sound.setOnPlaybackStatusUpdate((status:any) => {
      if (status.didJustFinish) {
        setIsPlaying(false); // Set isPlaying to false when audio ends
      }
    });

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [sound]);

  return (
    <View style={styles.msgContainer}>
      <TouchableOpacity onPress={playAudio}>
        <Ionicons
          name={isPlaying ? "pause" : "play"}
          color={"grey"}
          size={30}
        />
      </TouchableOpacity>
      <Slider
        style={{ width: 200, height: 40 }}
        value={soundPosition}
        minimumValue={0}
        maximumValue={props.currentMessage.audioDuration}
        onValueChange={
            (value) => setSoundPosition(value)
        }
      />
    </View>
  );
};

export default AudioMessageBox;

const styles = StyleSheet.create({
  msgContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 20,
  },
});
