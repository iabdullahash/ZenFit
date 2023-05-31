import React, { useState, useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContext, UserProvider } from './config/global/UserContext';
import { useNavigation } from '@react-navigation/native';
import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignupScreen from './screens/SignupScreen';
import Colors from './constants/Colors';
import fonts from './config/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const App = () => {
  const navigation = useNavigation()
  const [fontsLoaded] = useFonts(fonts);
  const { loggedIn, setLoggedIn } = useContext(UserContext);

  useEffect(() => {
    const checkStoredUser = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');

        if (storedUserData) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.log('Error retrieving user data from storage:', error);
      }
    };

    checkStoredUser();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      // Redirect to MainScreen if user is logged in
      navigation.dispatch(StackActions.replace('Main'));
    }
  }, [loggedIn]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={loggedIn ? 'Main' : 'Welcome'}
      >
        {loggedIn ? (
          <Stack.Screen name="Main" component={MainScreen} />
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
      <StatusBar style="light" />
    </View>
  );
};

const WrappedApp = () => (
  <UserProvider>
    <NavigationContainer>
      <App />
    </NavigationContainer>
  </UserProvider>
);

export default WrappedApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
