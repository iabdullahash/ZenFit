import React, { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import Colors from '../constants/Colors';
import Font from '../constants/Fonts';
import FontSize from '../constants/FontSize';
import IconButton from './IconButton';
import Spacing from '../constants/Spacing';

const AppTextInput = ({ inputMode, ...otherProps }) => {
  const [focused, setFocused] = useState(false);  

  // Determine if the password input should be masked
  const isPasswordInput = inputMode === 'password';
  const [isPasswordVisible, setPasswordVisible] = useState(!isPasswordInput);

  return (
    <View style={styles.container}>
      <TextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholderTextColor={Colors.darkText}
        style={[
          styles.input,
          focused && styles.inputFocused,
        ]}
        secureTextEntry={isPasswordInput && !isPasswordVisible} // Hide the password if inputMode is 'password' and isPasswordVisible is false
        {...otherProps}
      />
      {isPasswordInput && (
        <IconButton
          icon={isPasswordVisible ? 'eye-off' : 'eye'}
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
});

export default AppTextInput;
