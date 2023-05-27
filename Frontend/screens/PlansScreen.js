import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import Fonts from '../constants/Fonts';
import FontSize from '../constants/FontSize';
// 
const Stack = createStackNavigator();


const PlansScreen = () => {
  const navigation = useNavigation();
  const [mealPlans, setMealPlans] = useState([]);
  const [workoutPlans, setWorkoutPlans] = useState([]);

  const fetchMealPlans = async () => {
    try {
      const response = await fetch('http://192.168.100.56:5000/api/meal_plans');
      const data = await response.json();
      setMealPlans(data);
    } catch (error) {
      console.error('Error fetching meal plans:', error);
    }
  };

  const fetchWorkoutPlans = async () => {
    try {
      const response = await fetch('http://192.168.100.56:5000/api/workout_plans');
      const data = await response.json();
      setWorkoutPlans(data);
    } catch (error) {
      console.error('Error fetching workout plans:', error);
    }
  };

  useEffect(() => {
    fetchMealPlans();
    fetchWorkoutPlans();
  }, []);

  const [filter, setFilter] = useState('All Plans');

  const handlePlanPress = (plan) => {
    navigation.navigate('PlanDetails', { plan });
  };

  const PlanDetailsScreen = ({ route }) => {
    const { plan } = route.params;

    return (
      <SafeAreaView style={{
        backgroundColor: Colors.background,
        flex: 1,
      }}>
        <View style={styles.detailsContainer}>
        <ScrollView style={styles.scrollViewContainer}>
          <Image source={{ uri: plan.image }} style={styles.detailsImage} />
          <View style={styles.detailsContent}>
            <Text style={styles.detailsTitle}>{plan.title}</Text>
            <Text style={styles.detailsDescription}>{plan.details}</Text>
          </View>
          {plan.meals && (
            <View style={styles.mealsContainer}>
              <Text style={styles.mealsTitle}>Weekly Meals</Text>
              {plan.meals.map((meal, index) => (
                <View key={index} style={styles.mealItem}>
                  <Text style={styles.mealDay}>{meal.day}</Text>
                  <Text style={styles.mealType}>Breakfast: <Text style={styles.mealTypeinfo}>{meal.breakfast}</Text></Text>
                  <Text style={styles.mealType}>Lunch: <Text style={styles.mealTypeinfo}>{meal.lunch}</Text></Text>
                  <Text style={styles.mealType}>Dinner: <Text style={styles.mealTypeinfo}>{meal.dinner}</Text></Text>
                  <Text style={styles.snacksTitle}>Snacks:</Text>
                  {meal.snacks.map((snack, snackIndex) => (
                    <Text key={snackIndex} style={styles.snackItem}>{snack}</Text>
                  ))}
                </View>
              ))}
            </View>
          )}
          {plan.workouts && (
            <View style={styles.workoutsContainer}>
              <Text style={styles.workoutsTitle}>Workouts</Text>
              {plan.workouts.map((workout, index) => (
                <View key={index} style={styles.workoutItem}>
                  <Text style={styles.workoutDay}>{workout.day}</Text>
                  <Text style={styles.workoutType}>{workout.type}</Text>
                  {workout.exercises.map((exercise, exerciseIndex) => (
                    <View key={exerciseIndex} style={styles.exerciseItem}>
                      <Text style={styles.exerciseName}>{exercise.name}</Text>
                      {exercise.sets && exercise.reps ? (
                        <Text style={styles.exerciseSetsReps}>
                          Sets: {exercise.sets}, Reps: {exercise.reps}
                        </Text>
                      ) : (
                        <Text style={styles.exerciseDuration}>Duration: {exercise.duration}</Text>
                      )}
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}
        </ScrollView>
        </View>
      </SafeAreaView>
    );
  };


  const PlansListScreen = () => {
    const allPlans = [...mealPlans, ...workoutPlans];

    const filteredPlans = filter === 'All Plans' ? allPlans :
      filter === 'Meal Plans' ? mealPlans :
      workoutPlans;

    const renderPlan = ({ item }) => (
      <TouchableOpacity style={styles.planContainer} onPress={() => handlePlanPress(item)}>
        <Image source={{uri : item.image}} style={styles.planImage} />
        <Text style={styles.planTitle}>{item.title}</Text>
        <Text style={styles.planDescription}>{item.description}</Text>
      </TouchableOpacity>
    );

    return (
      <SafeAreaView style={{
        backgroundColor: Colors.background,
        flex: 1,
        // alignItems:'center',
        // justifyContent:'center'
      }}>
      <View style={styles.container}>
        <Text style={styles.heading}>Plans</Text>

        <View style={{ ...styles.separator, marginBottom: Spacing * 1.5 }} />
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'All Plans' && styles.activeFilterButton]}
            onPress={() => setFilter('All Plans')}
          >
            <Text style={[styles.filterButtonText, filter === 'All Plans' && styles.activeFilterButtonText]}>
              All Plans
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'Meal Plans' && styles.activeFilterButton]}
            onPress={() => setFilter('Meal Plans')}
          >
            <Text style={[styles.filterButtonText, filter === 'Meal Plans' && styles.activeFilterButtonText]}>
              Meal Plans
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'Workout Plans' && styles.activeFilterButton]}
            onPress={() => setFilter('Workout Plans')}
          >
            <Text style={[styles.filterButtonText, filter === 'Workout Plans' && styles.activeFilterButtonText]}>
              Workout Plans
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentcontainer}>
        <FlatList
          data={filteredPlans}
          renderItem={renderPlan}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
        </View>
      </View>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={{flex: 1,
      backgroundColor: Colors.background,
      paddingTop: Spacing * 3,
      paddingBottom: Spacing * 8}}>
      <Stack.Navigator>
        <Stack.Screen name="MainPlans" component={PlansListScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="PlanDetails"
          component={PlanDetailsScreen}
          options={{
            headerTransparent: true,
            headerBackground: () => <View style={styles.headerBackground} />,
            headerStatusBarHeight:5,
            headerTintColor: Colors.onPrimary,
            headerTitleStyle: {
              fontSize: FontSize.large,
              fontFamily: Fonts['poppins-bold'],
              alignSelf: 'center',
              color: Colors.onPrimary,
              textAlignVertical: 'center',
            },
            headerTitleAlign: 'left',
          }}
        />
      </Stack.Navigator>
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
    paddingHorizontal: Spacing *2,
    paddingTop: Spacing * 3,
    paddingBottom: Spacing * 8
  },
  contentcontainer: {
    paddingBottom:Spacing*7
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
    // paddingHorizontal:Spacing*1.6,
    marginBottom: Spacing * 1.6,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: Spacing * 1.6,
    marginBottom: Spacing * 1.6,
  },
  filterButton: {
    paddingVertical: Spacing,
    paddingHorizontal: Spacing * 2,
    backgroundColor: Colors.accent,
    borderRadius: 8,
    marginRight: Spacing * 0.8,
  },
  activeFilterButton: {
    backgroundColor: Colors.primary,
    fontSize: FontSize.small,
  },
  filterButtonText: {
    fontFamily: Fonts['poppins-regular'],
    color: Colors.onPrimary,
  },
  activeFilterButtonText: {
    color: Colors.background,
  },
  headerBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: '100%',
    height: Spacing * 5.9,
  },
  planContainer: {
    width: '100%',
    marginBottom: Spacing * 1.6,
    backgroundColor: Colors.accent,
    borderRadius: 8,
    padding: Spacing * 1.6,
  },
  planImage: {
    width: '100%',
    height: 170,
    marginBottom: Spacing * 1.2,
    borderRadius: 8,
  },
  planTitle: {
    fontSize: FontSize.large,
    fontFamily: Fonts['poppins-bold'],
    color: Colors.onPrimary,
    marginBottom: 8,
  },
  planDescription: {
    fontFamily: Fonts['poppins-regular'],
    color: Colors.text,
    fontSize: FontSize.small,
  },
  detailsContainer: {
    flex: 1,
  },
  detailsImage: {
    width: '100%',
    height: 270,
    marginBottom: Spacing*0.5,
    borderRadius: 0,
  },
  detailsContent: {
    flex: 1,
    paddingHorizontal:Spacing*2
  },
  detailsTitle: {
    width:'100%',
    fontSize: 25,
    borderBottomWidth:3,
    borderBottomColor:Colors.primary,
    fontFamily: Fonts['poppins-bold'],
    marginBottom:Spacing,
    color: Colors.onPrimary,
    paddingVertical:Spacing,
    alignSelf:'flex-start'
    
  },
  detailsDescription: {
    fontFamily: Fonts['poppins-regular'],
    color: Colors.text,
    fontSize: FontSize.medium,
    textAlign: 'left',
  },
  mealsContainer: {
    marginTop: Spacing*1.6,
    paddingHorizontal: Spacing*2
  },
  mealsTitle: {
    fontSize: 25,
    fontFamily: Fonts['poppins-bold'],
    color:Colors.onPrimary,
    borderBottomWidth:2,
    borderBottomColor: Colors.primary,
    marginBottom: Spacing*2,
    paddingBottom:Spacing*0.5
  },
  mealItem: {
    marginBottom: Spacing*1.6,
  },
  mealDay: {
    fontSize: FontSize.large,
    fontFamily: Fonts['poppins-bold'],
    color:Colors.onPrimary,
    borderBottomWidth:2,
    textAlign:'center',
    borderBottomColor: Colors.primary,
    paddingBottom:Spacing,
    marginBottom: 8,
  },
  mealType: {
    color: Colors.onPrimary,
    fontFamily: Fonts['poppins-semiBold'],
    fontSize: 18,
    marginBottom: 8,
  },
  mealTypeinfo: {
    color: Colors.text,
    fontFamily: Fonts['poppins-regular'],
    fontSize: FontSize.medium,
    marginBottom: 8,
  },
  snacksTitle: {
    fontSize: FontSize.medium,
    fontFamily: Fonts['poppins-semiBold'],
    color:Colors.onPrimary,
    marginBottom: 8,
  },
  snackItem: {
    color: "lightgrey",
    fontFamily: Fonts['poppins-regular'],
    fontSize: FontSize.small,
    marginBottom: 8,
  },
  workoutsContainer: {
    marginTop: Spacing*1.6,
    paddingHorizontal:Spacing*2
  },
  workoutsTitle: {
    fontSize: 25,
    fontFamily: Fonts['poppins-bold'],
    color:Colors.onPrimary,
    borderBottomWidth:2,
    borderBottomColor: Colors.primary,
    marginBottom: Spacing*2,
    paddingBottom:Spacing*0.5
  },
  workoutItem: {
    marginBottom: 16,
  },
  workoutDay: {
    fontSize: FontSize.large,
    fontFamily: Fonts['poppins-bold'],
    color:Colors.onPrimary,
    borderBottomWidth:2,
    textAlign:'center',
    borderBottomColor: Colors.primary,
    paddingBottom:Spacing,
    marginBottom: Spacing*1.5,
  },
  workoutType: {
    color: Colors.onPrimary,
    fontFamily: Fonts['poppins-bold'],
    fontSize: 18,
    textDecorationLine:"underline",
    marginBottom: 8,
  },
  exerciseItem: {
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: FontSize.medium,
    fontFamily: Fonts['poppins-regular'],
    color:Colors.onPrimary,
    marginBottom: 8,
  },
  exerciseSetsReps: {
    color: "lightgrey",
    fontFamily: Fonts['poppins-regular'],
    fontSize: FontSize.small,
    marginBottom: 8,
  },
  exerciseDuration: {
    color: "lightgrey",
    fontFamily: Fonts['poppins-regular'],
    fontSize: FontSize.small,
    marginBottom: 8,
  },
});

export default PlansScreen;
