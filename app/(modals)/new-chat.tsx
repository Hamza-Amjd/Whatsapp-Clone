import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {Stack, useLocalSearchParams} from "expo-router";
import Colors from "@/constants/Colors";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import {  FIRESTORE_APP } from "@/firebaseConfig";
import useContacts from "@/hooks/useHooks";
import GlobalContext from "@/context/Context";
import ListItem from "@/components/ListItem";
import { useRoute } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type ContactProps = {
  contact:any,
  image:string,
  room:any
}
const ContactPreview:React.FC<ContactProps> = ({contact,image}) => {
  const { unfilteredRooms, rooms } = useContext(GlobalContext);
  const [user, setUser] = useState(contact);
useEffect(() => {
  const q=  query(collection(FIRESTORE_APP, "users"),where('email','==',contact.email));
  const unsubscribe = onSnapshot(q,snapshot => {
    if(snapshot.docs.length > 0) {
      const userdoc = snapshot.docs[0].data()
      setUser((prevUser:any)=>({...prevUser,userdoc}))
      
    }
  })
  return () => unsubscribe();
}, []);
return (
  <ListItem 
  index={user.email}
  description={null}
  lastMessageSender={null}
  time={null}
  type="contacts"
  user={user}
  image={image}
  room={unfilteredRooms.find((room:any) =>
    room.participantsArray.includes(contact.email)
  )}
/>

)

}
const newChat = () => {
  const route:any=useRoute()
  const contacts = useContacts()
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    if (searchText == "") setSearchResults(contacts);
    else setSearchResults(contacts.filter((item: any) =>
        item.contactName.toLowerCase().includes(searchText?.toLowerCase())
      ),);
  }, [searchText])
  const image:any=route.params.image;
  return (
    <>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placeholder: "Search",
            hideWhenScrolling: true,
            onChangeText(e:any) {
              e.preventDefault()
              setSearchText(e.nativeEvent.text)
            },
          },
          headerBackTitleVisible:false
        }}
      />
      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <GestureHandlerRootView style={{flex:1}}>
          {searchResults.length>0?
           <FlatList
           data={searchResults}
           style={{ marginLeft: 14,flex: 1 }}
           keyExtractor={(item:any,index)=>`${index}--${item?.email}`}
           renderItem={({item}) => (
             <ContactPreview room={null} contact={item} image={image} />
           )}
           
         />: <FlatList
         data={contacts}
         style={{ marginLeft: 14,flex: 1 }}
         keyExtractor={(item,index)=>`${index}--${item?.email}`}
         renderItem={({item}) => (
           <ContactPreview room={null} contact={item} image={image} />
         )}
         
       />
          }
          </GestureHandlerRootView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    backgroundColor: Colors.background,
    height: 20,
  },
  sectionHeaderLabel: {
    fontSize: 16,
  },
  listItemContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: Colors.primary,
    gap: 5,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});

export default newChat;
