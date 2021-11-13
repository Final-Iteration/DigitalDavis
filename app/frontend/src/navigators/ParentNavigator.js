//https://reactnavigation.org/docs/auth-flow/
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//auth stack
import AuthStack from "./AuthNavigator";
//main stack
import MainStack from "./Modal";
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
      <Stack.Screen
        name="Main"
        component={MainStack}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="Auth" component={AuthStack} />
    </Stack.Navigator>
  );
};
export default Main;
