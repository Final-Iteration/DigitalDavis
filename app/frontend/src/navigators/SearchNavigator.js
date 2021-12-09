import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Search from '../screens/searchScreen/Search';

import Header from '../sharedComponent/Header';

const Stack = createStackNavigator();
function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header title="Search" navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default function AuthNavigator() {
  return <SearchStack />;
}
