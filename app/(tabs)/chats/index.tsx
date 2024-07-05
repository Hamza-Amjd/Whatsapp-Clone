import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Alert
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import {
  Feather,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Link, Stack, router, } from "expo-router";
import { FIREBASE_AUTH, FIRESTORE_APP } from "@/firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import GlobalContext from "@/context/Context";
import useContacts from "@/hooks/useHooks";
import ListItem from "@/components/ListItem";
import { pickImage } from "@/components/healper";
import { useNavigation } from "@react-navigation/native";
import OptionsButton from "@/components/OptionsButton";

const index = () => {
  const navigation:any=useNavigation();
  const { rooms, setRooms, setUnfilteredRooms } = useContext<any>(GlobalContext);
  const contacts=useContacts()
  const [searchText, setSearchText] = useState("");
  const [showOption, setShowOption] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    if (searchText == "") setSearchResults(rooms);
    else setSearchResults(rooms.filter((item: any) =>
        item.userB.displayName.toLowerCase().includes(searchText.toLowerCase())
      ),);
  }, [searchText]);

const userEmail=FIREBASE_AUTH.currentUser?.email;
const chatquery = query(collection(FIRESTORE_APP,"rooms"), where('participantsArray', 'array-contains', userEmail));

function getUserB(user:any, contacts:any) {
    const userContact = contacts.find((c:any) => c?.email === user?.email);
    if (userContact && userContact.contactName) {
      return { ...user, contactName: userContact.contactName };
    }else{
      return { ...user, contactName: user.displayName };
    }
  }
  const image =  async() => {
    const result:any = await pickImage();    
    if (!result.cancelled) {
      navigation.navigate('(modals)/new-chat',{image:result.assets[0]})
    }
  };

useEffect(() => {
    const unsubscribe = onSnapshot(chatquery,(querysnapshot)=>{
      const parsedChats=querysnapshot.docs.map(doc => {
        return {
         ...doc.data(),
          id:doc.id,
          userB:doc.data().participants.find((p:any)=>p.email !== userEmail),
        }
      }).sort((a:any, b:any) => b.lastMessage.createdAt - a.lastMessage.createdAt);
      setUnfilteredRooms(parsedChats);
      setRooms(parsedChats.filter((doc:any) => doc?.lastMessage))
    })
    return () => unsubscribe();
  }, [])

  const logout=() => {
    Alert.alert('Logout','Are you sure you want to logout?'
       ,[
          {
            text: "Cancel",
            style: "cancel"
          },
          { text: "OK", onPress: () => {
    FIREBASE_AUTH.signOut();
    router.navigate('/');}}
        ]
      );
    
  };
  const options= [
    {name: 'Logout', function:logout}
]
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View
              style={{ flexDirection: "row", gap: 15, alignItems: "center" }}
            >
                <TouchableOpacity onPress={image}>
                <Feather name="camera" size={25} color={Colors.muted}/>
              </TouchableOpacity>
              <OptionsButton options={options}/> 
            </View>
          ),
        }}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}
      >
        <View style={styles.searchBar}>
          <Octicons name="search" size={20} color={Colors.lightGray} />
          <TextInput
            placeholder={"Search"}
            style={{ flex: 1 }}
            onChangeText={setSearchText}
          />
        </View>
        <View >
        {searchResults.length>0? searchResults.map((room:any,index:any) => (
        <ListItem
          type="chat"
          description={room.lastMessage.text}
          key={room.id}
          room={room}
          lastMessageSender={room?.lastMessage.user}
          time={room?.lastMessage?.createdAt}
          user={getUserB(room.userB, contacts)}
          index={index}
          image={null}
        />
        )):
        rooms.map((room:any,index:any) => (
          <ListItem
            type="chat"
            description={room.lastMessage.text}
            key={room.id}
            room={room}
            time={room?.lastMessage?.createdAt}
            lastMessageSender={room?.lastMessage?.user}
            user={getUserB(room.userB, contacts)}
            index={index}
            image={null}
          />
          ))
        }
        </View>
      </ScrollView>
      <Link href={"/(modals)/new-chat"} asChild>
        <TouchableOpacity style={styles.newchat} onPress={() => {}}>
          <MaterialIcons name="chat" size={30} color="white" />
        </TouchableOpacity>
      </Link>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop:0,
    backgroundColor: '#FFF',
  },
  searchBar: {
    width: "100%",
    height: 40,
    gap: 5,
    backgroundColor: Colors.background,
    marginTop:15,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    color: Colors.muted,
    fontSize: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  list: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 40,
  },
  
  newchat: {
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.green,
    position: "absolute",
    right: 15,
    bottom: 15,
    zIndex: 1000,
    padding:10
  },
});

export default index;