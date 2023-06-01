import React, { useState, useEffect,useContext } from 'react';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity,StyleSheet,ScrollView,SafeAreaView,Dimensions } from 'react-native';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { NavigationContainer ,useNavigation} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContext } from '../config/global/UserContext';
import { WebView } from 'react-native-webview';
import { Ionicons, AntDesign,Entypo,MaterialCommunityIcons} from "@expo/vector-icons";
import Spacing from '../constants/Spacing';
import Fonts from '../constants/Fonts';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import { Appbar, IconButton } from 'react-native-paper';
import AppTextInput from '../components/AppTextInput';
import api from '../config/api';

const width = Dimensions.get("window").width;

const Stack = createStackNavigator();


export const SearchScreen = ({ navigation , route}) => {
  const { mealType } = route.params;
  const [foodItems, setFoodItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  

  const searchFood = async () => {
    const consumerKey = 'ad87a6bf699c45efa6f4a06c1b345cc0'; // Replace with your consumer key
    const consumerSecret = '2ee10baa60c64e12b6e5e40af5584a05'; // Replace with your consumer secret
  
    const method = 'foods.search';
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const nonce = Math.random().toString(36).substring(2);
  
    const parameters = {
      oauth_consumer_key: consumerKey,
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: timestamp,
      oauth_nonce: nonce,
      oauth_version: '1.0',
      method: method,
      format: 'json',
      search_expression: searchText,
    };
  
    const parameterString = Object.keys(parameters)
      .sort()
      .map((key) => `${key}=${encodeURIComponent(parameters[key])}`)
      .join('&');
  
    const baseString = `GET&${encodeURIComponent(
      'https://platform.fatsecret.com/rest/server.api'
    )}&${encodeURIComponent(parameterString)}`;
  
    const signature = CryptoJS.HmacSHA1(baseString, `${consumerSecret}&`).toString(
      CryptoJS.enc.Base64
    );
  
    try {
      const response = await axios.get(
        'https://platform.fatsecret.com/rest/server.api',
        {
          params: { ...parameters, oauth_signature: signature },
        }
      );
      
      const {foods}  = response.data;
      setFoodItems(foods.food);
      
    //   console.log(foods)
    } catch (error) {
      console.error(error);
    }
  };
  
  const renderFoodItem = ({ item }) => {
    return (
        <View>
            <TouchableOpacity
                style={styles.foodItem}
                onPress={() => navigation.navigate('FoodDetails', { foodItem: item,mealType: mealType,operation: 'add' })}
            >   
                <View style={{flexDirection:'column'}}>
                <Text style={styles.foodItemText}>{item.food_name || item.food.food_name}</Text>
                <Text style={styles.foodItemCal}>{item.food_description.split('|')[0]}</Text>
                </View>
                <TouchableOpacity style={styles.plusbtn} onPress={() => navigation.navigate('FoodDetails', { foodItem: item ,mealType: mealType,operation: 'add'})}>
                    <Entypo name='plus' style={{backgroundColor:Colors.background,borderRadius:20,padding:6}} color={Colors.primary} size={24}/>
                </TouchableOpacity>
            </TouchableOpacity>
            {/* <View style={{ ...styles.separator, marginBottom: Spacing, height: 1 }} /> */}
        </View>
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
        headerTitle: mealType,
        headerTitleStyle:{color:Colors.primary,fontFamily:Fonts['poppins-bold'],textAlign:'center'},
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{
        backgroundColor: Colors.background,
        flex: 1,
        padding:Spacing*1.6
        // alignItems:'center',
        // justifyContent:'center'
      }}>
        <View style={styles.container}>
          <Text style={styles.heading}>Food Search</Text>

            <View style={styles.container}>
                
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={22} color={'grey'} style={styles.icon} />
                    <TextInput
                    placeholder="Search for a meal"
                    placeholderTextColor={"lightgrey"}
                    value={searchText}
                    onChangeText={setSearchText}
                    onFocus={() =>setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    returnKeyType="search"
                    onSubmitEditing={searchFood}
                    style={isFocused ? {textDecorationLine:"underline",...styles.input} : styles.input }
                    />
                    {searchText !== '' && (
                    <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearButton}>
                        <Ionicons name="close-outline" size={24} color={Colors.primary} />
                    </TouchableOpacity>
                    )}
                </View>
                    {/* <TouchableOpacity style={styles.searchButton} onPress={searchFood}>
                        <Ionicons name='search' style={{padding:Spacing*1.5,alignItems:'center',justifyContent:'center'}} color={Colors.onPrimary} size={24}/>
                    </TouchableOpacity> */}
                {/* </View> */}
                <View style={{ ...styles.separator, marginBottom: Spacing * 1.5 }} />
            <FlatList
                data={foodItems}
                renderItem={renderFoodItem}
                keyExtractor={(item) => item.food_id.toString()}
                contentContainerStyle={{ marginTop: Spacing.medium }}
                showsVerticalScrollIndicator={false}
            />
            </View>
        </View>
    </SafeAreaView>
  );
};


export const FoodDetailsScreen = ({ route }) => {
    const { foodItem,mealType,operation} = route.params;
    console.log(operation)
    const { userData } = useContext(UserContext);
    const { food_description } = foodItem;
    const [quantity,setQuantity] = useState(1)
    const navigation = useNavigation()

    if (!food_description) {
        return null;    
      }
    
    const nutritionValues = food_description.split(' | ');
    const extractNutritionValue = (nutritionString) => {
        if (!nutritionString) {
          return 'N/A'; 
        }
    
        const valueArray = nutritionString.split(':');
        if (valueArray.length >= 2) {
          const value = valueArray[1].trim();
          return value;
        }
    
        return 'N/A';
      };
  
    // Extracted nutrition values
    const servingsize = nutritionValues[0].split('-')[0];
    const calories = extractNutritionValue(nutritionValues[0]);
    const totalFat = extractNutritionValue(nutritionValues[1]);
    // const saturatedFat = extractNutritionValue(nutritionValues[2]);
    // const transFat = extractNutritionValue(nutritionValues[3]);
    // const cholesterol = extractNutritionValue(nutritionValues[4]);
    // const sodium = extractNutritionValue(nutritionValues[5]);
    const totalCarbohydrate = extractNutritionValue(nutritionValues[2]);
    // const dietaryFiber = extractNutritionValue(nutritionValues[7]);
    // const sugars = extractNutritionValue(nutritionValues[8]);
    const protein = extractNutritionValue(nutritionValues[3]);
      
    const handleAddItem = async () => {
      // Generate a random meal item
      try{
        // const mealItem = {
        //   name: "Example Meal",
        //   quantity: 1,
        //   calories: 350,
        //   proteins: 20,
        //   carbs: 30,
        //   fats: 10,
        // };
        console.log(quantity)
        let email = userData.email
  
        const response = await api.post('/add_meal',{mealType,foodItem,quantity,email})
        
        message = await response.data.message
        console.log(message)
        // navigation.popToTop();
        navigation.navigate('Diary')
        // Add the meal item to the respective meal array based on the meal type
      } catch(error){
        console.error('Error adding meal item:', error);
      }  
    };


    React.useLayoutEffect(() => {
        navigation.setOptions({
          title: operation === 'add' ? 'Add Food' : 'Food Details',
          headerRight: () => {
            if (operation === 'add') {

            return(
            <TouchableOpacity style={{paddingRight:Spacing*1.6}} onPress={handleAddItem}>
              <MaterialCommunityIcons name="check" size={24} color="grey" />
            </TouchableOpacity>
            );  
            } else {
              return null;
            }
          },
        });
      }, [navigation,operation]);
    

    
    
    return (
        <ScrollView style={{padding:Spacing*2,...styles.container}}>
          <Text style={styles.food_name_heading}>{foodItem.food_name}</Text>
            <View style={{justifyContent:'space-evenly'}}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingVertical:Spacing,marginBottom:Spacing*3,borderTopWidth:1,borderBottomWidth:1,borderColor:Colors.accent}}>
                <Text style={styles.QuantityText}>
                    Quantity
                </Text>
                <TextInput 
                    placeholder='1'
                    placeholderTextColor={Colors.accent}
                    value={quantity.toString()}
                    onChangeText={setQuantity}
                    keyboardType='number-pad'
                    editable={operation == 'add' ? true : false}
                    // onSubmitEditing={setQuantity}
                    maxLength={4}
                    style={{color:Colors.primary,textAlign:'center',fontSize:FontSize.large,paddingHorizontal:5,borderWidth:1,borderColor:Colors.primary,borderRadius:5}}/>
            </View>
            <View style={styles.card}>
            <Text style={styles.title}>Nutrition Facts</Text>
            <Text style={styles.subtitle}>Serving Size</Text>
            <Text style={styles.text}>{servingsize}</Text>
            <Text style={styles.subtitle}>Amount Per Serving</Text>
            <View style={styles.nutrient}>
                <Text style={styles.nutrientText}>Calories</Text>
                <Text style={styles.nutrientTextValue}>{calories}</Text>
            </View>
            <View style={styles.nutrient}>
                <Text style={styles.nutrientText}>Total Fat</Text>
                <Text style={styles.nutrientTextValue}>{totalFat}</Text>
            </View>
            {/* <View style={styles.nutrient}>
                <Text style={styles.nutrientText}>Saturated Fat</Text>
                <Text style={styles.nutrientTextValue}>{saturatedFat}</Text>
            </View>
            <View style={styles.nutrient}>
                <Text style={styles.nutrientText}>Trans Fat</Text>
                <Text style={styles.nutrientTextValue}>{transFat}</Text>
            </View>
            <View style={styles.nutrient}>
                <Text style={styles.nutrientText}>Cholesterol</Text>
                <Text style={styles.nutrientTextValue}>{cholesterol}</Text>
            </View>
            <View style={styles.nutrient}>
                <Text style={styles.nutrientText}>Sodium</Text>
                <Text style={styles.nutrientTextValue}>{sodium}</Text>
            </View> */}
            <View style={styles.nutrient}>
                <Text style={styles.nutrientText}>Total Carbohydrate</Text>
                <Text style={styles.nutrientTextValue}>{totalCarbohydrate}</Text>
            </View>
            {/* <View style={styles.nutrient}>
                <Text style={styles.nutrientText}>Dietary Fiber</Text>
                <Text style={styles.nutrientTextValue}>{dietaryFiber}</Text>
            </View>
            <View style={styles.nutrient}>
                <Text style={styles.nutrientText}>Sugars</Text>
                <Text style={styles.nutrientTextValue}>{sugars}</Text>
            </View> */}
            <View style={styles.nutrient}>
                <Text style={styles.nutrientText}>Protein</Text>
                <Text style={styles.nutrientTextValue}>{protein}</Text>
            </View>
            <Text style={styles.disclaimer}>
                * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet.
                2,000 calories a day is used for general nutrition advice.
            </Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingVertical:Spacing*2}}>
                <Text style={styles.detailsText}>
                    For more details click </Text>
                <TouchableOpacity  onPress={()=> navigation.navigate('FoodDetailsWeb', { foodItem })}>
                    <Text style={{textDecorationLine:"underline",...styles.detailsText,color:Colors.primary}}>here</Text>
                    </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
    );
  };

