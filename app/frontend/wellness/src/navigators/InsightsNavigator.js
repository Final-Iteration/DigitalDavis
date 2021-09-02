import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Insights from "../screens/insights/Insights";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Insights"
        component={Insights}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function InsightsNavigator() {
  return <MyStack />;
}
