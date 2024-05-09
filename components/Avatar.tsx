import React, { useState } from "react";
import { Image } from "react-native";

interface avatarProps{
  user: any;
  size: number;
}
const Avatar:React.FC<avatarProps>=({ size, user })=> { 
  const [userdata, setUserdata] = useState(user)
  return (
    <Image
      style={{
        width: size,
        height: size,
        borderRadius: size,
      }}
      source={
        userdata.photoURL
          ? { uri: userdata.photoURL }
          : require("@/assets/images/emptyPfp.png")
      }
      resizeMode="cover"
    />
  );
}
export default  Avatar;