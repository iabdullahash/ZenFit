import React, { useState } from 'react';
import { Dimensions, StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import Colors from '../constants/Colors';
import Font from '../constants/Fonts';
import FontSize from '../constants/FontSize';
import Spacing from '../constants/Spacing';
import { Ionicons } from '@expo/vector-icons';

const width = Dimensions.get("window").width;

const AppTextInput = ({ inputMode, value, onChangeText,returnKeyType,onSubmitEditing,inputStyle,...otherProps }) => {
  const [focused, setFocused] = useState(false);

  // Determine if the password input should be masked
  const isPasswordInput = inputMode === 'password';
  let temp = inputMode
  if (inputMode === "password"){temp = "default"}
  const [isPasswordVisible, setPasswordVisible] = useState(!isPasswordInput);

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholderTextColor={Colors.darkText}
        style={[
          styles.input,
          focused && styles.inputFocused,
          inputStyle
        ]}
        secureTextEntry={isPasswordInput && !isPasswordVisible} // Hide the password if inputMode is 'password' and isPasswordVisible is false
        {...otherProps}
        
        keyboardType={temp}
      />
      {isPasswordInput && (
        <Ionicons
          name={isPasswordVisible ? 'eye-off' : 'eye'}
          size={24}
          color={Colors.primary}
          style={styles.icon}
          onPress={() => setPasswordVisible(!isPasswordVisible)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    width: width-40,
    height: Spacing * 6,
    fontFamily: Font['poppins-regular'],
    fontSize: FontSize.small,
    padding: Spacing * 1.5,
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
    marginVertical: Spacing,
  },
  inputFocused: {
    borderWidth: 3,
    borderColor: Colors.primary,
    shadowOffset: { width: 4, height: Spacing },
    shadowColor: Colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: Spacing,
  },
  icon: {
    position: 'absolute',
    top: '50%',
    right: Spacing,
    transform: [{ translateY: -12 }],
  },
});

export default AppTextInput;
