import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import CurrentChallenge from "../screens/challengesScreen/CurrentChallenge";
import ChallengeInfo from "../screens/challengesScreen/ChallengeInfo";
import CreateChallengeScreen from "../screens/challengesScreen/CreateChallengeScreen";
import CreateChallengeScreenTags from "../screens/challengesScreen/CreateChallengeScreenTags";
import Header from "../sharedComponent/Header";

const ChallengeStack = createStackNavigator(
  {
    Challenge: {
      screen: CurrentChallenge,
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
            navigation={navigation}
            challenge={true}
          />
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
        headerShown: false,
      },
    },
  },
  { headerMode: "screen" }
);

export default ChallengeStack;
