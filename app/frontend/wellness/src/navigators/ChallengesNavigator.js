import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import CurrentChallenges from "../screens/challengesScreen/CurrentChallenge";
import PastChallenges from "../screens/challengesScreen/PastChallenges";

const ChallengeStack = createStackNavigator({
  Challenge: {
    screen: CurrentChallenges,
  },
  SearchedChallenge: {
    screen: PastChallenges,
  },
});

export default ChallengeStack;
