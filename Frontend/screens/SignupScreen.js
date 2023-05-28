import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Alert
} from "react-native";
import { React ,useEffect,useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from '@react-navigation/native';
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Fonts";
import api from '../config/api/index';
import { RulerPicker } from 'react-native-ruler-picker';
import { Ionicons } from '@expo/vector-icons';
import AppTextInput from "../components/AppTextInput";
const height  = Dimensions.get("window").height;
const width  = Dimensions.get("window").width;



const Stack = createStackNavigator();




const ArrowButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.Button}>
    <Ionicons name="arrow-back" size={24} color="white" />
  </TouchableOpacity>
);

const GenderScreen = ({route}) => {
  const navigation = useNavigation();
  const { data = {} } = route.params || {};
  const [gender, setGender] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleNext = () => {
      data.gender = gender;
      // setCurrentStep(currentStep + 1);
      navigation.navigate('Age',{data});
    
  };

  const calculateProgress = () => {
    return (currentStep / totalSteps) * 100;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems:'center',justifyContent:'center',marginTop: Spacing*6}}>
          <View style={styles.progressBar}>
              <View style={[styles.progressBarFill, { width: `${calculateProgress()}%` }]} />
          </View>
          <Text style={{
            fontSize: FontSize.small,
            color: Colors.primary,
            fontFamily: Font["poppins-bold"],
            marginTop: Spacing,
            maxWidth:'100%'
            }}
            >
              Step {currentStep}/{totalSteps}
            </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={{
          fontSize: FontSize.xLarge,
          color: Colors.primary,
          fontFamily: Font['poppins-bold'],
          marginBottom: Spacing * 2,
          textAlign: 'center',
          maxWidth: '100%',
          }}>
             Let us know who you are?
        </Text>
      
      <View style={{ flex: 1, alignItems:'center',justifyContent:'space-evenly' }}>

        <View style={{justifyContent:'center',alignItems: 'center'}}>

          <TouchableOpacity
            style={[styles.gender, {borderColor: gender === 'Male' ? '#82C6E2' : Colors.onPrimary,
                                    borderWidth: gender === 'Male' ? 5 : 2  }]}
            onPress={() => setGender('Male')}
          >
            <Ionicons name="male" size={60} color= {gender === "Male" ? "skyblue" : "white"} />
          </TouchableOpacity>
          <Text style={{
            fontFamily: Font['poppins-regular'],
            fontSize: FontSize.large + 5,
            color: gender === 'Male' ? '#82C6E2' : Colors.text,
            maxWidth: '100%',
            textAlign: 'center',
            marginTop:Spacing,}}
            >Male
          </Text>
        </View>
        <View style={{justifyContent:'center',alignItems: 'center'}}>
          <TouchableOpacity
            style={[styles.gender, {borderColor: gender === 'Female' ? '#FFC0CB' : Colors.onPrimary,
                                    borderWidth: gender === 'Female' ? 5 : 2  }]}

            onPress={() => setGender('Female')}
          >
            <Ionicons name="female" size={60} color={gender === "Female" ? "pink" : "white"} />
          </TouchableOpacity>
          <Text style={{
            fontFamily: Font['poppins-regular'],
            fontSize: FontSize.large + 5,
            color: gender === 'Female' ? '#FFC0CB' : Colors.text,
            maxWidth: '100%',
            textAlign: 'center',
            marginTop:Spacing,}}>Female</Text>

        </View>

      </View>
      
     
      </View>
      <View style={styles.btn}>
        <ArrowButton onPress={() => navigation.goBack()} />
          <TouchableOpacity 
            style={[styles.Button , !gender && styles.buttonDisabled]} 
            onPress={handleNext}
            disabled={!gender}
            >
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};


const AgeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { data = {} } = route.params || {};
  const [age, setAge] = useState('');
  const [currentStep, setCurrentStep] = useState(2);
  const totalSteps = 4;

  const handleNext = () => {
    if (age && age > 0) {
      data.age = age;
      // setCurrentStep(currentStep + 1);
      navigation.navigate('Height',{data});
    }
  };

  const calculateProgress = () => {
    return (currentStep / totalSteps) * 100;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems:'center',justifyContent:'center',marginTop: Spacing*6}}>
          <View style={styles.progressBar}>
            <View style={[styles.progressBarFill, { width: `${calculateProgress()}%` }]} />
          </View>
          <Text style={{
            fontSize: FontSize.small,
            color: Colors.primary,
            fontFamily: Font["poppins-bold"],
            marginTop: Spacing,
            maxWidth:'100%'
            }}
            >
              Step {currentStep}/{totalSteps}
            </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={{
          fontSize: FontSize.xLarge,
          color: Colors.primary,
          fontFamily: Font['poppins-bold'],
          marginBottom: Spacing * 2,
          textAlign: 'center',
          maxWidth: '100%',
          }}>
             What is your Age 
        </Text>

        <View style={styles.ageInputContainer}>
          <AppTextInput
            placeholder="Age"
            inputMode="numeric"
            value={age}
            maxLength={2}
            onChangeText={setAge}
          />
        </View>
      </View>
      <View style={styles.btn}>
        <ArrowButton onPress={() => navigation.goBack()} />
          <TouchableOpacity 
            style={[styles.Button , age <= 0 && styles.buttonDisabled]} 
            onPress={handleNext}
            disabled={age <= 0}
            >
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const HeightScreen = ({ route }) => {

  const navigation = useNavigation();
  const { data = {} } = route.params || {};
  const [height, setHeight] = useState(''); 
  const [currentStep, setCurrentStep] = useState(3);
  const totalSteps = 4;

  // useEffect(() => {
  //   setCurrentStep(2); // Update the currentStep when the component mounts
  // }, []);


  const handleNext = () => {
    data.height = height;
    navigation.navigate('Weight', {data});
  };

  const calculateProgress = () => {
    return (currentStep / totalSteps) * 100;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems:'center',justifyContent:'center',marginTop: Spacing*6}}>
          <View style={styles.progressBar}>
            <View style={[styles.progressBarFill, { width: `${calculateProgress()}%` }]} />
          </View>
          <Text style={{
            fontSize: FontSize.small,
            color: Colors.primary,
            fontFamily: Font["poppins-bold"],
            marginTop: Spacing,
            maxWidth:'100%'
            }}
            >
              Step {currentStep}/{totalSteps}
            </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text
          style={{
            fontSize: FontSize.xLarge,
            color: Colors.primary,
            fontFamily: Font['poppins-bold'],
            marginVertical: Spacing * 3,
            maxWidth: '100%',
          }}
        >
          Choose your Height?
        </Text>

        <RulerPicker
          min={120}
          max={250}
          step={1}
          indicatorColor={Colors.primary}
          valueTextStyle={{
            fontFamily: Font['poppins-bold'],
            color: Colors.primary,
          }}
          unitTextStyle={{
            fontFamily: Font['poppins-bold'],
            color: Colors.primary,
          }}
          fractionDigits={0}
          initialValue={120}
          onValueChangeEnd={(number) => setHeight(number)}
          unit="cm"
        />
      </View>
      <View style={styles.btn}>
          <ArrowButton onPress={() => navigation.goBack()} />
          <TouchableOpacity
            style={[styles.Button]}
            onPress={handleNext}
          >
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};


