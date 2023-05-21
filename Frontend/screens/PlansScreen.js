import { View, Text, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'
import React from 'react'

const PlansScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{color:Colors.text}}>PlansScreen</Text>
    </View>
  )
}

export default PlansScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: Colors.background,
  },
});