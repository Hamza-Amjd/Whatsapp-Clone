import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Stack } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { Bubble, GiftedChat, IMessage, InputToolbar, Send, Time } from "react-native-gifted-chat";
import { Swipeable } from "react-native-gesture-handler";
import ReplyMessageBar from "@/components/ReplyMessageBar";
import ChatMessageBox from "@/components/ChatMessageBox";
import { collection, doc,addDoc, setDoc, onSnapshot, updateDoc, deleteField } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_APP } from "@/firebaseConfig";
import { useRoute } from "@react-navigation/native";
import { pickImage, uploadImage } from "@/components/healper";
import ImageView from "react-native-image-viewing";
import Avatar from "@/components/Avatar";
import "react-native-get-random-values";
import { nanoid }from 'nanoid'
import OptionsButton from "@/components/OptionsButton";

const randomId =nanoid()

const chatpage = () => {
  const route:any = useRoute();
  const userB:any = route.params.user;
  const room:any = route.params.room;
  const selectedImage:any = route.params.image;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageView, setSeletedImageView] = useState("");
  const [text, setText] = useState('');
  const [roomHash, setRoomHash] = useState('');
  const [replyMessage, setReplyMessage] = useState<IMessage | null>(null);
  const swipeableRowRef = useRef<Swipeable | null>(null);
  const {currentUser}= FIREBASE_AUTH;

  const senderUser:any = currentUser?.photoURL
  ? {
      name: currentUser.displayName,
      _id: currentUser.uid,
      avatar: currentUser.photoURL,
    }
  : { name: currentUser?.displayName, _id: currentUser?.uid };
 
const roomId =  room?room.id:randomId;

const roomRef = doc(FIRESTORE_APP, "rooms", roomId);
const roomMessagesRef = collection(FIRESTORE_APP, "rooms", roomId, "messages");
 
useEffect(() => {
  (async () => {
    
    if (!room) {
      const currUserData:any = {
        displayName: currentUser?.displayName,
        email: currentUser?.email,
      };
      if (currentUser?.photoURL) {
        currUserData.photoURL = currentUser.photoURL;
      }
      const userBData:any = {
        displayName: userB.contactName || userB.displayName || "",
        email: userB.email,
      };
      if (userB.userdoc.photoURL) {
        userBData.photoURL = userB.userdoc.photoURL;
      }
      const roomData = {
        participants: [currUserData, userBData],
        participantsArray: [currentUser?.email, userB.email],
      };
      try {
        await setDoc(roomRef, roomData);
      } catch (error) {
        console.log(error);
      }
    }
    const emailHash = `${currentUser?.email}:${userB.email}`;
      setRoomHash(emailHash);
      if (selectedImage && selectedImage.uri) {
        console.log("chatimg :",selectedImage)
        await sendImage(selectedImage.uri, emailHash);
      }
  })();
}, []);

