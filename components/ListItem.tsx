import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppleStyleSwipeableRow from "./AppleStyleSwipableRow";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import { useNavigation } from "expo-router";
import Avatar from "./Avatar";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
type ListItemProps = {
  type: string;
  description: string|null;
  room: any;
  time: any|null;
  user: any;
  index: number;
  image: string | null;
};
const ListItem: React.FC<ListItemProps> = ({
  type,
  description,
  room,
  time,
  user,
  index,
  image,
}) => {
  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);
  const navigation = useNavigation<any>();
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
            <Avatar user={type == "contacts" ?user?.userdoc:user} size={type === "contacts" ? 40 : 65} />
            <View style={{justifyContent:'space-evenly'}}>
              <View style={{flexDirection:'row',justifyContent:'space-between',width:'85%',alignItems:'baseline'}}>
                <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                }}
              >
                {user?.contactName || user?.displayName}
              </Text>
              {time && (
            <Text
              style={{
                fontSize: 12,
              }}
            >
              {new Date(time.seconds * 1000).toLocaleDateString()}
            </Text>
          )}
              </View>
              
              {description && (
                <View style={{flexDirection:'row',alignItems:'center',gap:1}}>
                  <Ionicons name="checkmark-done-outline" size={20} color="cyan" /> 
                  
                  <Text style={{ fontSize: 14, fontWeight: "400" ,alignItems:'baseline'}}>
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
    borderRadius: 100,
  },
});

export default ListItem;
