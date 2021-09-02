import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/user/Login";
import Logout from "../screens/user/Logout";
import Signup from "../screens/user/Singup";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Logout"
        component={Logout}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
export default function UserNavigator() {
  return <MyStack />;
}
