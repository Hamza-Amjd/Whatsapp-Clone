import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import EnhancedImageViewing from 'react-native-image-viewing/dist/ImageViewing';
import Colors from '@/constants/Colors';

const CustomImageMessage = ({props}:any) => {


  const [imageModalVisible, setImageModalVisible] = useState(false);
        return (
          <View style={{ borderRadius: 15, padding: 2 }}>
            <TouchableOpacity
              onPress={() => {
                setImageModalVisible(true);
              }}
            >
              <Image
                resizeMode="contain"
                style={styles.messageImg}
                source={{ uri: props.currentMessage.image}}
              />
              
                <EnhancedImageViewing
                  backgroundColor={Colors.background}
                  imageIndex={0}
                  visible={imageModalVisible}
                  onRequestClose={() => setImageModalVisible(false)}
                  images={[{ uri: props.currentMessage.image }]}
                  swipeToCloseEnabled
                />
            </TouchableOpacity>
          </View>
  )
}

export default CustomImageMessage

const styles = StyleSheet.create({
    messageImg:{
      width: 200,
      height: 200,
      padding: 6,
      borderRadius: 15,
      resizeMode: "cover",
    }
})