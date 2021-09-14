import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import CurrentChallenges from "../screens/challengesScreen/CurrentChallenge";
import PastChallenges from "../screens/challengesScreen/PastChallenges";
import JoinChallenges from "../screens/challengesScreen/JoinChallenges";

const ChallengeStack = createStackNavigator({
  Challenge: {
    screen: CurrentChallenges,
  },
  SearchedChallenge: {
    screen: PastChallenges,
  },
  JoinChallenge:{
    screen: JoinChallenges
  }
});

export default ChallengeStack;
