import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { Stack } from 'expo-router'
import { Feather, SimpleLineIcons } from '@expo/vector-icons'

const communities = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View
              style={{ flexDirection: "row", gap: 15, alignItems: "center" ,marginRight:16}}
            >
              <Feather name="camera" size={25} color={Colors.muted} />
              <SimpleLineIcons
                name="options-vertical"
                size={20}
                color={Colors.muted}
              />
            </View>
          ),
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default communities