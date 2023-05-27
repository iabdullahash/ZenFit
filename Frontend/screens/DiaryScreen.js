import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Modal, Pressable } from 'react-native';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import Fonts from '../constants/Fonts';
import FontSize from '../constants/FontSize';


const DiaryScreen = () => {
  const [breakfastItems, setBreakfastItems] = useState([]);
  const [lunchItems, setLunchItems] = useState([]);
  const [dinnerItems, setDinnerItems] = useState([]);
  const [snackItems, setSnackItems] = useState([]);
  const [selectedMealItem, setSelectedMealItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleAddItem = (mealType) => {
    // Generate a random meal item
    const mealItem = {
      name: "Example Meal",
      quantity: "1 serving",
      calories: 350,
    };

    // Add the meal item to the respective meal array based on the meal type
    switch (mealType) {
      case "Breakfast":
        setBreakfastItems([...breakfastItems, mealItem]);
        break;
      case "Lunch":
        setLunchItems([...lunchItems, mealItem]);
        break;
      case "Dinner":
        setDinnerItems([...dinnerItems, mealItem]);
        break;
      case "Snacks":
        setSnackItems([...snackItems, mealItem]);
        break;
      default:
        break;
    }
  };

  const handleCancelAddItem = () => {
    setModalVisible(false);
  }


  const handleConfirmDelete = (mealType, index) => {
    setSelectedMealItem({ mealType, index });
    setModalVisible(true);
  };

    const handleDeleteMealItem = () => {
      if (selectedMealItem) {
        const { mealType, index } = selectedMealItem;
  
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
      }
      setModalVisible(false); // Close the modal
    };

  const renderMealItem = (mealType, mealItems) => {
  
    return (
      <View style={styles.mealSection}>
        <View style={styles.mealBorder}>
          <Text style={styles.mealTitle}>{mealType}</Text>
          <Text style={styles.mealTitle}>0</Text>
        </View>
        <View style={{ ...styles.separator, marginBottom: Spacing, height: 1 }} />
        {mealItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.mealItemContainer}
            onLongPress={() => handleConfirmDelete(mealType, index)}
          >
            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <Text style={styles.mealItemName}>{item.name}</Text>
              <Text style={styles.mealItemDescription}>{item.quantity}</Text>
            </View>
            <Text style={styles.mealItemCalories}>{item.calories} Cal</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddItem(mealType)}
        >
          <Text style={styles.addButtonText}>+ Add Item</Text>
        </TouchableOpacity>
      </View>
    );
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
            <Text style={styles.calorieText}>2,754</Text>
            <Text style={styles.calorieTextspan}>Goal</Text>
          </View>

          <Text style={{ ...styles.calorieText, fontSize: FontSize.large, paddingBottom: Spacing * 1.4 }}>-</Text>

          <View style={styles.calorieCalculation}>
            <Text style={styles.calorieText}>0</Text>
            <Text style={styles.calorieTextspan}>Food</Text>
          </View>

          <Text style={{ ...styles.calorieText, fontSize: FontSize.large, paddingBottom: Spacing * 1.4 }}>+</Text>

          <View style={styles.calorieCalculation}>
            <Text style={styles.calorieText}>0</Text>
            <Text style={styles.calorieTextspan}>Exercise</Text>
          </View>

          <Text style={{ ...styles.calorieText, fontSize: FontSize.large, paddingBottom: Spacing * 1.4 }}>=</Text>

          <View style={styles.calorieCalculation}>
            <Text style={{ ...styles.calorieText, fontSize: FontSize.large, fontFamily: Fonts["poppins-bold"] }}>2754</Text>
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
    fontSize: FontSize.medium,
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
});

export default DiaryScreen;
