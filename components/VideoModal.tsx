import React, { useState } from 'react';
import { Modal, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const VideoModal = ({ videoUri,onRequestClose }:{videoUri:string,onRequestClose:any}) => {

    return (
            <Modal
                animationType="slide"
                statusBarTranslucent
                transparent={true}
                visible={true}
                onRequestClose={onRequestClose}
            >
                <View style={styles.modalView}>
                    <Video
                        source={{ uri: videoUri }}
                        style={styles.video}
                        resizeMode={ResizeMode.CONTAIN}
                        useNativeControls
                        isLooping
                        shouldPlay
                    />
                    <TouchableOpacity  onPress={onRequestClose} style={styles.closeButton} >
                        <Ionicons name='close-circle' size={50} color={'#fff'}/>
                    </TouchableOpacity>
                </View>
            </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    video: {
        width: '100%',
        height: '80%',
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        right: 15,
        
    }
});

export default VideoModal;