const WeightScreen = ({ route }) => {

  const navigation = useNavigation();
  const { data = {} } = route.params || {};
  const [weight, setWeight] = useState(''); 
  const [unit, setUnit] = useState('lbs');
  const [currentStep, setCurrentStep] = useState(4);
  const totalSteps = 4;

  // useEffect(() => {
  //   setCurrentStep(2); // Update the currentStep when the component mounts
  // }, []);


  const handleNext = () => {
    data.weight = { amount: weight, unit: unit }
    navigation.navigate('MainSignup', {data});
  };

  const calculateProgress = () => {
    return (currentStep / totalSteps) * 100;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems:'center',justifyContent:'center',marginTop: Spacing*6}}>
          <View style={styles.progressBar}>
            <View style={[styles.progressBarFill, { width: `${calculateProgress()}%` }]} />
          </View>
          <Text style={{
            fontSize: FontSize.small,
            color: Colors.primary,
            fontFamily: Font["poppins-bold"],
            marginTop: Spacing,
            maxWidth:'100%'
            }}
            >
              Step {currentStep}/{totalSteps}
            </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text
          style={{
            fontSize: FontSize.xLarge,
            color: Colors.primary,
            fontFamily: Font['poppins-bold'],
            marginVertical: Spacing * 3,
            maxWidth: '100%',
          }}
        >
          What is your Weight?
        </Text>
        <View
          style={{
            paddingHorizontal: Spacing,
            paddingTop: Spacing * 2,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <TouchableOpacity
            onPress={() => setUnit('lbs')}
            style={{
              backgroundColor: unit === 'lbs' ? Colors.primary: Colors.accent,
              paddingVertical: Spacing * 1.5,
              paddingHorizontal: Spacing * 2,
              width: "30%",
              borderRadius: Spacing,
              shadowColor: Colors.primary,
              shadowOffset: {
                width: 0,
                height: Spacing,
              },
              shadowOpacity: 0.3,
              elevation:1,
              shadowRadius: Spacing,
              marginRight: 20
            }}
          >
            <Text
              style={{
                fontFamily: Font["poppins-semiBold"],
                color: Colors.onPrimary,
                fontSize: FontSize.large,
                textAlign: "center",
              }}
            >
              lbs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setUnit('kg')}
            style={{
              backgroundColor: unit === 'kg' ? Colors.primary: Colors.accent,
              paddingVertical: Spacing * 1.5,
              paddingHorizontal: Spacing * 2,
              width: "30%",
              borderRadius: Spacing,
            }}
          >
            <Text
              style={{
                fontFamily: Font["poppins-semiBold"],
                color: Colors.text,
                fontSize: FontSize.large,
                textAlign: "center",
              }}
            >
              kg
            </Text>
          </TouchableOpacity>
        </View>
        <RulerPicker
          min={unit === 'kg' ? 40 : 80}
          max={unit === 'kg' ? 150 : 300}
          step={1}
          indicatorColor={Colors.primary}
          valueTextStyle={{
            fontFamily: Font['poppins-bold'],
            color: Colors.primary,
          }}
          unitTextStyle={{
            fontFamily: Font['poppins-bold'],
            color: Colors.primary,
          }}
          fractionDigits={0}
          initialValue={unit === 'kg' ? 40 : 80}
          onValueChangeEnd={(number) => setWeight(number)}
          unit={unit}
        />
      </View>
      <View style={styles.btn}>
          <ArrowButton onPress={() => navigation.goBack()} />
          <TouchableOpacity
            style={[styles.Button]}
            onPress={handleNext}
          >
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const SignupScreen = ({ route }) => {

  const navigation = useNavigation();
  const { data = {} } = route.params || {};
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const handleSignup = async () => {
    data.name = name;
    data.email = email;
    data.password = password;
    try {
      const response = await api.post('/signup', {data});
  
      if (response.status === 200) {
        // Successful login
        const data = response.data;
        console.log(data);
        navigation.navigate('Login');
      } else {
        // Other error occurred
        console.log('Signup failed');
        Alert.alert('Error', 'Signup failed. Please try again.');
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
        Alert.alert('Error', 'Signup failed. Please try again.');
      }
    }
  };
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
          padding: Spacing * 2,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              fontFamily: Font["poppins-bold"],
              marginVertical: Spacing * 3,
            }}
          >
            Create account
          </Text>
          <Text
            style={{
              fontFamily: Font["poppins-regular"],
              fontSize: FontSize.small,
              color:Colors.text,
              maxWidth: "100%",
              textAlign: "center",
            }}
          >
            Create an account so you can explore all the features of our app
          </Text>
        </View>
        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <AppTextInput placeholder="Name" value={name} onChangeText={setName} />
          <AppTextInput placeholder="Email" value={email} onChangeText={setEmail} inputMode="email-address" />
          <AppTextInput placeholder="Password" value={password} onChangeText={setPassword} inputMode="password" />
          {/* <Dropdown
            label='Gender'
            data={data}
          /> */}
          
        </View>

        <TouchableOpacity onPress={handleSignup}
          style={{
            padding: Spacing*1.5,
            height:Spacing*6,
            backgroundColor: Colors.primary,
            marginVertical: Spacing * 3,
            borderRadius: Spacing,
            shadowColor: Colors.primary,
            shadowOffset: {
              width: 0,
              height: Spacing,
            },
            shadowOpacity: 0.3,
            shadowRadius: Spacing,
          }}
        >
          <Text
            style={{
              fontFamily: Font["poppins-bold"],
              color: Colors.onPrimary,
              textAlign: "center",
              fontSize: FontSize.large,
            }}
          >
            Sign up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{
            padding: Spacing,
          }}
        >
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              color: Colors.text,
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            Already have an account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};



const App = () => {

  const data = {};

  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Gender"
          component={GenderScreen}
          initialParams={{ data}}
          options={{ headerShown: false }}
          />
        <Stack.Screen
          name="Age"
          component={AgeScreen}
          initialParams={{ data}}
          options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Height"
            component={HeightScreen}
            initialParams={{ data}}
            options={{ headerShown: false }}
          />
        <Stack.Screen
          name="Weight"
          component={WeightScreen}
          initialParams={{ data}}
          options={{ headerShown: false }}
        />
          <Stack.Screen
            name="MainSignup"
            component={SignupScreen}
            initialParams={{ data }}
            options={{ headerShown: false }}
          />
        
        
      </Stack.Navigator>
);
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    alignSelf:'center',
    justifyContent:'center',
    borderRadius: Spacing*3,
    width: '30%',
  },
  progressBarFill: {
    height: '100%',
    borderRadius:Spacing*3,
    backgroundColor: Colors.primary, // Replace this with your desired progress bar color
  },  
  gender:{
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:2,
    width: 150,
    height: 150,
    backgroundColor: Colors.background,
    borderRadius: 20,
    
  },
  btn: {
    width:'80%',
    flexDirection: 'row',
    alignSelf:'center',
    justifyContent:'space-between',
    marginBottom: Spacing*6
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Spacing * 2,
    paddingHorizontal: Spacing * 2,
  },
  title: {
    fontSize: FontSize.xLarge,
    color: Colors.primary,
    fontFamily: Font['poppins-bold'],
    marginVertical: Spacing * 3,
    maxWidth: '100%',
  },
  subtitle: {
    fontFamily: Font['poppins-regular'],
    fontSize: FontSize.small,
    color: Colors.text,
    maxWidth: '100%',
    textAlign: 'center',
  },
  ageInputContainer: {
    marginTop: Spacing,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.onPrimary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  Button: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;