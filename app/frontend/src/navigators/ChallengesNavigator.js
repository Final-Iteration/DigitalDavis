import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateChallenge from '../screens/challengesScreen/CreateChallenge';
import CurrentChallenge from '../screens/challengesScreen/CurrentChallenge';
import ChallengeInfo from '../screens/challengesScreen/ChallengeInfo';
import Header from '../sharedComponent/Header';
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Challenge"
      mode="modal" // top to bottom instead of left to right
      headerMode="screen"
    >
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
        options={{ title: null }}
      />
      <Stack.Screen
        name="CreateChallenge"
        component={CreateChallenge}
        options={{ headerShown: false }}
        mode="modal" // top to bottom instead of left to right
      />
    </Stack.Navigator>
  );
}
export default function ChallengeNavigator() {
  return <MyStack />;
}
