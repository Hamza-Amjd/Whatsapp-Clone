import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, useSegments } from 'expo-router';

import Colors from '@/constants/Colors';
import { Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-native';

export default function TabLayout() {
  const segments = useSegments();
  return (
    <GestureHandlerRootView style={{flex:1}}>
    <Tabs
      screenOptions={{
        tabBarStyle:{
          backgroundColor: Colors.background,
          height: 65,
          borderRadius:100
        },
        tabBarActiveTintColor:Colors.green,
        tabBarActiveBackgroundColor:Colors.lightGreen,
        tabBarInactiveBackgroundColor:Colors.background,
        tabBarItemStyle:{borderRadius:10},
        tabBarHideOnKeyboard:true,
        headerShown:false,
        tabBarLabelStyle:{fontSize:14,fontWeight:'700'},
      }}>
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          tabBarIcon: ({ size,color }) => <MaterialIcons name="chat" size={size} color={color} />,
          tabBarStyle:{
            backgroundColor:Colors.background,
            height: 65,
            display:segments[2] === 'chat' ? 'none':'flex'  
          }
        }}
      />
      <Tabs.Screen
        name="updates"
        options={{
          title: 'Updates',
          tabBarIcon: ({ size,color  }) =>   <MaterialIcons name="update" size={size} color={color} />,
          tabBarStyle:{
            backgroundColor:Colors.background,
            height: 65,
            display:segments[2] === '[id]' ? 'none':'flex'  
          }
        }}
      />
      <Tabs.Screen
        name="communities"
        options={{
          title: 'Communities',
          tabBarIcon: ({size,color}) => <MaterialCommunityIcons name="account-group" size={size}   color={color}/>,
          headerShown:true,
          headerShadowVisible: false,
          headerStyle:{backgroundColor:Colors.background},
          headerTitleStyle:{fontSize:24,fontWeight:"700",color:'rgba(1,1,1,0.7)'},
        }}
      />
      <Tabs.Screen
        name="calls"
        options={{
          title: 'Calls',
          tabBarIcon: ({ size,color }) => <FontAwesome name="phone" size={size}  color={color}  />,
        }}
      />
    </Tabs>
    </GestureHandlerRootView>
  );
}
