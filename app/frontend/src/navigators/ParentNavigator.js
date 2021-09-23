//https://reactnavigation.org/docs/auth-flow/
import React from "react";
import { createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

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

const TabStack = createBottomTabNavigator({
  InsightStack: InsightStack,
  Formulary: FormularyStack,
  SearchStack: SearchStack,
  KnowledgeStack: KnowledgeStack,
  Challenge: ChallengeStack,
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
