import React, { useState, useContext , useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Modal, Pressable } from 'react-native';
import { UserContext } from '../config/global/UserContext';
import { createStackNavigator } from '@react-navigation/stack';
import { useIsFocused, useNavigation} from '@react-navigation/native';
import {SearchScreen,FoodDetailsScreen,FoodDetailsWeb} from './SearchFood';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import Fonts from '../constants/Fonts';
import FontSize from '../constants/FontSize';
import api from "../config/api/index";
import Animated, {FadeInUp,FadeInDown, FadeInRight , FadeInLeft} from 'react-native-reanimated';

const Stack = createStackNavigator();

const DiaryScreen = () => {
  const { userData } = useContext(UserContext);
  const navigation = useNavigation()

  const isFocused = useIsFocused();

  const [breakfastItems, setBreakfastItems] = useState([]);
  const [lunchItems, setLunchItems] = useState([]);
  const [dinnerItems, setDinnerItems] = useState([]);
  const [snackItems, setSnackItems] = useState([]);
  const [selectedMealItem, setSelectedMealItem] = useState(null);
  const [selectedMealItemInfo, setSelectedMealItemInfo] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchMealData();
  }, [isFocused]);

  const fetchMealData = async () => {
    try {
      let email = userData.email;
      const response = await api.post('/meals',{email});
      console.log(response.data)
      const mealsData = await response.data;

      setBreakfastItems(mealsData.breakfast);
      setLunchItems(mealsData.lunch);
      setDinnerItems(mealsData.dinner);
      setSnackItems(mealsData.snacks);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }

  };

  // const handleAddItem = async (mealType) => {
  //   // Generate a random meal item
  //   try{
  //     const mealItem = {
  //       name: "Example Meal",
  //       quantity: 1,
  //       calories: 350,
  //       proteins: 20,
  //       carbs: 30,
  //       fats: 10,
  //     };

  //     let email = userData.email

  //     switch (mealType) {
  //       case "Breakfast":
  //         setBreakfastItems([...breakfastItems, mealItem]);
  //         break;
  //       case "Lunch":
  //         setLunchItems([...lunchItems, mealItem]);
  //         break;
  //       case "Dinner":
  //         setDinnerItems([...dinnerItems, mealItem]);
  //         break;
  //       case "Snacks":
  //         setSnackItems([...snackItems, mealItem]);
  //         break;
  //       default:
  //         break;
  //     }
  //     const response = await api.post('/add_meal',{mealType,mealItem,email})
      
  //     message = await response.data.message
  //     console.log(message)
  //     // Add the meal item to the respective meal array based on the meal type
  //   } catch(error){
  //     console.error('Error adding meal item:', error);
  //   }  
  // };



  const handleConfirmDelete = (mealType, index) => {
    const mealItem = getMealItemByType(mealType, index);
    setSelectedMealItem({ mealType, index });
    setSelectedMealItemInfo(mealItem);
    setModalVisible(true);
  };

    const handleDeleteMealItem = async () => {
      if (selectedMealItem) {

       try {
          const { mealType, index } = selectedMealItem;
        let email = userData.email
        const response = await api.post('/delete_meal',{mealType,index,email})

        const message = response.data.message
        console.log(message)
  
        switch (mealType) {
          case "Breakfast":
            const updatedBreakfastItems = [...breakfastItems];
            updatedBreakfastItems.splice(index, 1);
            setBreakfastItems(updatedBreakfastItems);
            break;
          case "Lunch":
            const updatedLunchItems = [...lunchItems];
            updatedLunchItems.splice(index, 1);
            setLunchItems(updatedLunchItems);
            break;
          case "Dinner":
            const updatedDinnerItems = [...dinnerItems];
            updatedDinnerItems.splice(index, 1);
            setDinnerItems(updatedDinnerItems);
            break;
          case "Snacks":
            const updatedSnackItems = [...snackItems];
            updatedSnackItems.splice(index, 1);
            setSnackItems(updatedSnackItems);
            break;
          default:
            break;
        }
  
        setSelectedMealItem(null);
      } catch(error){
        console.error('Error deleting meal item:', error);
      }
      }
      setModalVisible(false); // Close the modal
    };
  
  const getMealItemByType = (mealType, index) => {
      let mealItems;
      switch (mealType) {
        case "Breakfast":
          mealItems = breakfastItems;
          break;
        case "Lunch":
          mealItems = lunchItems;
          break;
        case "Dinner":
          mealItems = dinnerItems;
          break;
        case "Snacks":
          mealItems = snackItems;
          break;
        default:
          return null;
      }
      return mealItems[index];
    };
  
    
    const renderMealItem = (mealType, mealItems) => {
      const totalCalories = mealItems.reduce((sum, item) => sum + (parseInt(item.info.food_description.split('|')[0].split('-')[1].split(':')[1])*item.quantity), 0);
    
    
      return (
        <View style={styles.mealSection}>
          <View style={styles.mealBorder}>
            <Text style={styles.mealTitle}>{mealType}</Text>
            <Text style={styles.mealTitle}>{totalCalories}</Text>
          </View>
          <View style={{ ...styles.separator, marginBottom: Spacing, height: 1 }} />
          {mealItems.map((item, index) => (
            <Animated.View entering={FadeInLeft.delay(400).duration(500)} exiting={FadeInRight.delay(400).duration(500)} key={index}>
            <TouchableOpacity
              key={index}
              style={styles.mealItemContainer}
              onLongPress={() => handleConfirmDelete(mealType, index)}
              onPress={() => navigation.navigate('FoodDetails', { foodItem: item.info ,mealType: mealType,operation: 'view'})}
            >
              <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text style={styles.mealItemName}>{item.info.food_name}</Text>
                <Text style={styles.mealItemDescription}>{item.quantity} serving</Text>
              </View>
              <Text style={styles.mealItemCalories}>{parseInt(item.info.food_description.split('|')[0].split('-')[1].split(':')[1])*item.quantity} Cal</Text>
            </TouchableOpacity>
            </Animated.View>
          ))}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('Search',{mealType})}
          >
            <Text style={styles.addButtonText}>+ Add Item</Text>
          </TouchableOpacity>
  
        </View>
      );
    };
    

  const getTotalCalories = () => {
    const breakfastCalories = breakfastItems.reduce((sum, item) => sum + (parseInt(item.info.food_description.split('|')[0].split('-')[1].split(':')[1])*item.quantity), 0);
    const lunchCalories = lunchItems.reduce((sum, item) => sum + (parseInt(item.info.food_description.split('|')[0].split('-')[1].split(':')[1])*item.quantity), 0);
    const dinnerCalories = dinnerItems.reduce((sum, item) => sum + (parseInt(item.info.food_description.split('|')[0].split('-')[1].split(':')[1])*item.quantity), 0);
    const snackCalories = snackItems.reduce((sum, item) => sum + (parseInt(item.info.food_description.split('|')[0].split('-')[1].split(':')[1])*item.quantity), 0);

    return breakfastCalories + lunchCalories + dinnerCalories + snackCalories;
  };

  const getRemainingCalories = () => {
    const goalCalories = userData.goals.requiredCalories; 
    const foodCalories = getTotalCalories();
    const exerciseCalories = 0; 

    return goalCalories - foodCalories + exerciseCalories;
  };

  return (
    <SafeAreaView style={{
      backgroundColor: Colors.background,
      flex: 1,
    }}>
      <View style={styles.container}>
        <Text style={styles.heading}>Diary</Text>

        <View style={{ ...styles.separator, marginBottom: Spacing * 1.5 }} />
        <Text style={{ ...styles.mealTitle, borderBottomWidth: 0 }}>Calories Remaining</Text>
        <View style={styles.calorieSection}>
          <View style={styles.calorieCalculation}>
            <Text style={styles.calorieText}>{userData.goals.requiredCalories}</Text>
            <Text style={styles.calorieTextspan}>Goal</Text>
          </View>

          <Text style={{ ...styles.calorieText, fontSize: FontSize.large, paddingBottom: Spacing * 1.4 }}>-</Text>

          <View style={styles.calorieCalculation}>
            <Text style={styles.calorieText}>{getTotalCalories()}</Text>
            <Text style={styles.calorieTextspan}>Food</Text>
          </View>

          <Text style={{ ...styles.calorieText, fontSize: FontSize.large, paddingBottom: Spacing * 1.4 }}>+</Text>

          <View style={styles.calorieCalculation}>
            <Text style={styles.calorieText}>0</Text>
            <Text style={styles.calorieTextspan}>Exercise</Text>
          </View>

          <Text style={{ ...styles.calorieText, fontSize: FontSize.large, paddingBottom: Spacing * 1.4 }}>=</Text>

          <View style={styles.calorieCalculation}>
            <Text style={{ ...styles.calorieText, fontSize: FontSize.large, fontFamily: Fonts["poppins-bold"] }}>{getRemainingCalories()}</Text>
            <Text style={styles.calorieTextspan}>Remaining</Text>
          </View>
        </View>

        <View style={{ ...styles.separator, marginBottom: Spacing * 1.5 }} />
        <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>

          {renderMealItem('Breakfast', breakfastItems)}

          {renderMealItem('Lunch', lunchItems)}

          {renderMealItem('Dinner', dinnerItems)}

          {renderMealItem('Snacks', snackItems)}

        </ScrollView>
      </View>

        <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Item</Text>
            <Text style={{...styles.mealItemName,marginBottom:Spacing}}>Are you sure you want to delete this item?</Text> 
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setModalVisible(false)} 
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonSave]}
                onPress={handleDeleteMealItem}
              >
                <Text style={styles.modalButtonText}>Yes</Text> 
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const App = () => {
  return (
      <Stack.Navigator  initialRouteName="Diary">
        <Stack.Screen name="Diary" component={DiaryScreen} options={{headerShown:false}} />
        <Stack.Screen name="Search" component={SearchScreen}  options={{headerStyle:{backgroundColor:Colors.background,},headerTitleStyle:{paddingTop:5,fontFamily:Fonts['poppins-regular'],color:Colors.primary},headerTintColor: 'grey',headerStatusBarHeight:Spacing*3.5, tabBarVisible: false}}/>
        <Stack.Screen name="FoodDetails" component={FoodDetailsScreen} options={{title:'Add Food',headerStyle:{backgroundColor:Colors.background,},headerTitleStyle:{paddingTop:5,fontFamily:Fonts['poppins-regular'],color:Colors.onPrimary},headerTintColor: 'grey',headerStatusBarHeight:Spacing*3.5,tabBarVisible: false}} />
        <Stack.Screen name="FoodDetailsWeb" component={FoodDetailsWeb}  options={{title:'Food Details',headerStyle:{backgroundColor:Colors.background,},headerTitleStyle:{paddingTop:5,fontFamily:Fonts['poppins-regular'],color:Colors.onPrimary},headerTintColor: 'grey',headerStatusBarHeight:Spacing*3.5,tabBarVisible: false, tabBarVisible: false}} />
      </Stack.Navigator>
  );
};


