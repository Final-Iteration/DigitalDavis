import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import CurrentChallenges from "../screens/challengesScreen/CurrentChallenge";
import ChallengeInfo from "../screens/challengesScreen/ChallengeInfo";
import CreateChallengeScreen from "../screens/challengesScreen/CreateChallengeScreen";
import CreateChallengeScreenTags from '../screens/challengesScreen/CreateChallengeScreenTags';
import CreateChallengeDate from '../screens/challengesScreen/CreateChallengeDate';
import CreateChallengeDescription from '../screens/challengesScreen/CreateChallengeDescription';

import Header from '../sharedComponent/Header';

const ChallengeStack = createStackNavigator({
  Challenge: {
    screen: CurrentChallenges,
    navigationOptions: {
      header: ({ scene, previous, navigation }) => (
        <Header title="Challenges" navigation={navigation} challenge={true} />
      ),
    },
  },

  ChallengeInformation: {
    screen: ChallengeInfo,
    navigationOptions: {
      header: ({ scene, previous, navigation }) => (
        <Header
          challengeInfo={true}
          title="Challenge"
          navigation={navigation}
          challenge={true}
        />
      ),
    },
  },
  CreateChallenge: {
    screen: CreateChallengeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  CreateChallengeTags: {
    screen: CreateChallengeScreenTags,
    navigationOptions: {
      headerShown: false,
    },
  },
  CreateChallengeDate:{
    screen: CreateChallengeDate,
    navigationOptions: {
      headerShown: false,
    },
  },
  CreateChallengeDescription: {
    screen: CreateChallengeDescription,
    navigationOptions: {
      headerShown: false,
    },
  },
});

export default ChallengeStack;
