import { Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AppleStyleSwipeableRow from "./AppleStyleSwipableRow";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import { useNavigation } from "expo-router";
import Avatar from "./Avatar";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import ImageView from "react-native-image-viewing";
import { format } from "date-fns";

type ListItemProps = {
  type: string;
  lastMessageSender: any|null;
  description: string|null;
  room: any;
  time: any|null;
  user: any;
  index: number;
  image: any | null;
};
const ListItem: React.FC<ListItemProps> = ({
  type,
  description,
  lastMessageSender,
  room,
  time,
  user,
  index,
  image,
}) => {
  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);
  const navigation = useNavigation<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageView, setSeletedImageView] = useState("");
  const {currentUser}= FIREBASE_AUTH;
  const handleTime = () => {
    const today=new Date();
    const chattime = new Date(time.seconds * 1000);
    if (chattime.toLocaleDateString()== today.toLocaleDateString()) {
      return format(chattime, "hh:mm a");
    } else {
      return new Date(time.seconds * 1000).toLocaleDateString();;
    }
  };
  return (
    <AppleStyleSwipeableRow>
      <AnimatedTouchableOpacity
        onPress={() => {
          navigation.navigate("chat", { user, room, image });
        }}
        entering={FadeInUp.delay(index * 20)}
        exiting={FadeInDown}
      >
        <View style={styles.listitem}>
          <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                    setSeletedImageView(user.photoURL);
                  }}
                ><Avatar user={type == "contacts" ?user?.userdoc:user} size={type === "contacts" ? 40 : 60} />
                  {selectedImageView ? (
                    <ImageView
                    backgroundColor={Colors.background}
                      imageIndex={0}
                      visible={modalVisible}
                      onRequestClose={() => setModalVisible(false)}
                      images={[{ uri: selectedImageView }]}
                      
                    />
                  ) : null}
                </TouchableOpacity>
            
            <View style={{flex:1,paddingVertical:3}}>
              <View style={{flexDirection:'row', flex:1, justifyContent:'space-between', alignItems:'baseline'}}>
                <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                }}
              >
                {user?.contactName || user?.displayName}
              </Text>
              {image&&<Text style={{color:Colors.muted,textDecorationLine:'underline',marginRight:8}}>Send</Text> }
              {time && (
            <Text
              style={{
                fontSize: 12,
                color:'grey'
              }}
            >
              {handleTime()}
            </Text>
          )}
              </View>
              
              {description && (
                <View style={{flexDirection:'row',alignItems:'center',gap:1}}>
                  {description=='Image'?<Ionicons name="image" size={15} color={Colors.gray}/>:lastMessageSender?.name==currentUser?.displayName && <Ionicons name="checkmark-done-outline" size={20} color="cyan" /> }
                  
                  <Text style={{ fontSize: 14, fontWeight: "400" ,alignItems:'baseline',color:Colors.gray}}>
                    {description.length > 40? `${description.substring(0, 40)}...`
                    : description}
                </Text>
                </View>
                
              )}
            </View>
          </View>

         
        </View>
      </AnimatedTouchableOpacity>
    </AppleStyleSwipeableRow>
  );
};

const styles = StyleSheet.create({
  listitem: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: Colors.primary,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
});

export default ListItem;
