import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import{View,Text,StyleSheet,Image} from 'react-native';
import HomeScreen from './HomeScreen';
import DiaryScreen from './DiaryScreen';
import PlansScreen from './PlansScreen';
import ProfileScreen from './ProfileScreen';
import Colors from '../constants/Colors';
import { MaterialCommunityIcons , FontAwesome } from '@expo/vector-icons';
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
          // bottom: 30,
          // left: 25,
          // right: 25,
          elevation: 0,
          backgroundColor: Colors.accent,
          borderTopColor:Colors.accent,
          borderTopRightRadius:20,          
          borderTopLeftRadius:20,          
          height: 90,
          ...styles.shadow
        }
    }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon:({focused}) => (
          <View style={styles.view}>
            <MaterialCommunityIcons name={focused ?"view-dashboard" : "view-dashboard-outline"} color={focused ? Colors.primary : Colors.text} size={28} />
            {/* <Image
              source={require('../assets/images/dashboard.png')}
              resizeMode='contain'
              style={{
                width:20,
                height:20,
                tintColor: focused ? Colors.primary :  Colors.onPrimary,
              }}
              /> */}
              <Text style={{color: focused ? Colors.primary : Colors.text,...styles.text}}>
                DashBoard
              </Text>
          </View>
        )
      }} />
      <Tab.Screen name="Meals" component={DiaryScreen} options={{
        tabBarIcon:({focused}) => (
          <View style={styles.view}>
              <MaterialCommunityIcons name={focused ?"food" : "food-outline"} color={focused ? Colors.primary : Colors.text} size={28} />

              <Text style={{color: focused ? Colors.primary : Colors.onPrimary,...styles.text}}>
                Diary
              </Text>
          </View>
        )
      }}  />
      <Tab.Screen name="Plans" component={PlansScreen} options={{
        tabBarIcon:({focused}) => (
          <View style={styles.view}>
                        <MaterialCommunityIcons name={focused ?"clipboard-text" : "clipboard-text-outline"} color={focused ? Colors.primary : Colors.text} size={28} />
              <Text style={{color: focused ? Colors.primary : Colors.onPrimary,...styles.text}}>
                Plans
              </Text>
          </View>
        )
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarIcon:({focused}) => (
          <View style={styles.view}>
            <FontAwesome name={focused ?"user-circle" : "user-circle-o"} color={focused ? Colors.primary : Colors.text} size={28} />
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
    // top:
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
    elevation: 8  
  },
});