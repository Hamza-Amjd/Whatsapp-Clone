import { ActivityIndicator, Image, Linking, LogBox, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '@/constants/Colors';
import { router } from 'expo-router';
import { FIREBASE_AUTH, signIn, signUp } from '@/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
LogBox.ignoreLogs([
  "Setting a timer",
  "You are initializing Firebase Auth for React Native without providing AsyncStorage.",
]);
const index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("signin");
  const openLink = ()=>{
    Linking.openURL('http://whatsapp.com')
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user: any) => {
      setLoading(false);
      if (user) {
        router.push("/SetProfile");
      }
    });
    return () => unsubscribe();
  }, []);
  const handleLogin = () => {
    setLoading(true);
    if(mode=="signin"){
      signIn(email, password)
      setLoading(false);
    };
    if(mode=="signup"){
      signUp(email, password)
      setLoading(false);
    }
  }
  
  return (
     <>
    {loading?<View style={styles.container}><ActivityIndicator size={'large'} color={Colors.green}/></View>:
      <View style={styles.container}><Image source={require('@/assets/images/welcome.png')} style={styles.img}/>
      <Text style={styles.heading}>Welcome to Whatsapp</Text>
      <Text style={styles.description}>
        Read our{' '}
        <Text style={styles.link} onPress={openLink}>Privacy Policy</Text>
        {' '}Tap "Agree and Continue" to accept the{' '}
        <Text style={styles.link} onPress={openLink}>Terms of Service</Text>
      </Text>

      <TextInput
        autoCapitalize='none'
        onChangeText={setEmail}
        placeholder="Email"
        style={{
          width: "100%",
          borderBottomWidth: 2,
          borderColor: Colors.lightGreen,
          paddingTop: 10,
        }}
      />
      <TextInput
        autoCapitalize='none'
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Password"
        style={{
          width: "100%",
          borderBottomWidth: 2,
          borderColor: Colors.lightGreen,
          paddingTop: 10,
        }}
      />


      <TouchableOpacity disabled={password=="" || email==""} style={styles.button} onPress={handleLogin}>
        <Text style={[styles.buttontxt,password=="" && email=="" && {color:Colors.gray}]} >{mode=='signin'?"Sign In":"Sign Up"}</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={styles.button} onPress={()=>mode=='signin'?setMode("signup"):setMode("signin")}>
        <Text style={{color:Colors.green}} >{mode=='signin'?"Dont have an account? Sign Up":"Already have an account? Sign In"}</Text>
      </TouchableOpacity>
    </View>}</>
  )
}

export default index

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    img:{
        width: "100%",
        height: 300,
        marginBottom: 80,
    },
    heading:{
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    description:{
      fontSize: 14,
      fontWeight: '300',
      opacity: 0.5,
      textAlign: 'center',
      marginBottom: 20,
    },
    link:{
      fontSize: 14,
      fontWeight: '300',
      color:Colors.primary,
    },
    button:{
      width:"100%",
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,

    },
    buttontxt:{
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors.primary,

    }
})