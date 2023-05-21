import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'



const BottomNavbar = () => {

    const handleHomePress = () => {
        // Handle home icon press
        console.log('Home icon pressed');
    };
    
    const handleSearchPress = () => {
        // Handle search icon press
        console.log('Search icon pressed');
    };
    
    const handleBellPress = () => {
        // Handle bell icon press
        console.log('Bell icon pressed');
    };
    
    const handleUserPress = () => {
        // Handle user icon press
        console.log('User icon pressed');
    };


    return (
        <View style={styles.container}>
        <TouchableOpacity onPress={handleHomePress}>
            <Icon name="home" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSearchPress}>
            <Icon name="search" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBellPress}>
            <Icon name="bell" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleUserPress}>
            <Icon name="user" size={20} color="white" />
        </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    bottom: 0,
    width: '100%',
    height: 75,
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default BottomNavbar;