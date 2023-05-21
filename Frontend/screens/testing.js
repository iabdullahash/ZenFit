import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    FlatList,
    Image
  } from "react-native";
  import React from "react";
  import { useNavigation } from '@react-navigation/native';
  import { createStackNavigator } from '@react-navigation/stack';
  import Spacing from "../constants/Spacing";
  import FontSize from "../constants/FontSize";
  import Colors from "../constants/Colors";
  import Font from "../constants/Fonts";
  import { Ionicons } from "@expo/vector-icons";
  import AppTextInput from "../components/AppTextInput";
  import BottomNavbar from "../constants/bottomnav";
 
  
  
  const Stack = createStackNavigator();

  const ArrowButton = ({onPress}) => (
    
    <TouchableOpacity onPress={onPress}>
      <Ionicons name="chevron-back" size={24} color="black" />
    </TouchableOpacity>
  );

  const Testing = () => {
  
    const navigation = useNavigation();

//------------------------------------------------------Flat list-----------------------------------------
    const Flat_data = [
      { id: '1', title: 'Personal Information' , screen:'Personal_info'},
      { id: '2', title: 'Security & Passwords' , screen: ''},
      { id: '3', title: 'Goals' , screen:''},
      
    ];

    const Render_flat_item = ({ item }) => (

      
      <TouchableOpacity onPress={() => navigation.navigate(item.screen, { item })}>
        <View style={{
          flex:1,
          alignitems:'center',
          marginBottom: 10,
          padding: 16,
          width: '100%',
          height: 70,
          backgroundColor: Colors.background,
          borderBottomWidth: 1,
          borderBottomColor: 'lightgray',
        }}>

          <Text style={{
              fontSize: FontSize.medium,
              color: Colors.text,
              fontFamily: Font["poppins-regular"],
              textAlign: "left",
              marginTop: Spacing * 2,
            }}
          >
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
//------------------------------------------------------------------------------------------------------- 


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
                paddingHorizontal: Spacing * 2,
                paddingTop: Spacing * 10,
                width:'100%',
                position: 'absolute',
                top: 0,
                left: 0,
                padding: 16,
            }}
        
        >
          <Text
              style={{
                  fontSize: FontSize.xLarge,
                  color: Colors.primary,
                  top: 0,
                  left: 0,
                  fontFamily: Font["poppins-bold"],
                  // textAlign: "center",
                  marginBottom: Spacing*4
              }}
          >
              Profile

          </Text>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent:'space-between',
              alignItems:'center',


            }}
          >

              <Image
                source = {require('../constants/cow.jpg')}
                style={styles.Image}
              />
              <Text
                style={{
                  fontSize: FontSize.medium,
                  color: Colors.text,
                  fontFamily: Font["poppins-regular"],
                }}
              >
                Holy Cow
                  

              </Text>
          </View>

          <FlatList
            data = {Flat_data}
            renderItem = {Render_flat_item}
            keyExtractor={(item) => item.id}
          />

        </View>
        
        <BottomNavbar />
      </SafeAreaView>
    );
  };



  const Personal_info = () =>{

    const navigation = useNavigation();
    
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
                paddingHorizontal: Spacing * 2,
                paddingTop: Spacing * 8,
                width:'100%',
                position: 'absolute',
                top: 0,
                left: 0,
                padding: 16,
            }}
        
        >
          <Text
              style={{
                  fontSize: FontSize.xLarge,
                  color: Colors.primary,
                  top: 0,
                  left: 0,
                  fontFamily: Font["poppins-bold"],
                  // textAlign: "center",
                  marginBottom: Spacing*3
              }}
          >
              Personal Information

          </Text>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent:'space-between',
              alignItems:'center',


            }}
          >

              <Image
                source = {require('../constants/cow.jpg')}
                style={styles.Image}
              />
              <Text
                style={{
                  fontSize: FontSize.medium,
                  color: Colors.text,
                  fontFamily: Font["poppins-regular"],
                }}
              >
                Holy Cow
                  

              </Text>

          </View>

          <View
           style = {{
            flexDirection: 'column',
            alignItems: 'center',
            

           }}
          >
            <View
              style={{
                paddingTop: Spacing*3,
              }}
            
            >
            <Text
              style = {styles.personal_txt}
            >
              Name
            </Text>

            <AppTextInput placeholder="Holy Cow" inputMode="email-address" />


            </View>

            <View>
            <Text
              style = {styles.personal_txt}
            >
              E-Mail
            </Text>

            <AppTextInput placeholder="holycow@farm.com" inputMode="email-address" />


            </View>
            <View>
            <Text
              style = {styles.personal_txt}
            >
              Age
            </Text>

            <AppTextInput placeholder="21" inputMode="number-pad" />


            </View>
            <View>
            <Text
              style = {styles.personal_txt}
            >
              Height
            </Text>

            <AppTextInput placeholder="180.34 cm" inputMode="number-pad" />


            </View>
            <View>
            <Text
              style = {styles.personal_txt}
            >
              Weight
            </Text>

            <AppTextInput placeholder="68 kg" inputMode="number-pad" />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent:'space-between',
              alignItems:'center',


            }}
          >
            <TouchableOpacity
          style={styles.per_info_btn_back}
        >
          <ArrowButton onPress={() => navigation.navigate("testing")}/>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.per_info_btn_save}
        >
          <Text
            style={{
              fontFamily: Font["poppins-bold"],
              color: Colors.onPrimary,
              textAlign: "center",
              fontSize: FontSize.medium,
            }}
          >
            Save Changes
          </Text>
        </TouchableOpacity>

          </View>

        </View>

      </SafeAreaView>
    );
  }

  const Password_chg = () =>{





  }

  const Goals = () =>{





  }

  const styles = StyleSheet.create({
    Image:{
      marginRight:Spacing*4,
      width: 50,
      height: 50,
      borderRadius:30,
      resizeMode:'contain',
    },
    personal_txt:{
      fontSize: FontSize.small,
      color: Colors.primary,
      fontFamily: Font["poppins-regular"],
      

    },
    per_info_btn_back:{
      padding: Spacing*1.5,
      height:Spacing*6,
      backgroundColor: Colors.primary,
      marginVertical: Spacing * 1,
      borderRadius: Spacing,
      shadowColor: Colors.primary,
      shadowOffset: {
        width: 0,
        height: Spacing,
      },
      shadowOpacity: 0.3,
      shadowRadius: Spacing,
    },
    per_info_btn_save:{
      padding: Spacing*1.5,
      height:Spacing*6,
      backgroundColor: '#878585',
      marginVertical: Spacing * 1,
      borderRadius: Spacing,
      shadowColor: Colors.primary,
      shadowOffset: {
        width: 0,
        height: Spacing,
      },
      shadowOpacity: 0.3,
      shadowRadius: Spacing,
    }

  });

  const App = () => {

    return (
        <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        >
          <Stack.Screen
              name="testing"
              component={Testing}
          />

          <Stack.Screen
            name="Personal_info"
            component={Personal_info} 
          />
          <Stack.Screen
            name="Password_chg"
            component={Password_chg}
            />
          <Stack.Screen
            name="Goals"
            component={Goals}
          />
      
        </Stack.Navigator>
  );
  };

  export default App;
  