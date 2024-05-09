import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { askPermission, pickImage, uploadImage } from "@/components/healper";
import { ImagePickerAsset, PermissionStatus } from "expo-image-picker";
import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_STORAGE, FIRESTORE_APP } from "@/firebaseConfig";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { router, useNavigation } from "expo-router";


const SetProfile = () => {
    const navigate=useNavigation(); 
  const [selectedImg, setselectedImg] = useState<ImagePickerAsset>();
  const [displayName, setDisplayName] = useState("");
  const [permission, setPermission] = useState<PermissionStatus | null>(null);
  useEffect(() => {
    (async () => {
      const status = await askPermission();
      setPermission(status);
    })();
  }, []);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user: any) => {
      if (user.displayName) {
        router.replace("/(tabs)/chats");
      }
    });
    return () => unsubscribe();
  }, []);
  if (!permission) {
    return <Text>Loading</Text>;
  }
  if (permission !== "granted") {
    return <Text>You need to allow this permission</Text>;
  }

  const handleProfileImage = async () => {
    let result = await pickImage();
    if (!result.canceled) {
      setselectedImg(result.assets[0]);
    }
  };

  const handlePress = async () => {
    let user:any= FIREBASE_AUTH.currentUser;
    let photoURL:any
    if (selectedImg) {
      const {url} = await uploadImage(selectedImg.uri,`images/${user.uid}`,'profilePicture');
      photoURL=url;
    }
    const userData:any={
        displayName:displayName,
        email:user?.email,
    }
    if(photoURL) {
        userData.photoURL=photoURL;
    }
    await Promise.all([
        updateProfile(user,userData),
        setDoc(doc(FIRESTORE_APP,"users",user.uid),{...userData,uid:user.uid}),
    ])
    router.replace('/(tabs)/chats')
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, color: Colors.muted,paddingBottom:10 }}>
        Profile Information
      </Text>
      <Text style={{ fontSize: 14, color: Colors.gray ,paddingBottom:20 }}>
        Please provide your name and optional profile picture
      </Text>
      <TouchableOpacity
        style={styles.imgContainer}
        onPress={handleProfileImage}
      >
        {!selectedImg ? (
          <MaterialCommunityIcons
            name="camera-plus"
            size={60}
            color={Colors.gray}
          />
        ) : (
          <Image
            source={{ uri: selectedImg.uri}}
            style={{ width: "100%", height: "100%", borderRadius: 100 }}
          />
        )}
      </TouchableOpacity>
      <TextInput
        onChangeText={setDisplayName}
        placeholder="Type your name"
        style={{
          width: "100%",
          borderBottomWidth: 2,
          borderColor: Colors.lightGreen,
          paddingTop: 10,
        }}
      />
      <TouchableOpacity
        disabled={displayName==""}
        style={[styles.button, displayName!=="" ? styles.enabled : null]}
        onPress={handlePress}
      >
        <Text style={[styles.buttontxt, displayName!=="" ? styles.enabled : null]}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingTop: 100,
  },
  imgContainer: {
    width: 150,
    height: 150,
    backgroundColor: Colors.lightGray,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 80,
  },
  button: {
    marginTop: "auto",
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: Colors.lightGray,
    color: Colors.gray,
    marginBottom: 20,
  },
  enabled: {
    backgroundColor: Colors.primary,
    color: "#FFFFFF",
  },
  buttontxt: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.gray,
  },
});
