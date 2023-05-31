import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import React, {useState,useContext} from "react";
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../config/global/UserContext';
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import AppTextInput from "../components/AppTextInput";
import api from "../config/api/index"



const LoginScreen = () => {

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { updateUser,setLoggedIn } = useContext(UserContext);

  const handleLogin = async () => {
    try {
      const response = await api.post('/login', { email, password });
      console.log(response.data)
      if (response.status === 200) {
        // Successful login
        const data = response.data;
        updateUser(data.result);
        setLoggedIn(true);
        navigation.navigate('Main');
      } else {
        // Other error occurred
        console.log('Login failed');
        Alert.alert('Error', 'Login failed. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        // Request was made and server responded with an error status code
        const errorMessage = error.response.data.message;
        Alert.alert('Error', errorMessage);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error', 'No response from the server. Please try again.');
      } else {
        // Other error occurred
        Alert.alert('Error', 'Login failed. Please try again.');
      }
    }
  };
  
  return (
    <SafeAreaView
    style={{
      backgroundColor: Colors.background,
      flex:1,
      alignItems:'center',
      justifyContent:'center'
      }}>
      <View
        style={{
          padding: Spacing * 2,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              fontFamily: Font["poppins-bold"],
              marginVertical: Spacing * 3,
            }}
          >
            Login here
          </Text>
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              fontSize: FontSize.large,
              color:Colors.text,
              maxWidth: "100%",
              textAlign: "center",
            }}
          >
            Welcome back you've been missed!
          </Text>
        </View>
        <View
          style={{
            marginVertical: Spacing * 3,
            
          }}
        >
          <AppTextInput placeholder="Email" value={email} onChangeText={setEmail} inputMode="email-address"/>
          <AppTextInput placeholder="Password" value={password} onChangeText={setPassword} inputMode='password'/>
        </View>

        <View>
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              fontSize: FontSize.small,
              color: Colors.primary,
              alignSelf: "flex-end",
            }}
          >
            Forgot your password?
          </Text>
        </View>

        <TouchableOpacity onPress={handleLogin}
          style={{
            padding: Spacing*1.5,
            height:Spacing*6,
            backgroundColor: Colors.primary,
            marginVertical: Spacing * 3,
            borderRadius: Spacing,
            shadowColor: Colors.primary,
            shadowOffset: {
              width: 0,
              height: Spacing,
            },
            shadowOpacity: 0.3,
            shadowRadius: Spacing,
          }}
        >
          <Text
            style={{
              fontFamily: Font["poppins-bold"],
              color: Colors.onPrimary,
              textAlign: "center",
              fontSize: FontSize.large,
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Signup")}
          style={{
            padding: Spacing,
          }}
        >
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              color: Colors.text,
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            Create new account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;