useEffect(() => {
  const unsubscribe = onSnapshot(roomMessagesRef, (querySnapshot) => {
    const messagesFirestore = querySnapshot
      .docChanges()
      .filter(({ type }) => type === "added")
      .map(({ doc }) => {
        const message = doc.data();
        return { ...message, createdAt: message.createdAt.toDate() };
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    appendMessages(messagesFirestore);
  });
  return () => unsubscribe();
}, []);
   
  const appendMessages = useCallback(
    (messages:any) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  async function onSend(message = []) {
    const writes:any = message.map((m) => addDoc(roomMessagesRef, m));
    const lastMessage = message[message.length - 1];
    writes.push(updateDoc(roomRef, { lastMessage }));
    await Promise.all(writes);
  }
;
async function sendImage(uri:any, roomPath:any) {
  const { url, fileName } = await uploadImage(
    uri,
    `images/rooms/${roomPath || roomHash}`,null
  );
  const message = {
    _id: fileName,
    text: "",
    createdAt: new Date(),
    user: senderUser,
    image: url,
  };
  const lastMessage = { ...message, text: "Image" };
  await Promise.all([
    addDoc(roomMessagesRef, message),
    updateDoc(roomRef, { lastMessage }),
  ]);
}

async function handlePhotoPicker() {
  const result:any = await pickImage();
  if (!result.cancelled) {
    await sendImage(result.assets[0].uri,null);
  }
}

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{ backgroundColor: Colors.background,paddingVertical:3}}
        renderActions={() => (
          <View style={{ height: 44, justifyContent: 'center', alignItems: 'center', left: 5 }}>
            <Ionicons name="add" color={Colors.primary} size={28} />
          </View>
        )}
      />
    );
  };
  const updateRowRef = useCallback(
    (ref: any) => {
      if (
        ref &&
        replyMessage &&
        ref.props.children.props.currentMessage?._id === replyMessage._id
      ) {
        swipeableRowRef.current = ref;
      }
    },
    [replyMessage]
  );

  useEffect(() => {
    if (replyMessage && swipeableRowRef.current) {
      swipeableRowRef.current.close();
      swipeableRowRef.current = null;
    }
  }, [replyMessage]);

  const clearChat=()=>{
    Alert.alert("Clear this Chat?","This action is not reversable ",[
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Clear chat',
        onPress: async() => {setMessages([]);
          try{
            await updateDoc(roomRef, {
            roomMessagesRef: deleteField()
        });
          }catch(err){
            console.log(err)
          }
          
        },
        style: 'destructive',
      },
    ],);}
  const options= [
    {name: 'Clear chat', function:clearChat}
]
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Avatar user={userB?.userdoc?userB.userdoc:userB} size={40} />

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                {userB?.contactName}
              </Text>
            </View>
          ),
          headerRight: () => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
            >
              <TouchableOpacity>
                <Feather name="phone" size={25} color={Colors.muted} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather name="video" size={25} color={Colors.muted} />
              </TouchableOpacity>
              <OptionsButton options={options}/>
            </View>
          ),
        }}
      />
      <ImageBackground
        source={require("@/assets/images/pattern.png")}
        style={{ flex: 1 }}
      >
        <GiftedChat
          messages={messages}
          onSend={(messages: any) => onSend(messages)}
          user={senderUser}
          onInputTextChanged={setText}
          bottomOffset={200}
          textInputProps={styles.composer}
          maxComposerHeight={100}
          timeTextStyle={{right:{color:Colors.Grayrgba}}}
          
          renderBubble={(props) => (
            <Bubble
              {...props}
              textStyle={{ right: { color: "#000" } }}
              wrapperStyle={{
                left: { backgroundColor: "#fff" },
                right: { backgroundColor: Colors.lightGreen },
              }}
              tickStyle={{ color:Colors.green}}
            />
          )}
          renderSend={(props) => (
            <View style={{ alignItems: "center", justifyContent: "center" ,flexDirection:'row',gap:14,paddingHorizontal:14,height:44}}>
              {text === '' && (
              <>
                <Ionicons name="camera-outline" color={Colors.primary} size={28} onPress={handlePhotoPicker} />
                <Ionicons name="mic-outline" color={Colors.primary} size={28} />
              </>
            )}
            {text !== '' && (
              <Send
                {...props}
                containerStyle={{
                  justifyContent: 'center',
                }}>
                <Ionicons name="send" color={Colors.primary} size={28} />
              </Send>
            )}
            </View>
          )}
          renderInputToolbar={renderInputToolbar}
          renderChatFooter={() => (
            <ReplyMessageBar  clearReply={() => setReplyMessage(null)} message={replyMessage}  />
          )}
          onLongPress={(context, message) => setReplyMessage(message)}
          renderMessage={(props) => (
            <ChatMessageBox
              {...props}
              setReplyOnSwipeOpen={setReplyMessage}
              updateRowRef={updateRowRef}
            />
          )}
          
          renderMessageImage={(props:any) => {
            return (
              <View style={{ borderRadius: 15, padding: 2 }}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                    setSeletedImageView(props.currentMessage.image);
                  }}
                >
                  <Image
                    resizeMode="contain"
                    style={{
                      width: 200,
                      height: 200,
                      padding: 6,
                      borderRadius: 15,
                      resizeMode: "cover",
                    }}
                    source={{ uri: props.currentMessage.image }}
                  />
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
              </View>
            );
          }}
        />
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  composer: {
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    paddingHorizontal: 10,
    paddingTop: 4,
    fontSize: 16,
    marginVertical: 4,
    paddingBottom: 4,
  },
});


export default chatpage;


