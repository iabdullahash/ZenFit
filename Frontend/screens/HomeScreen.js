import { View, Text, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'
import React from 'react'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{color:Colors.text}}>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: Colors.background,
  },
});