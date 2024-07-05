import Colors from "@/constants/Colors";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { IMessage } from "react-native-gifted-chat";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

type ReplyMessageBarProps = {
  clearReply: () => void;
  message: IMessage | null;
};

const ReplyMessageBar = ({ clearReply, message }: ReplyMessageBarProps) => {
  const {currentUser}= FIREBASE_AUTH;
  const color = message?.user.name==currentUser?.displayName?"#89BC0C":Colors.muted;
  return (
    <>
      {message !== null && (
        <Animated.View
          style={{
            flexDirection: "row",
            backgroundColor: "#E4E9EB",
            bottom: 6,
          }}
          entering={FadeInDown}
          exiting={FadeOutDown}
        >
          <View style={{position:'absolute',left:0,height:60,width:5, backgroundColor: color }}/>
          <View style={{ justifyContent:'space-between'}}>
            <Text
              style={{
                color: color,
                paddingLeft: 10,
                paddingTop: 5,
                fontWeight: "600",
                fontSize: 15,
              }}
            >
              {message?.user.name==currentUser?.displayName?"You":message?.user.name}
            </Text>
            {message.image ? (
              <Text style={{ color: Colors.gray, paddingLeft: 10,fontSize:16 ,paddingBottom:3}}>
                <Ionicons name="camera" size={16}/> Image
            </Text>
            ) : (
              <Text style={{ color: Colors.gray, paddingLeft: 10 ,paddingTop:6,paddingBottom:3}}>
                {message!.text.length > 40
                  ? message?.text.substring(0, 40) + "..."
                  : message?.text}
              </Text>
            )}
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            {
              message.image ?<View style={{width:45,height:60}}>
                <Image source={{ uri: message?.image }} style={{flex:1,resizeMode:'contain'}} />
                <TouchableOpacity style={{position: 'absolute',right:3,top:3}} onPress={clearReply}>
              <Ionicons
                name="close-circle-outline"
                color={Colors.primary}
                size={24}
                
              />
            </TouchableOpacity>
              </View> :
            
            <TouchableOpacity onPress={clearReply}>
              <Ionicons
                name="close-circle-outline"
                color={Colors.primary}
                size={28}
              />
            </TouchableOpacity>}
          </View>
        </Animated.View>
      )}
    </>
  );
};

export default ReplyMessageBar;
