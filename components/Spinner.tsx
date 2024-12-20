import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

const Spinner = () => {
  return (
    <Modal transparent={true} visible={true} statusBarTranslucent>
      <View style={styles.container}>
        <View style={styles.background}>
          <ActivityIndicator size={'large'} color={Colors.muted}/>
        </View>
      </View>
    </Modal>
  )
}

export default Spinner

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    borderRadius: 10,
  },
})