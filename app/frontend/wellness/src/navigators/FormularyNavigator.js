import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Formulary from "../screens/formulary/Formulary";
import SearchedFormulary from "../screens/formulary/SearchedFormulary";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Formulary"
        component={Formulary}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchedFormulary"
        component={SearchedFormulary}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function FormularyNavigator() {
  return <MyStack />;
}
