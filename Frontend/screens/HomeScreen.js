import React, {useContext} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView ,Dimensions} from 'react-native';
import { UserContext } from '../config/global/UserContext';
import Colors from "../constants/Colors"
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Fonts from '../constants/Fonts';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { BarChart, LineChart } from 'react-native-chart-kit';


const HomeScreen = () => {
  
  const navigation = useNavigation();
  const { userData } = useContext(UserContext);
  const width = Dimensions.get('window').width
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [3000, 4500, 2000, 3500, 5000, 6000, 4000],
      },
    ],
  };

  const chartConfig =  {
    backgroundColor: Colors.primary,
    backgroundGradientFrom: Colors.primary,
    backgroundGradientTo: Colors.accent,
    decimalPlaces:0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: Spacing
    }
  };
  return (
    <SafeAreaView style={{
      backgroundColor:Colors.background,
      flex:1,
    }}>
    <View style={styles.container}>

      <View style={styles.profileContainer}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image source={require('../assets/images/cow.jpg')} style={styles.profileImage} />
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileText}>Hello</Text>
            <Text style={styles.profileName}>{userData?.name || 'Guest'}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.profileIconContainer} onPress={() => navigation.navigate('Profile')}>
            <Ionicons name='menu' color={Colors.onPrimary} size={20}/>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Today's Target</Text>

        <TouchableOpacity style={styles.targetContainer}>

          <View style={{flexDirection:'column',justifyContent:'center'}}>
            <Text style={styles.targetTitle}>Total calories</Text>
            <Text style={styles.targetValue}>{userData?.goals?.dailyCalorieBurnGoal || '0'}{' '} <Text style={styles.calText}>cal</Text></Text>
          </View>

          <Image source={require('../assets/images/fire.png')} style={styles.targetIcon} />

          <View style={{flexDirection:'column',justifyContent:'center'}}>
            <Text style={styles.targetTitle}>Burnt calories</Text>
            <Text style={styles.targetValue}>286 <Text style={styles.calText}>cal</Text></Text>
          </View>

        </TouchableOpacity>

        <TouchableOpacity style={styles.targetContainer}>

          <View style={{flexDirection:'column',justifyContent:'center'}}>
            <Text style={styles.targetTitle}>Total steps</Text>
            <Text style={styles.targetValue}>{userData?.goals?.dailyStepsGoal || '0'}</Text>
          </View>

          <Image source={require('../assets/images/running.png')} style={styles.targetIcon} />

          <View style={{flexDirection:'column',justifyContent:'center'}}>
            <Text style={styles.targetTitle}>Finished steps</Text>
            <Text style={styles.targetValue}>7450</Text>
          </View>

        </TouchableOpacity>

      </View>
      
      <View>
        <Text style={styles.sectionTitle }>Activities report</Text>
        {/* <View style={{alignItems:'center',justifyContent:'center',marginHorizontal:Spacing*2}}> */}
        <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={380} 
          height={280}
          chartConfig={chartConfig}
          bezier
          withInnerLines={false}
          withOuterLines={false}
          yLabelsOffset={20}
          xLabelsOffset={12}
          // transparent
          style={{marginVertical:8,...chartConfig.style}}
        />
        </View>
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing*1.6,
    paddingTop: Spacing*6
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing*3,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileTextContainer: {
    marginLeft: Spacing*1.6,
  },
  profileText: {
    fontFamily: Fonts["poppins-regular"],
    fontSize: FontSize.small,
    color: Colors.text,
  },
  profileName: {
    fontFamily: Fonts["poppins-semiBold"],
    fontSize: FontSize.medium,
    color: Colors.text,
  },
  profileIconContainer: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 10,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: Fonts["poppins-bold"],
    fontSize: FontSize.large,
    color: Colors.text,
    marginBottom: Spacing*1.5,
  },
  targetContainer: {
    height:Spacing*10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-around',
    backgroundColor: Colors.primary,
    padding: Spacing*1.2,
    borderRadius: 12,
    marginBottom: Spacing*1.7,
  },
  targetTitle: {
    // flex: 1,
    fontFamily: Fonts['poppins-regular'],
    fontSize: FontSize.small,
    color: 'lightgrey',
  },
  targetIcon: {
    width: 60,
    height:60,
    marginHorizontal: 8,
    alignSelf:'center',
    tintColor:Colors.accent
  },
  targetValue: {
    fontFamily: Fonts["poppins-bold"],
    fontSize: 25,
    color: Colors.onPrimary,
  },
  calText: {
    fontFamily: Fonts["poppins-bold"],
    fontSize: 23, 
    color: Colors.onPrimary,
  },
  chartContainer: {
    flex:1,
    marginHorizontal: Spacing*2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  graphStyle : {
    marginVertical: 8,
    
  }
});

export default HomeScreen;
