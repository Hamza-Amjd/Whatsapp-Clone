import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import React, { useState } from 'react'
import * as Haptics from "expo-haptics";
import {Audio} from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const AudioMessageRecordButton = ({sendMedia}:{sendMedia:any}) => {
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecordingModalVisible, setIsRecordingModalVisible] = useState(false);
  const startRecording = async () => {
        try {
          const { status } = await Audio.requestPermissionsAsync();
          if (status === 'granted') {
            const { recording } = await Audio.Recording.createAsync(
              Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); 
            setIsRecordingModalVisible(true);
          }
        } catch (error) {
          console.error("Failed to start recording:", error);
        }
      };
    
      const stopRecording = async () => {
        setRecording(null);
        if (recording) {
          await recording.stopAndUnloadAsync();
          const uri = recording.getURI();
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); 
            //   console.log("Recording stopped and stored at", uri);
          sendMedia(uri,"audio"); 
        }
        setIsRecordingModalVisible(false);
      };
  return (
    <View>
        <TouchableOpacity
        onPressIn={startRecording}
        onPressOut={stopRecording}
        >
      <Ionicons
       name="mic-outline"
       color={Colors.primary} // Stop recording on press out
       size={28}
       />
       </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="slide"
        visible={isRecordingModalVisible}
        onRequestClose={() => setIsRecordingModalVisible(false)}
      >
        <View style={styles.modalContainer}>
            <Ionicons
              name="mic-circle-outline"
              color={Colors.primary}
              size={60}
            />
          <Text style={styles.modalText}>Recording Audio...</Text>
        </View>
      </Modal>
    </View>
  )
}

export default AudioMessageRecordButton

const styles = StyleSheet.create({
    
  modalContainer: {
    width: "100%",
    height:80,
    position:'absolute',
    bottom:55,
    backgroundColor:'#FFFFFF',
    alignItems: 'center',
    flexDirection:'row',
    borderRadius:50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 20,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})