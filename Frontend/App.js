import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from "expo-font";
import { StyleSheet, Text, View } from 'react-native';
import  LoginScreen from './screens/LoginScreen'
import  WelcomeScreen from './screens/WelcomeScreen'
import  SignupScreen from './screens/SignupScreen'
import Colors from './constants/Colors';
import fonts from './config/fonts'

const App = () => {
  const [fontsLoaded] = useFonts(fonts);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <SignupScreen/>
      <StatusBar style="auto" />
    </View>
  );
}

export default App


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
