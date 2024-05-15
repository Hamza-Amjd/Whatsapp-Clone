import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import status from "@/assets/data/status.json";
import Colors from "@/constants/Colors";
import {
  AntDesign,
  Entypo,
  Feather,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { format } from "date-fns";
import { Link, Stack } from "expo-router";
import Animated, {
  CurvedTransition,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import Avatar from "@/components/Avatar";

const index = () => {
  const [items, setitems] = useState(status);
  const user=FIREBASE_AUTH.currentUser;
  const [searchText, setSearchText] = useState("");
  const [showViewedStatus, setShowViewedStatus] = useState(false);
  const AnimatedTouchableOpacity =Animated.createAnimatedComponent(TouchableOpacity);

  const RenderItem:React.FC<{item:any}>= ( {item} ) => {
    return (
      <Link href={`/(tabs)/updates/${item.id}`} asChild>
        <AnimatedTouchableOpacity onPress={() => {}}>
          <View style={styles.listitem}>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
              }}
            >
              <View style={styles.imgcontainer}>
                <Image source={{ uri: item.img }} style={styles.img} />
              </View>
              <View style={{ gap: 5 }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 18,
                    fontWeight: "600",
                  }}
                >
                  {item.from}
                </Text>

                <Text
                  style={{
                    fontSize: 14,
                    color: "rgba(1,1,1,0.7)",
                  }}
                >
                  {format(item.date, "hh:mm a ")}
                </Text>
              </View>
            </View>
          </View>
        </AnimatedTouchableOpacity>
      </Link>
    );
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View
              style={{ flexDirection: "row", gap: 15, alignItems: "center" }}
            >
              <Feather name="camera" size={25} color={Colors.muted} />
              <SimpleLineIcons
                name="options-vertical"
                size={20}
                color={Colors.muted}
              />
            </View>
          ),
        }}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}
      >
        <View style={styles.listitem}>
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <Avatar user={user} size={50}/>
            <View style={{ gap: 3 }}>
              <Text
                style={{
                  color: "black",
                  fontSize: 18,
                  fontWeight: "600",
                }}
              >
                My Status
              </Text>

              <Text
                style={{
                  fontSize: 14,
                  color: "rgba(1,1,1,0.7)",
                }}
              >
                Tap to add status Update
              </Text>
            </View>
          </View>
        </View>
        <Text
          style={{
            color: "rgba(1,1,1,0.7)",
            fontSize: 14,
            fontWeight: "600",
            marginLeft: 8,
          }}
        >
          Recent status
        </Text>
        <FlatList
          scrollEnabled={false}
          data={items.filter((item) => item.read === false)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (<RenderItem item={item}/> )}
        />
          <TouchableOpacity
             style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: showViewedStatus?0:30,
          }}
            onPress={() => setShowViewedStatus(!showViewedStatus)}
          >
            <Text
            style={{
              color: Colors.Grayrgba,
              fontSize: 14,
              fontWeight: "600",
              marginLeft: 5,
            }}
          >
            Viewed status
          </Text>
          
            {showViewedStatus ? (
              <Entypo name="chevron-up" color={Colors.Grayrgba} size={18} />
            ) : (
              <Entypo name="chevron-down" color={Colors.Grayrgba} size={18} />
            )}
          </TouchableOpacity>
        {showViewedStatus && (
          <FlatList
            scrollEnabled={false}
            data={items.filter((item) => item.read)}
            contentContainerStyle={{ paddingBottom: 4 }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (<RenderItem  item={item}/> )}
          />
        )}
      </ScrollView>
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  listitem: {
    paddingVertical: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: Colors.primary,
  },
  imgcontainer: {
    padding: 2,
    borderWidth: 3,
    borderColor: Colors.green,
    borderRadius: 100,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});
