import "react-native-get-random-values";
import { FIREBASE_STORAGE } from "@/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { nanoid }from 'nanoid'
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const addToAsyncStorage = async (key:string, values:any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(values));
      return true;
    } catch (error) {
      return false;
    }
  };
  
  export const getFromAsyncStorage = async (key:string) => {
    try {
      const res = await AsyncStorage.getItem(key);
      if (res) {
        return { success: true, data: JSON.parse(res) };
      }
    } catch (error) {
      return { success: false, error };
    }
  };

export const getImage = async (reference: any) => {
    return await getDownloadURL(ref(FIREBASE_STORAGE, reference));
  };

  export const pickImage = async () => {
    let result = ImagePicker.launchCameraAsync()
    return result;
  }; 
  export const askPermission = async () => {
    const {status} = await ImagePicker.requestCameraPermissionsAsync()
    return status ;
  };

  
  export const uploadImage=async(uri:any, path:any, fName:any)=> {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob:any = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    const fileName = fName || nanoid();
    const imageRef = ref(FIREBASE_STORAGE, `${path}/${fileName}.jpeg`);
  
    const snapshot = await uploadBytes(imageRef, blob,{contentType:"image/jpg",});
  
    blob.close();
  
    const url = await getDownloadURL(snapshot.ref);
  
    return { url, fileName };
  }