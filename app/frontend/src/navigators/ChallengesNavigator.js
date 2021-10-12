import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import CurrentChallenges from "../screens/challengesScreen/CurrentChallenge";
import PastChallenges from "../screens/challengesScreen/PastChallenges";
import ChallengeInfo from "../screens/challengesScreen/ChallengeInfo";
import CreateChallengeScreen from "../screens/challengesScreen/CreateChallengeScreen";

import Header from "../sharedComponent/Header";

const ChallengeStack = createStackNavigator(
  {
    Challenge: {
      screen: CurrentChallenges,
      navigationOptions: {
        header: ({ scene, previous, navigation }) => (
          <Header title="Challenges" navigation={navigation} />
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
    SearchedChallenge: {
      screen: PastChallenges,
      navigationOptions: {
        headerShown: false,
      },
    },
  SearchedChallenge: {
    screen: PastChallenges,
    navigationOptions: {
      headerShown: false,
    },
  },
  ChallengeInformation: {
    screen: ChallengeInfo,
    navigationOptions: {
      headerShown: false,
    },
  },
  CreateChallenge: {
    screen: CreateChallengeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

export default ChallengeStack;
