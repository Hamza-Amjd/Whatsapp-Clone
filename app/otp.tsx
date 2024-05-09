import { ActivityIndicator, Alert, Linking, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors'
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const otp = () => {
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setphoneNumber] = useState('');
    const router= useRouter();
   
    const openLink = ()=>{
        Linking.openURL('http://whatsapp.com')
      }
      const sendOTP = async () => {
       
      };
   
  const trySignIn = async () => {
    
  };
  return (
    <View style={styles.container}>
        {loading && <View style={[StyleSheet.absoluteFill,styles.loading]}>
            <ActivityIndicator size={'large'} color={Colors.primary}/>
            <Text style={{textAlign:"center"}}>Verifying...</Text>

        </View>
        }
      <Text style={styles.description}>Whatsapp need to verify your phone number. Carrer charges may apply.</Text>

      <View style={styles.list}>
        <View style={styles.listItem}>
          <Text style={styles.listItem}>Pakistan</Text>
          <Ionicons name='chevron-forward'size={20} color={Colors.gray}/>
        </View>
        <View style={styles.seprator}/>
        <View style={styles.listItem}>
            <TextInput style={{flex:1,padding:6}} placeholder='+92 your phone number' onChangeText={setphoneNumber} keyboardType='phone-pad' autoFocus/>
        </View>
    </View>
      <Text style={styles.description}>
        You must be{' '}
        <Text style={styles.link} onPress={openLink}>atleast 16 years old</Text>
        {' '}to register. Learn how Whatsapp work withme{' '}
        <Text style={styles.link} onPress={openLink}>Meta Companies</Text>
      </Text>
      <View style={{flex:1}}/>
      <TouchableOpacity disabled={phoneNumber==''} style={[styles.button,phoneNumber!==''?styles.enabled:null]} onPress={sendOTP}>
        <Text style={[styles.buttontxt,phoneNumber!==''?styles.enabled:null]}>Next</Text>
      </TouchableOpacity>
    </View>
  )
}

export default otp

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: Colors.background,
        gap: 20   
    },
    list:{
        width: "100%",
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },
    listItem:{
        padding: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        color:Colors.primary,
        fontSize: 16
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
      seprator:{
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.lightGray,
        width:"100%"
      },
      button:{
        width:"100%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: Colors.lightGray,
        color: Colors.gray,
        marginBottom:20,
      },
      enabled:{
        backgroundColor: Colors.primary,
        color: '#FFFFFF',
      },
      buttontxt:{
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.gray,
      },
      loading:{
        ...StyleSheet.absoluteFillObject,
        zIndex: 10,
        backgroundColor:'#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    }
})