// const FoodDetailsScreen = ({ route }) => {
//     const { foodItem } = route.params;
  
//     return (
//       <ScrollView style={styles.container}>
//         <Text style={styles.title}>{foodItem.food_name}</Text>
//         <Text style={styles.brand}>{foodItem.brand_name}</Text>
//         <Text style={styles.description}>{foodItem.food_description}</Text>
//       </ScrollView>
//     );
//   };

export const FoodDetailsWeb = ({ route }) => {
  const { foodItem } = route.params;

  return (
    <WebView
      source={{ uri: foodItem.food_url }}
      style={{ flex: 1 }}
      startInLoadingState
      scalesPageToFit
    />
  );
};

// const App = () => {
//   return (
//       <Stack.Navigator  initialRouteName="Search">
//         <Stack.Screen name="Search" component={SearchScreen} options={{headerStyle:{backgroundColor:Colors.background,},headerTitleStyle:{paddingTop:5,fontFamily:Fonts['poppins-regular'],color:Colors.primary},headerTintColor: 'grey',headerStatusBarHeight:Spacing*3.5}}/>
//         <Stack.Screen name="FoodDetails" component={FoodDetailsScreen} options={{title:'Add Food',headerStyle:{backgroundColor:Colors.background,},headerTitleStyle:{paddingTop:5,fontFamily:Fonts['poppins-regular'],color:Colors.onPrimary},headerTintColor: 'grey',headerStatusBarHeight:Spacing*3.5}} />
//         <Stack.Screen name="FoodDetailsWeb" component={FoodDetailsWeb} />
//       </Stack.Navigator>
//   );
// };


