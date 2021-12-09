import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Formulary from '../screens/formularyScreen/Formulary';

import Header from '../sharedComponent/Header';
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Formulary"
        component={Formulary}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header title="Formulary" navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default function FormularyNavigator() {
  return <MyStack />;
}
