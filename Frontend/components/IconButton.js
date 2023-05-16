import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IconButton = ({ icon, onPress }) => {
return (
<TouchableOpacity onPress={onPress} style={styles.container}>
<Ionicons name={icon} size={20} color="#000" />
</TouchableOpacity>
);
};

const styles = StyleSheet.create({
container: {
position: 'absolute',
right: 10,
top: '50%',
transform: [{ translateY: -10 }],
},
});

export default IconButton;