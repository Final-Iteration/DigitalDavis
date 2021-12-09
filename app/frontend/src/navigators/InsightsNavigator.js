import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Insights from '../screens/insightsScreen/Insights';

import Header from '../sharedComponent/Header';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Insight"
        component={Insights}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header title="Insights" navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default function InsightNavigator() {
  return <MyStack />;
}
