//https://reactnavigation.org/docs/auth-flow/
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthStack from './AuthNavigator';
import MainStack from './Modal';

const asyncStorage = require('../asyncStorage');

const Stack = createStackNavigator();
const Main = () => {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerShown: false,
        headerLeft: null,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen
        name="Main"
        component={MainStack}
        options={{ gestureEnabled: false }}
      />
      {/* {asyncStorage.getData("Authorization") === null ||
      asyncStorage.getData("id") === null ? (
       
      ) : (

      )} */}
    </Stack.Navigator>
  );
};
export default Main;
