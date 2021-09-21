import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import CurrentChallenges from "../screens/challengesScreen/CurrentChallenge";
import PastChallenges from "../screens/challengesScreen/PastChallenges";
import JoinChallenges from "../screens/challengesScreen/JoinChallenges";

import Header from "../sharedComponent/Header";

const ChallengeStack = createStackNavigator({
  Challenge: {
    screen: CurrentChallenges,
    navigationOptions: {
      header: () => <Header title="Challenges" />,
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
  },
  JoinChallenge: {
    screen: JoinChallenges,
  },
});

export default ChallengeStack;
