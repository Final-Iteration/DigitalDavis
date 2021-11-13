import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CurrentChallenge from "../screens/challengesScreen/CurrentChallenge";
import ChallengeInfo from "../screens/challengesScreen/ChallengeInfo";
import CreateChallengeScreen from "../screens/challengesScreen/CreateChallengeScreen";
import CreateChallengeScreenTags from "../screens/challengesScreen/CreateChallengeScreenTags";
import Header from "../sharedComponent/Header";
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Challenge"
        component={CurrentChallenge}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              title="Challenges"
              navigation={navigation}
              challenge={true}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ChallengeInformation"
        component={ChallengeInfo}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              challengeInfo={true}
              navigation={navigation}
              challenge={true}
            />
          ),
        }}
      />
      <Stack.Screen
        name="CreateChallenge"
        component={CreateChallengeScreen}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header
              createChallenge={true}
              title="Create Challenge"
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="CreateChallengeTags"
        component={CreateChallengeScreenTags}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function ChallengeNavigator() {
  return <MyStack />;
}
