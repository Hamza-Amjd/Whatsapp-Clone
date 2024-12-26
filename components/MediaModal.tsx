import { Image, KeyboardAvoidingView, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { ResizeMode, Video } from 'expo-av'
import Colors from '@/constants/Colors'

type mediaModalProps={
  selectedMedia: { type: string; uri: string },
  onClose: () => void,
  sendMedia:any,
}

const MediaModal = ({selectedMedia,onClose,sendMedia}:mediaModalProps) => {
  
  const [mediaCaption, setMediaCaption] = useState("");
  return (
    <Modal animationType="slide" visible={true} statusBarTranslucent>
          <View
            style={{
              flex: 1,
              backgroundColor: "#000",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{ position: "absolute", right: 10, top: 50, zIndex: 10 }}
              onPress={onClose}
            >
              <Ionicons name="close-circle" size={40} color={"#fff"} />
            </TouchableOpacity>
            {selectedMedia.type == "image" ? (
              <Image
                source={{ uri: selectedMedia.uri }}
                style={{ width: "100%", height: "90%", resizeMode: "contain" }}
              />
            ) : (
              <Video
                source={{ uri: selectedMedia.uri }}
                style={{ width: "100%", height: "90%" }}
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                isLooping
                shouldPlay
              />
            )}
            <KeyboardAvoidingView
              enabled
              focusable
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 20,
                gap: 10,
              }}
            >
              <TextInput
                placeholder="Caption..."
                style={styles.textinput}
                onChangeText={setMediaCaption}
                value={mediaCaption}
              />

              <TouchableOpacity
                onPress={() =>
                  sendMedia(selectedMedia.uri, selectedMedia.type,mediaCaption)
                }
              >
                <Ionicons name="send-sharp" size={37} color={Colors.muted} />
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </Modal>
  )
}

const styles = StyleSheet.create({
  textinput: {
    backgroundColor: "white",
    width: "95%",
    height: 45,
    paddingHorizontal: 10,
    borderRadius: 15,
    fontSize: 16,
  },
})

export default MediaModal;