//https://reactnavigation.org/docs/auth-flow/
import React from "react";
import { createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { Image, Dimensions, StyleSheet } from "react-native";

//bottom tab
import ChallengeStack from "./ChallengesNavigator";
import FormularyStack from "./FormularyNavigator";
import InsightStack from "./InsightsNavigator";
import KnowledgeStack from "./KnowledgeNavigator";
import SearchStack from "./SearchNavigator";

//auth stack
import AuthStack from "./UserNavigator";

//user Profile
import UserProfile from "../sharedComponent/UserProfile";

import Header from "../sharedComponent/Header";

const {height, width} = Dimensions.get("window");


const TabStack = createBottomTabNavigator({
  InsightStack: {
    screen: InsightStack,
    navigationOptions:{
      tabBarLabel:() => {return null},
      tabBarIcon: ({}) => (
        <Image 
          source={require('../../assets/InsightsLogo.png')}
          style={styles.image}
        ></Image>
      )
    },
  },
  Formulary: {
    screen: FormularyStack,
    navigationOptions:{
      tabBarLabel:() => {return null},
      tabBarIcon: ({}) => (
        <Image 
          source={require('../../assets/FormularyLogo.png')}
          style={styles.image}
        ></Image>
      )
    },
  },
  SearchStack: {
    screen: SearchStack,
    navigationOptions:{
      tabBarLabel:() => {return null},
      tabBarIcon: ({}) => (
        <Image 
          source={require('../../assets/SearchLogo.png')}
          style={styles.image}
        ></Image>
      )
    },
  },
  Challenge: {
    screen: ChallengeStack,
    navigationOptions:{
      tabBarLabel:() => {return null},
      tabBarIcon: ({}) => (
        <Image 
          source={require('../../assets/ChallengeLogo.png')}
          style={styles.image}
        ></Image>
      )
    },
  },
  KnowledgeStack: {
    screen: KnowledgeStack,
    navigationOptions:{
      tabBarLabel:() => {return null},
      tabBarIcon: ({}) => (
        <Image 
          source={require('../../assets/KnowledgeLogo.png')}
          style={styles.image}
        ></Image>
      )
    },
  },
}); 

const styles = StyleSheet.create({
  image: {
    width: isNaN(width) ? 32 : width / 9,
    height: isNaN(width) ? 32 : width / 9,
  },
});

const mainFlowWithProfile = createStackNavigator({
  mainFlow: {
    screen: TabStack,
    navigationOptions: {
      headerShown: false,
    },
  },
  User: {
    screen: UserProfile,
    navigationOptions: {
      header: ({ scene, previous, navigation }) => (
        <Header title="Pepe" navigation={navigation} />
      ),
      headerStyle: {
        backgroundColor: "#142A4F",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "semi-bold",
        fontSize: 32,
        fontFamily: "Helvetica",
      },
    },
  },
});

const MainNavigator = createSwitchNavigator(
  {
    Auth: AuthStack,
    Main: TabStack,
    Profile: mainFlowWithProfile,
  },
  {
    initialRouteName: "Auth",
  }
);
export default MainNavigator;
