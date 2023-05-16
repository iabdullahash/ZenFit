import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { React ,useState } from "react";
import { useNavigation } from '@react-navigation/native';
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Fonts";
import { Picker } from 'react-native-wheel-pick';
// import { Dropdown } from 'react-native-material-dropdown';
import AppTextInput from "../components/AppTextInput";


const OnboardingScreen = ({ onNext, age, setAge }) => {

  const handleNext = () => {
    if (age && age > 0) {
      onNext();
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
      <View style={styles.contentContainer}>
        <Text 
          style={{
            fontSize: FontSize.xLarge,
            color: Colors.primary,
            fontFamily: Font["poppins-bold"],
            marginVertical: Spacing * 3,
            maxWidth:'100%'
            }}
            >
              What is your Age?
        </Text>

        <AppTextInput
          placeholder="Age"
          inputMode="numeric"
          value={age}
          maxLength={2}
          onChangeText={setAge}
        />
        <TouchableOpacity 
          style={[styles.button , age <= 0 && styles.buttonDisabled]} 
          onPress={handleNext}
          disabled={age <= 0}
          >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const SignupScreen = ({age}) => {

  const navigation = useNavigation();

  // let data = [{
  //   value: 'Male',
  // }, {
  //   value: 'Female',
  // }];
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
          <AppTextInput placeholder="Name" />
          <AppTextInput placeholder="Email" inputMode="email-address" />
          <AppTextInput placeholder="Password" inputMode="password" />
          {/* <Dropdown
            label='Gender'
            data={data}
          /> */}
          
        </View>

        <TouchableOpacity
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
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [age, setAge] = useState('');

  const handleOnboardingNext = () => {
    setShowOnboarding(false);
  };

  return (
    <>
      {showOnboarding ? (
        <OnboardingScreen
          onNext={handleOnboardingNext}
          age={age}
          setAge={setAge}
        />
      ) : (
        <SignupScreen age={age} />
      )}
    </>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing * 2,
    maxWidth:"100%"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Spacing * 2,
  },


  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing,
    paddingHorizontal: Spacing * 3,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.onPrimary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  }
});

export default App;