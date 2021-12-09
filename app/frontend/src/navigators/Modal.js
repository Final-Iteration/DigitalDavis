import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//user Profile
import ProfileStack from './ProfileNavigator';
//bottom tab
import TabStack from './MainBottomTab';

const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="mainFlow"
      mode="modal" // top to bottom instead of left to right
      headerMode="screen"
    >
      <Stack.Screen
        name="mainFlow"
        component={TabStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="User"
        component={ProfileStack}
        options={{
          headerShown: false,
          gestureEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
}

export default function AuthNavigator() {
  return <MyStack />;
}
