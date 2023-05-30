import { StatusBar } from 'expo-status-bar';
import { useFonts } from "expo-font";
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './config/global/UserContext';
import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignupScreen from './screens/SignupScreen';
import ProfileScreen from './screens/ProfileScreen';
import Colors from './constants/Colors';
import fonts from './config/fonts';

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <UserProvider>
    <NavigationContainer>
      <View style={styles.container}>
      
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          {/* <Stack.Screen name="Profile" component={ProfileScreen}/> */}
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
        </Stack.Navigator>
        <StatusBar style="light" />
      </View>
    </NavigationContainer>
    </UserProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
