import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import CurrentChallenges from '../screens/challengesScreen/CurrentChallenge';
import ChallengeInfo from '../screens/challengesScreen/ChallengeInfo';
import CreateChallengeScreen from '../screens/challengesScreen/CreateChallengeScreen';

import Header from '../sharedComponent/Header';

const ChallengeStack = createStackNavigator({
  Challenge: {
    screen: CurrentChallenges,
    navigationOptions: {
      header: ({ scene, previous, navigation }) => (
        <Header title="Challenges" navigation={navigation} challenge={true} />
      ),
      headerTitleAlign: 'center'
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
      headerTitleAlign: 'center'
    },
  },
  CreateChallenge: {
    screen: CreateChallengeScreen,
    navigationOptions: {
      headerShown: false,
    },
    headerTitleAlign: 'center'
  },
});

export default ChallengeStack;
