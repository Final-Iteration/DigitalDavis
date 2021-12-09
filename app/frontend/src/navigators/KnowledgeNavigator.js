import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Knowledge from '../screens/knowledgeScreen/Knowledge';

import Header from '../sharedComponent/Header';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Knowledge"
        component={Knowledge}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header title="Knowledge" navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default function KnowledgeNavigator() {
  return <MyStack />;
}
