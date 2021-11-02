import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import CurrentChallenges from "../screens/challengesScreen/CurrentChallenge";
import ChallengeInfo from "../screens/challengesScreen/ChallengeInfo";
import CreateChallengeScreen from "../screens/challengesScreen/CreateChallengeScreen";
import CreateChallengeScreenTags from "../screens/challengesScreen/CreateChallengeScreenTags";
import CreateChallengeDate from "../screens/challengesScreen/CreateChallengeDate";
import CreateChallengeDescription from "../screens/challengesScreen/CreateChallengeDescription";

import Header from "../sharedComponent/Header";

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
        <Header challengeInfo={true} navigation={navigation} challenge={true} />
      ),
    },
  },
  CreateChallenge: {
    screen: CreateChallengeScreen,
    navigationOptions: {
      header: ({ scene, previous, navigation }) => (
        <Header
          createChallenge={true}
          title="Create Challenge"
          navigation={navigation}
        />
      ),
    },
  },
  CreateChallengeTags: {
    screen: CreateChallengeScreenTags,
    navigationOptions: {
      // header: ({ scene, previous, navigation }) => (
      //   <Header CreateChallengeTags={true} navigation={navigation} />
      // ),
    },
  },
  CreateChallengeDate: {
    screen: CreateChallengeDate,
    navigationOptions: {
      header: ({ scene, previous, navigation }) => (
        <Header CreateChallengeDate={true} navigation={navigation} />
      ),
    },
  },
  CreateChallengeDescription: {
    screen: CreateChallengeDescription,
    navigationOptions: {
      header: ({ scene, previous, navigation }) => (
        <Header CreateChallengeDescription={true} navigation={navigation} />
      ),
    },
  },
});

export default ChallengeStack;
