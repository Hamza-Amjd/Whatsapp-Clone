import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';
import { Octicons } from '@expo/vector-icons';

interface HeaderProps{
    setsearchText: any
}

const  Header:React.FC<HeaderProps>=({setsearchText})=>{
    return (
      <View style={styles.header}>
            <View style={styles.searchBar}>
              <TextInput  placeholder={"Search"} style={{flex:1}} onChangeText={setsearchText} />
              <Octicons name="search" size={24} color={Colors.lightGray} />
            </View>
        
        
      </View>
    );
  };

  const styles = StyleSheet.create({
    header:{
        
      },
      headerText:{
        fontSize:30,
        fontWeight:"bold",
        color:Colors.gray,
        marginBottom:10,
      },
      searchBar:{
        width:"100%",
        height:40,
        backgroundColor:"white",
        borderRadius:20,
        paddingLeft:10,
        paddingRight:10,
        color:Colors.muted,
        fontSize:16,
        flexDirection:"row",
        alignItems:"center",
        marginBottom:20,
      }
  })
  
  export default Header