const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: Colors.background,
    // alignItems:'center',
    // justifyContent:'center',
    // /: Spacing * 1.6,
    paddingTop:Spacing,
    },
heading: {
    fontFamily: Fonts["poppins-bold"],
    fontSize: FontSize.xLarge,
    color: Colors.primary,
},
food_name_heading: {
    fontFamily: Fonts["poppins-bold"],
    fontSize: 25,
    color: Colors.primary,
    paddingTop:Spacing*2,
    marginBottom:Spacing*2
},
separator: {
    height: 3,
    alignSelf: 'flex-start',
    padding: 0,
    backgroundColor: Colors.accent,
    marginBottom: 24,
    width: '100%',
    borderRadius: Spacing
    },
searchButton: {
    backgroundColor: Colors.primary,
    height: Spacing*5.5,
    alignSelf:'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Spacing,
    
},
searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    widthv: width-90,
    height: Spacing*5.25,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: Spacing*5.5,
    paddingHorizontal: 10,
    marginBottom:Spacing*2
},
input: {
    flex: 1,
    marginLeft: 10,
    height: 40,
    fontFamily: Fonts["poppins-regular"],
    fontSize:FontSize.medium,
    color:'#fff'
},
icon: {
    
    marginHorizontal: Spacing*0.5,
},
searchButtonText: {
    fontFamily: Fonts["poppins-bold"],
    color: Colors.onPrimary,
    fontSize:18

},
foodItem: {
    backgroundColor:Colors.accent,
    paddingHorizontal:Spacing*2,
    paddingVertical:Spacing*1.4,
    borderRadius: Spacing,
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:Spacing,
},
foodItemText: {
    fontFamily: Fonts["poppins-semiBold"],
    color: Colors.primary,
    fontSize: FontSize.medium,
    textAlign:'left',
    maxWidth:width-90
},
foodItemCal: {
    fontFamily: Fonts["poppins-regular"],
    color: Colors.text,
    fontSize: FontSize.small,
    textAlign:'left'
},
plusbtn: {
    // height:Spacing*3,
    // width:Spacing*3,
    alignItems:'center',
    justifyContent:'center',
    // borderRadius:20,
    // backgroundColor:Colors.background
},
customInput: {
    width: width-90, 
    height: Spacing*5.5,
    borderRadius:Spacing*8,
    backgroundColor:Colors.background,
    color:Colors.text,
    borderWidth:2,
    borderColor:Colors.primary
},
card: {
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 20,
    borderWidth:1,
    borderColor:Colors.onPrimary
},
title: {
    fontSize: FontSize.large,
    fontWeight: 'bold',
    // fontFamily: Fonts["poppins-bold"],
    marginBottom: 10,
    color: Colors.primary,
},
subtitle: {
    fontSize: 16,
    // fontFamily: Fonts["poppins-bold"],
    fontWeight:'bold',
    marginTop: 10,
    marginBottom: 5,
    color: Colors.onPrimary,
},
text: {
    fontSize: 14,
    color: "lightgrey",
},
nutrient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5,
},
nutrientText: {
    flex: 1,
    fontSize: 14,
    // fontFamily: Fonts["poppins-semiBold"],
    color: "lightgrey",
},
nutrientTextValue: {
    fontSize: 14,
    // fontFamily: Fonts["poppins-regular"],/
    color: "lightgrey",
},
disclaimer: {
    fontSize: 12,

    // fontFamily: Fonts["poppins-regular"],
    marginTop: 20,
    color: 'grey',
},
detailsText: {
    alignSelf: 'center',
    fontSize: FontSize.medium,
    fontFamily: Fonts["poppins-regular"],
    color: Colors.onPrimary,
  },
QuantityText: {
    fontSize: FontSize.large,
    fontFamily: Fonts["poppins-semiBold"],
    color: Colors.onPrimary,
},

});
  
// export default App;
// export default {
//     SearchScreen,
//     FoodDetailsScreen,
//     FoodDetailsWeb
// };