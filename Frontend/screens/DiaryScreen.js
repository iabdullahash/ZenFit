import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity , SafeAreaView,ScrollView} from 'react-native';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import Fonts from '../constants/Fonts';
import FontSize from '../constants/FontSize';


const DiaryScreen = () => {
  const [breakfastItems, setBreakfastItems] = useState([]);
  const [lunchItems, setLunchItems] = useState([]);
  const [dinnerItems, setDinnerItems] = useState([]);
  const [snackItems, setSnackItems] = useState(["ash","ghhf","fdfdgd"]);

  const handleAddItem = (mealType) => {
    // Handle logic to add items to the respective meal arrays
  };

  return (
    <SafeAreaView style={{
      backgroundColor:Colors.background,
      flex:1,
    }}>
    <View style={styles.container}>
      <Text style={styles.heading}>Diary</Text>

      <View style={{...styles.separator,marginBottom:Spacing*1.5}} />
      <Text style={{...styles.mealTitle,borderBottomWidth:0}}>Calories Remaining</Text>
      <View style={styles.calorieSection}>
        <View style={styles.calorieCalculation}>
              <Text style={styles.calorieText}>2,754</Text>
              <Text style={styles.calorieTextspan}>Goal</Text>
        </View>

        <Text style={{...styles.calorieText,fontSize: FontSize.large,paddingBottom:Spacing*1.4}}>-</Text>

        <View style={styles.calorieCalculation}>
              <Text style={styles.calorieText}>0</Text>
              <Text style={styles.calorieTextspan}>Food</Text>
        </View>

        <Text style={{...styles.calorieText,fontSize: FontSize.large,paddingBottom:Spacing*1.4}}>+</Text>
        
        <View style={styles.calorieCalculation}>
              <Text style={styles.calorieText}>0</Text>
              <Text style={styles.calorieTextspan}>Exercise</Text>
        </View>

        <Text style={{...styles.calorieText,fontSize: FontSize.large,paddingBottom:Spacing*1.4}}>=</Text>

        <View style={styles.calorieCalculation}>
              <Text style={{...styles.calorieText,fontSize:FontSize.large, fontFamily:Fonts["poppins-bold"]}}>2754</Text>
              <Text style={styles.calorieTextspan}>Remaining</Text>
        </View>
      </View>

      <View style={styles.separator} />
      <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>

      <View style={styles.mealSection}>
        <View style={styles.mealBorder}>
          <Text style={styles.mealTitle}>Breakfast</Text>
          <Text style={styles.mealTitle}>0</Text>
        </View>
              <View style={{...styles.separator,height:1.5}} />

        {breakfastItems.map((item, index) => (
          <Text key={index} style={styles.mealItem}>{item}</Text>
        ))}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddItem('breakfast')}
        >
          <Text style={styles.addButtonText}>+ Add Item</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mealSection}>
      <View style={styles.mealBorder}>
          <Text style={styles.mealTitle}>Lunch</Text>
          <Text style={styles.mealTitle}>0</Text>
        </View>
              <View style={{...styles.separator,height:1.5}} />
        {lunchItems.map((item, index) => (
          <Text key={index} style={styles.mealItem}>{item}</Text>
        ))}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddItem('lunch')}
        >
          <Text style={styles.addButtonText}>+ Add Item</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mealSection}>
      <View style={styles.mealBorder}>
          <Text style={styles.mealTitle}>Dinner</Text>
          <Text style={styles.mealTitle}>0</Text>
        </View>
              <View style={{...styles.separator,height:1.5}} />
        {dinnerItems.map((item, index) => (
          <Text key={index} style={styles.mealItem}>{item}</Text>
        ))}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddItem('dinner')}
        >
          <Text style={styles.addButtonText}>+ Add Item</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mealSection}>
      <View style={styles.mealBorder}>
          <Text style={styles.mealTitle}>Snacks</Text>
          <Text style={styles.mealTitle}>0</Text>
        </View>
              <View style={{...styles.separator,height:1.5}} />
        {snackItems.map((item, index) => (
          <Text key={index} style={styles.mealItem}>{item}</Text>
        ))}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddItem('snack')}
        >
          <Text style={styles.addButtonText}>+ Add Item</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  // alignItems: 'center',
  // justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing*1.6,
    paddingTop: Spacing*6,
    paddingBottom:Spacing*8
  },
  calorieSection:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-around',
    marginBottom: Spacing*2.4,
  },
  calorieCalculation:{
    flexDirection:'column',
    alignItems:'center',
    alignSelf:'flex-end',
    // paddingTop:Spacing*1.5
  },
  calorieText:{
    fontFamily:Fonts["poppins-regular"],
    fontSize:FontSize.medium,
    color:Colors.text
  },
  calorieTextspan:{
    fontFamily:Fonts["poppins-regular"],
    fontSize:FontSize.small,
    color:Colors.primary
  },
  separator: {
    height: 3,
    alignSelf:'flex-start',
    padding:0,
    backgroundColor: Colors.accent,
    marginBottom: 24,
    width: '100%',
    borderRadius:Spacing
  },
  heading: {
    fontFamily: Fonts["poppins-bold"],
    fontSize: FontSize.xLarge,
    color: Colors.primary,
    marginBottom: Spacing*1.6,
  },
  mealSection: {
    marginBottom: Spacing*2.4,
  },
  mealBorder:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    // borderBottomWidth:3,
    // borderBottomColor:Colors.accent,
    
  },
  mealTitle: {
    fontFamily: Fonts["poppins-bold"],
    fontSize: 18,
    color: Colors.text,
    marginBottom: Spacing*0.8,
    // borderBottomWidth:3,
    
    // borderBottomColor:Colors.accent
  },
  mealItem: {
    fontFamily: Fonts["poppins-bold"],
    fontSize: Spacing*1.6,
    color: Colors.text,
    marginBottom: 4,
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
});

export default DiaryScreen;
