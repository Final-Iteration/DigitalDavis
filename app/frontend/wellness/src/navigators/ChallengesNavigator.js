import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CurrentChallenges from "../screens/challenges/CurrentChallenge";
import PastChallenges from "../screens/challenges/PastChallenges";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CurrentChallenges"
        component={CurrentChallenges}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="PastChallenges" component={PastChallenges} />
    </Stack.Navigator>
  );
}

export default function ChallengesNavigator() {
  return <MyStack />;
}
