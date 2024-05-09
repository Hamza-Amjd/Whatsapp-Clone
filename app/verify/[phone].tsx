import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Colors from '@/constants/Colors';

const CELL_COUNT = 6;

const page = () => {
  const {phone, signin} =useLocalSearchParams<{phone: string,signin: string}>();
  const [code, setcode] = useState('')
  const ref =useBlurOnFulfill({value: code,cellCount:CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value:code,
    setValue:setcode,
  });
  useEffect(() => {
    if(code.length==6){
      if(signin==='true'){
        verifySignIn();
      }else{
        verifyCode();
      }
    }
  }, [code])
  const verifyCode=async()=>{
   
  };
  const verifySignIn = async () => {
    
  };

  const resendCode = async () => {
  
  };
  return (
    <View style={styles.container}>
      <Text style={styles.legal}>We have sent you an SMS on above phone number</Text>
      <Text style={styles.legal}>To complete your phone number verification, please enter the 6-digit activation code</Text>
      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setcode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor/> : null)}
          </Text>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={resendCode}>
        <Text style={styles.buttontxt}>Cant recive a verification code?</Text>
      </TouchableOpacity>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor:Colors.background,
    gap: 20,
  },
  legal:{
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  button:{
    width:"100%",
    alignItems: 'center',
  },
  buttontxt:{
    fontSize: 18,
    color: Colors.primary,
  },
  codeFieldRoot:{
    marginTop: 20,
    width: 260,
    marginLeft:"auto",
    marginRight:"auto",
    gap: 4
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
})

export default page
