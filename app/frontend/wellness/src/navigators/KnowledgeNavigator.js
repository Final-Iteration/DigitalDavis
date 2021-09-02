import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Knowledge from "../screens/knowledge/Knowledge";
import SearchedKnowledge from "../screens/knowledge/SearchedKnowledge";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Knowledge"
        component={Knowledge}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchedKnowledge"
        component={SearchedKnowledge}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function KnowledgeNavigator() {
  return <MyStack />;
}
