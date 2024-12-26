import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import VideoModal from "./VideoModal";
import * as VideoThumbnails from "expo-video-thumbnails";
import { Ionicons } from "@expo/vector-icons";

const VideoMessageBox = ({ props }: any) => {
  const [videoModalVisible, setVideoModalVisible] = React.useState(false);
  const [image, setImage] = React.useState<string | null>(null);
  useEffect(() => {
    generateThumbnail();
  }, [props.currentMessage.video]);

  const generateThumbnail = async () => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        props.currentMessage.video,
        {
          time: 15000,
        }
      );
      setImage(uri);
    } catch (e) {
      console.warn(e);
    }
  };
  return (
    <View style={{ borderRadius: 15, padding: 2 }}>
      <TouchableOpacity
        onPress={() => {
          setVideoModalVisible(true);
        }}
        style={styles.imgContainer}
      >
        <View
          style={styles.playIcon}
        >
          <Ionicons name="play" color={"white"} size={40} />
        </View>
        {image && (
          <Image
            resizeMode="contain"
            style={styles.thumbnail}
            source={{ uri: image }}
          />
        )}
      </TouchableOpacity>
      {videoModalVisible && (
        <VideoModal
          onRequestClose={() => setVideoModalVisible(false)}
          videoUri={props.currentMessage.video}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    imgContainer:{
        width: 200,
        height: 200,
        borderRadius: 15,
        backgroundColor: "black",
      },
    playIcon: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
      },
      thumbnail:{
        flex: 1,
        padding: 6,
        borderRadius: 15,
        resizeMode: "cover",
      },
  
});

export default VideoMessageBox;
