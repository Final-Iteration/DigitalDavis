import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import CurrentChallenges from "../screens/challengesScreen/CurrentChallenge";
import PastChallenges from "../screens/challengesScreen/PastChallenges";
import ChallengeInfo from "../screens/challengesScreen/ChallengeInfo";

const ChallengeStack = createStackNavigator({
  Challenge: {
    screen: CurrentChallenges,
    navigationOptions: {
      headerShown: false,
    },
  },
  SearchedChallenge: {
    screen: PastChallenges,
  },
  ChallengeInformation:{
    screen: ChallengeInfo,
    navigationOptions: {
      headerShown: false,
    },
  }
});

export default ChallengeStack;
