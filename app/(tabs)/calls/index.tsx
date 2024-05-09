import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import calls from "@/assets/data/calls.json";
import Colors from "@/constants/Colors";
import { Feather, Ionicons, Octicons, SimpleLineIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import { Stack } from "expo-router";
import { SegmentedControl } from "@/components/SegmentedControl";
import Animated, {
  CurvedTransition,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import SwipeableRow from "@/components/SwipeableRow";
import * as Haptics from "expo-haptics";
import { TextInput } from "react-native-gesture-handler";
import { SearchBar } from "react-native-screens";
const transition = CurvedTransition.delay(100);
const index = () => {
  const [items, setitems] = useState(calls);
  const [selectedOption, setselectedOption] = useState("All");
  const [searchText, setsearchText] = useState("");

  useEffect(() => {
    if (selectedOption == "All") setitems(calls);
    else setitems(calls.filter((item) => item.missed));
  }, [selectedOption]);

  useEffect(() => {
    if (searchText == "") setitems(calls);
    else setitems(items.filter((item: any) =>
        item.name.toLowerCase().includes(searchText?.toLowerCase())
      ),);
  }, [searchText]);


  const removeCall=(item:any) =>{
    setitems(items.filter((i:any)=>i.id!==item.id));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }

  const Header=()=>{
    return (
      <View style={styles.header}>
          
            <Text style={styles.headerText}>Calls</Text>
            <View style={styles.searchBar}>
              <TextInput  placeholder={"Search"} style={{flex:1}} onChangeText={setsearchText}/>
              <Octicons name="search" size={24} color={Colors.lightGray} />
            </View>
        
        
      </View>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitleAlign: "center",
          headerLeft:()=><Text style={{fontSize:20,color:Colors.muted,textDecorationLine:"underline"}}>Edit</Text>,
          headerTitle: () => (
            <SegmentedControl
              options={["All", "Missed"]}
              selectedOption={selectedOption}
              onOptionPress={setselectedOption}
            />
          ),
          headerRight: () => <Feather name="phone" size={26} color={Colors.muted} />,
        }}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}
      >
        <Header/>
        <Animated.View layout={transition}>
          <Animated.FlatList
            style={styles.list}
            scrollEnabled={false}
            data={items}
            skipEnteringExitingAnimations
            contentContainerStyle={{paddingBottom:4}}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
                <SwipeableRow onDelete={()=>removeCall(item)}>
              <Animated.View
                entering={FadeInUp.delay(index * 10)}
                exiting={FadeInDown}
              >
                <View style={styles.listitem}>
                  <View style={{ flexDirection: "row", gap: 5 }}>
                    <Image source={{ uri: item.img }} style={styles.img} />
                    <View>
                      <Text
                        style={{
                          color: item.missed ? "red" : "black",
                          fontSize: 18,
                          fontWeight: "600",
                        }}
                      >
                        {item.name}
                      </Text>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          gap: 2,
                          alignItems: "center",
                        }}
                      >
                        <Ionicons
                          name={item.video ? "videocam" : "call"}
                          color={Colors.gray}
                          size={15}
                        />
                        <Text style={{ fontSize: 12, fontWeight: "300" }}>
                          {item.incoming ? "Incoming" : "Outgoing"}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row",gap:3, alignItems:"center"}}>
                    <Text style={{fontSize:12}}>{format(item.date, "MMM dd, h:mm a")}</Text>
                    <Ionicons name="information-circle-outline" size={20} color={Colors.muted} />
                  </View>
                </View>
              </Animated.View></SwipeableRow>
            )}
          />
        </Animated.View>
      </ScrollView>
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.background,
  },
  list: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 40,
  },
  listitem: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: Colors.gray,
    borderBottomWidth: 0.2,
    paddingBottom: 10,
    color: Colors.primary,
    gap: 5,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  header:{
    backgroundColor:Colors.background,
  },
  headerText:{
    fontSize:30,
    fontWeight:"bold",
    color:Colors.gray,
    marginBottom:10,
  },
  searchBar:{
    width:"100%",
    height:40,
    backgroundColor:"white",
    borderRadius:20,
    paddingLeft:10,
    paddingRight:10,
    color:Colors.muted,
    fontSize:16,
    flexDirection:"row",
    alignItems:"center",
    marginBottom:20,
  }
});
