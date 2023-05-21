import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import{View,Text,StyleSheet,Image} from 'react-native';
import HomeScreen from './HomeScreen';
import MealsScreen from './MealsScreen';
import PlansScreen from './PlansScreen';
import ProfileScreen from './ProfileScreen';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Font from "../constants/Fonts";
import fonts from '../config/fonts';
import FontSize from '../constants/FontSize';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown:false,
      tabBarShowLabel: false,
      tabBarStyle: {
          position: 'absolute',
          bottom: 30,
          left: 15,
          right: 15,
          elevation: 0,
          backgroundColor: Colors.darkText,
          borderRadius: 30,
          borderTopColor:Colors.darkText,
          height: 60,
          ...styles.shadow
        }
    }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon:({focused}) => (
          <View style={styles.view}>
            <Image
              source={require('../assets/images/dashboard.png')}
              resizeMode='contain'
              style={{
                width:20,
                height:20,
                tintColor: focused ? Colors.primary :  Colors.onPrimary,
              }}
              />
              <Text style={{color: focused ? Colors.primary : Colors.onPrimary,...styles.text}}>
                DashBoard
              </Text>
          </View>
        )
      }} />
      <Tab.Screen name="Meals" component={MealsScreen} options={{
        tabBarIcon:({focused}) => (
          <View style={styles.view}>
            <Image
              source={require('../assets/images/diary.png')}
              resizeMode='contain'
              style={{
                width:20,
                height:20,
                tintColor: focused ? Colors.primary :  Colors.onPrimary,
              }}
              />
              <Text style={{color: focused ? Colors.primary : Colors.onPrimary,...styles.text}}>
                Diary
              </Text>
          </View>
        )
      }}  />
      <Tab.Screen name="Plans" component={PlansScreen} options={{
        tabBarIcon:({focused}) => (
          <View style={styles.view}>
            <Image
              source={require('../assets/images/plans.png')}
              resizeMode='contain'
              style={{
                width:20,
                height:20,
                tintColor: focused ? Colors.primary :  Colors.onPrimary,
              }}
              />
              <Text style={{color: focused ? Colors.primary : Colors.onPrimary,...styles.text}}>
                Plans
              </Text>
          </View>
        )
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarIcon:({focused}) => (
          <View style={styles.view}>
            <Image
              source={require('../assets/images/profile.png')}
              resizeMode='contain'
              style={{
                width:20,
                height:20,
                tintColor: focused ? Colors.primary :  Colors.onPrimary,
              }}
              />
              <Text style={{color: focused ? Colors.primary : Colors.onPrimary,...styles.text}}>
                Profile
              </Text>
          </View>
        )
      }} />
    </Tab.Navigator>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  view:{
    alignItems:'center',
    justifyContent:'center',
    top:3
  },
  text:{
    fontFamily: Font["poppins-regular"],
    fontSize: 12
  },
  shadow: {
    shadowColor: Colors.primary,
    shadowOffset: {
      width:0 ,
      height:0
    },
    shadowOpacity:0.25,
    shadowRadiusL: 3.5,
    elevation: 9  
  },
});