import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    FlatList,
    ScrollView,
    Image
  } from "react-native";
  import React from "react";
  import {useState} from "react";
  import { useNavigation } from '@react-navigation/native';
  import { createStackNavigator } from '@react-navigation/stack';
  import Spacing from "../constants/Spacing";
  import FontSize from "../constants/FontSize";
  import Colors from "../constants/Colors";
  import Font from "../constants/Fonts";
  import { Ionicons } from "@expo/vector-icons";
  import AppTextInput from "../components/AppTextInput";
  import api from "../config/api/index";
  import {useContext} from 'react';
  import { UserContext } from '../config/global/UserContext';
 
  
  
  const Stack = createStackNavigator();

  const ArrowButton = ({onPress}) => (
    
    <TouchableOpacity onPress={onPress}>
      <Ionicons name="chevron-back" size={24} color="black" />
    </TouchableOpacity>
  );

  const ProfileScreen = () => {
  
    const navigation = useNavigation();
    const { userData , clearUserContext } = useContext(UserContext);
    const handleLogout = () => {
      // clearUserContext();
      // navigation.navigate('Welcome');
    };

//------------------------------------------------------Flat list-----------------------------------------
    const Flat_data = [
      { id: '1', title: 'Personal Information' , screen:'Personal_info'},
      { id: '2', title: 'Security & Passwords' , screen: 'Password_chg'},
      { id: '3', title: 'Goals' , screen:'Goals'},
      
    ];

    const Render_flat_item = ({ item }) => (

      
      <TouchableOpacity onPress={() => navigation.navigate(item.screen, { item })}>
        <View style={{
          flex:1,
          alignitems:'center',
          marginTop:15,
          padding: 16,
          width: '100%',
          height: 70,
          backgroundColor: Colors.background,
          borderBottomWidth: 1,
          borderBottomColor: 'lightgray',
          // paddingBottom:Spacing*1
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

        }}>
        
        <View
            style={
               {width:'100%',
                paddingHorizontal: Spacing * 2,
                paddingTop: Spacing * 8,
                paddingBottom: Spacing * 5,
              }
            }
        
        >
          <Text
              style={styles.title}
          >
              Profile

          </Text>
          <View
            style={[styles.infoContainer,{paddingBottom:Spacing*1,paddingTop:Spacing*2}]}
          >

              <Image
                source = {require('../assets/images/cow.jpg')}
                style={styles.Image}
              />
              <Text
                style={{
                  fontSize: FontSize.medium,
                  color: Colors.text,
                  fontFamily: Font["poppins-regular"],
                }}
              >
                {/* {userData.name} */}
                HOLY MOLY JESUS CROSS
                  

              </Text>
          </View>

          <FlatList
            data = {Flat_data}
            renderItem = {Render_flat_item}
            keyExtractor={(item) => item.id}
          />
          <View>
          <TouchableOpacity
          style={styles.Logout_btn} onPress={handleLogout}
        >
          <Text
            style={{
              fontFamily: Font["poppins-bold"],
              color: Colors.onPrimary,
              textAlign: "center",
              fontSize: FontSize.medium,
            }}
          >
            Log Out
          </Text>
        </TouchableOpacity>
          </View>

        </View>
        
      </SafeAreaView>
    );
  };



    const Personal_info = () =>{

      const navigation = useNavigation();
      const { userData } = useContext(UserContext);
      
      return (
        <SafeAreaView
        style={{
          backgroundColor: Colors.background,
          flex:1, 
          }}
          >

        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View
              style={ styles.contentContainer}
          
          >
            <Text
                style={ styles.title }
            >
                Personal Information

            </Text>
            <View
              style={ styles.infoContainer}
            >

                <Image
                  source = {require('../assets/images/cow.jpg')}
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

              <AppTextInput placeholder="Holy Cow" value={userData.name} inputMode="email-address" />


              </View>

              <View>
              <Text
                style = {styles.personal_txt}
              >
                E-Mail
              </Text>

              <AppTextInput placeholder="holycow@farm.com" value={userData.email} inputMode="email-address" />


              </View>
              <View>
              <Text
                style = {styles.personal_txt}
              >
                Age
              </Text>

              <AppTextInput placeholder="21" value={userData.age.toString()} inputMode="number-pad" />


              </View>
              <View>
              <Text
                style = {styles.personal_txt}
              >
                Height
              </Text>

              <AppTextInput placeholder="180.34 cm" value={userData.height.toString() + " cm"} inputMode="number-pad" />


              </View>
              <View>
              <Text
                style = {styles.personal_txt}
              >
                Weight
              </Text>

              <AppTextInput placeholder="68 kg" value={userData.weight.toString() + " kg"} inputMode="number-pad" />
              </View>
            </View>
            <View
              style={styles.buttonContainer}
            
            >
              <TouchableOpacity
            style={styles.backButton
              // styles.per_info_btn_back
            }
          >
            <ArrowButton onPress={() => navigation.navigate("Profile_")}/>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.saveButton
              // styles.per_info_btn_save
            }
          >
            <Text
              style={styles.saveButtonText}
            >
              Save Changes
            </Text>
          </TouchableOpacity>

            </View>

          </View>
          <View style={{ paddingBottom: Spacing*5 }}/>
        </ScrollView>
      </SafeAreaView>
      );
    };

  const Password_chg = () =>{

    const navigation = useNavigation();
    const { userData } = useContext(UserContext);
    const [old_pass, set_old_pass] = useState('');
    const [new_pass, set_new_pass] = useState('');
    const [confirm_pass, set_confirm_pass] = useState('');

    const pass_chng = async () => {
      try {
        const response = await api.post('/pass_chg', {
          old_password: old_pass,
          new_password: new_pass,
          confirm_password: confirm_pass
        });
    
        if (response.status === 200) {
          // Password updated successfully
          console.log(response.data);
          navigation.navigate('Profile_');
        } else {
          // Other error occurred
          const data = response.data;
          console.log('Password change failed');
          Alert.alert('Error', 'Password change failed. Please try again.');
        }
      } catch (error) {
        if (error.response) {
          // Request was made and server responded with an error status code
          const errorMessage = error.response.data.message;
          Alert.alert('Error', errorMessage);
        } else if (error.request) {
          // The request was made but no response was received
          Alert.alert('Error', 'No response from the server. Please try again.');
        } else {
          // Other error occurred
          Alert.alert('Error', 'Password change failed. Please try again.');
        }
      }
    };

    
    return (
      <SafeAreaView
      style={{
        backgroundColor: Colors.background,
        flex:1,
        }}>
        
        <View
            style={styles.contentContainer}
        
        >
          <Text
              style={styles.title}
          >
              Security & Password

          </Text>
          <View
            style={styles.infoContainer}
          >

              <Image
                source = {require('../assets/images/cow.jpg')}
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
              Old Password
            </Text>

            <AppTextInput placeholder="Password" inputMode="email-address" value={old_pass} onChangeText={set_old_pass} />


            </View>

            <View>
            <Text
              style = {styles.personal_txt}
            >
              New Password
            </Text>

            <AppTextInput placeholder="New Password" inputMode="email-address" value={new_pass} onChangeText={set_new_pass} />


            </View>

            <View>
            <Text
              style = {styles.personal_txt}
            >
              Confirm Password
            </Text>

            <AppTextInput placeholder="Confirm Password" inputMode="email-address" value={confirm_pass} onChangeText={set_confirm_pass} />


            </View>
          

          </View>
          <View
            style={styles.buttonContainer}
          >
            <TouchableOpacity
          style={styles.backButton}
        >
          <ArrowButton onPress={() => navigation.navigate('Profile_')}/>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.saveButton} onPress={pass_chng}
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

  };

  const Goals = () =>{
    const navigation = useNavigation();
    
    return (
      <SafeAreaView
      style={{
        backgroundColor: Colors.background,
        flex:1,
        }}>
        <View
            style={styles.contentContainer}
        
        >
          <Text
              style={styles.title}
          >
              Goals

          </Text>
          <View
            style={styles.infoContainer}
          >

              <Image
                source = {require('../assets/images/cow.jpg')}
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
            

           }}
          >
            <View
              style={{
                paddingTop: Spacing*3,
                paddingBottom:Spacing*3,
                alignItems: 'center',
              }}
            
            >
            <Text
              style = {{
                fontSize: FontSize.xxLarge,
                color: Colors.primary,
                fontFamily: Font["poppins-regular"],
              }}
            >
              10,000

            </Text>
            </View>

            <View>
            <Text
              style = {styles.personal_txt}
            >
              Change steps
            </Text>

            <AppTextInput placeholder="" inputMode="email-address" />


            </View>

            <View>
            <Text
              style = {[styles.personal_txt,
                {paddingTop: Spacing*2,
                paddingBottom:Spacing*2,}]}
            >
              Calories burnt
            </Text>

            <Text
              style = {{
                fontSize: FontSize.xxLarge,
                color: Colors.primary,
                fontFamily: Font["poppins-regular"],
                textAlign: 'center'
              }}
            >
              ------
            </Text>


            </View>
          

          </View>
          <View
            style={styles.buttonContainer}
          >
            <TouchableOpacity
          style={styles.backButton}
        >
          <ArrowButton onPress={() => navigation.navigate("Profile_")}/>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.saveButton}
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

  };

  const styles = StyleSheet.create({

    scrollViewContainer: {
      flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    },
    Image:{
      marginRight:Spacing*2,
      width: 50,
      height: 50,
      borderRadius:30,
      resizeMode:'contain',
    },
    contentContainer: {
      width:'100%',
      paddingHorizontal: Spacing * 2,
      paddingTop: Spacing * 8,
      paddingBottom: Spacing * 5,
      alignItems: 'center',
    },
    title: {
      alignSelf:'flex-start',
      fontSize: FontSize.xLarge,
      color: Colors.primary,
      fontFamily: Font['poppins-bold'],
      marginBottom: Spacing * 3,
    },
    infoContainer: {
      flexDirection: 'row',
      // alignSelf: 'flex-start',
      alignItems:'center',
      alignSelf: 'flex-start'
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems:'center',
      width: '100%',
      justifyContent: 'space-between',
      paddingTop: Spacing * 3,
    },
    backButton: {
      padding: Spacing * 1.5,
      height: Spacing * 6,
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
    saveButton: {
      padding: Spacing * 1.5,
      height: Spacing * 6,
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
    saveButtonText: {
      fontFamily: Font['poppins-bold'],
      color: Colors.onPrimary,
      textAlign: 'center',
      fontSize: FontSize.medium,
    },
    personal_txt:{
      fontSize: FontSize.small,
      color: Colors.primary,
      fontFamily: Font["poppins-regular"]},

      Logout_btn: {
        padding: Spacing * 1.5,
        height: Spacing * 6,
        backgroundColor: 'red',
        marginVertical: Spacing * 5,
        borderRadius: Spacing,
        shadowColor: Colors.primary,
        shadowOffset: {
          width: 0,
          height: Spacing,
        },
        shadowOpacity: 0.3,
        shadowRadius: Spacing,
      },


  });

  const App = () => {

    return (
        <Stack.Navigator
        screenOptions={{headerShown:false}}>
          <Stack.Screen
              name="Profile_"
              component={ProfileScreen}
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
  