const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing * 1.6,
    paddingTop: Spacing * 6,
    paddingBottom: Spacing * 8
  },
  calorieSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: Spacing * 2.4,
  },
  calorieCalculation: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  calorieText: {
    fontFamily: Fonts["poppins-regular"],
    fontSize: FontSize.medium,
    color: Colors.text
  },
  calorieTextspan: {
    fontFamily: Fonts["poppins-regular"],
    fontSize: FontSize.small,
    color: Colors.primary
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
  heading: {
    fontFamily: Fonts["poppins-bold"],
    fontSize: FontSize.xLarge,
    color: Colors.primary,
    marginBottom: Spacing * 1.6,
  },
  mealSection: {
    marginBottom: Spacing * 2.4,
  },
  mealBorder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mealTitle: {
    fontFamily: Fonts["poppins-bold"],
    fontSize: 18,
    color: Colors.text,
    marginBottom: Spacing * 0.8,
  },
  mealItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing * 0.8,
    paddingVertical: Spacing,
    paddingHorizontal: Spacing * 1.6,
    borderRadius: 8,
    backgroundColor: Colors.lightBackground,
  },
  mealItemName: {
    fontFamily: Fonts["poppins-regular"],
    fontSize: FontSize.small,
    color: Colors.text,
    maxWidth:250
  },
  mealItemDescription: {
    fontFamily: Fonts["poppins-regular"],
    fontSize: 13,
    color: "grey",
  },
  mealItemCalories: {
    fontFamily: Fonts["poppins-regular"],
    fontSize: FontSize.small,
    color: Colors.text,
  },
  addButton: {
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    fontFamily: Fonts["poppins-bold"],
    fontSize: FontSize.small,
    color: Colors.primary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.background,
    padding: Spacing * 1.6,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontFamily: Fonts['poppins-bold'],
    fontSize: FontSize.large,
    color: Colors.primary,
    marginBottom: Spacing * 1.2,
  },
  modalInput: {
    fontFamily: Fonts['poppins-regular'],
    fontSize: FontSize.small,
    paddingVertical: Spacing,
    paddingHorizontal: Spacing * 1.2,
    borderColor: Colors.accent,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: Spacing,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    marginLeft: Spacing * 1.2,
    paddingHorizontal: Spacing * 1.6,
    paddingVertical: Spacing,
    borderRadius: 4,
  },
  modalButtonCancel: {
    backgroundColor: Colors.accent,
  },
  modalButtonSave: {
    backgroundColor: Colors.primary,
  },
  modalButtonText: {
    fontFamily: Fonts['poppins-bold'],
    fontSize: FontSize.small,
    color: Colors.background,
  },
  modelinfotext: {
    fontFamily: Fonts['poppins-semiBold'],
    fontSize: FontSize.medium,
    color:Colors.onPrimary,
    marginVertical:Spacing*0.5
  },
  modelinfotextspan: {
    fontFamily: Fonts['poppins-regular'],
    fontSize: FontSize.small,
    color:Colors.primary
  },

  closeButton: {
    alignSelf: 'flex-end',
    marginTop: Spacing * 1.2,
  },
  closeButtonText: {
    fontFamily: Fonts['poppins-bold'],
    fontSize: FontSize.small,
    color: Colors.primary,
  },
});

export default DiaryScreen;
