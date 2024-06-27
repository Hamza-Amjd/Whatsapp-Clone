import React, { useState } from "react";
import { Image } from "react-native";

type avatarProps={
  user: any;
  size: number;
}

const Avatar:React.FC<avatarProps>=({ size=60, user})=> { 
  const [photo, setPhoto] = useState(user?.photoURL?user.photoURL:null)
  return (
    <Image
      style={{
        width: size,
        height: size,
        borderRadius: size,
      }}
      source={
        photo
          ? { uri: photo }
          : require("@/assets/images/emptyPfp.png")
      }
      resizeMode="cover"
    />
  );
}
export default  Avatar;