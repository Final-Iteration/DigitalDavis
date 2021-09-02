import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//stack
import ChallengesNavigator from "./ChallengesNavigator";
import FormularyNavigator from "./FormularyNavigator";
import InsightsNavigator from "./InsightsNavigator";
import KnowledgeNavigator from "./KnowledgeNavigator";
import SearchNavigator from "./SearchNavigator";

const Tab = createBottomTabNavigator();
const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName="InsightsNavigator"
      tabBarOptions={{
        keyboardHidesTab: true,
        showLabels: false,
        activeTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Insights"
        component={InsightsNavigator}
        // options={{
        //   tabBarIcon: ({ color }) => (
        //     <Icon
        //       name="home"
        //       style={{ position: "relative" }}
        //       color={color}
        //       size={30}
        //     />
        //   ),
        // }}
      />
      <Tab.Screen
        name="Formulary"
        component={FormularyNavigator}
        // options={{
        //   tabBarIcon: ({ color }) => (
        //     <Icon
        //       name="home"
        //       style={{ position: "relative" }}
        //       color={color}
        //       size={30}
        //     />
        //   ),
        // }}
      />
      <Tab.Screen
        name="Search"
        component={SearchNavigator}
        // options={{
        //   tabBarIcon: ({ color }) => (
        //     <Icon
        //       name="home"
        //       style={{ position: "relative" }}
        //       color={color}
        //       size={30}
        //     />
        //   ),
        // }}
      />

      <Tab.Screen
        name="Knowledge"
        component={KnowledgeNavigator}
        // options={{
        //   tabBarIcon: ({ color }) => (
        //     <Icon
        //       name="home"
        //       style={{ position: "relative" }}
        //       color={color}
        //       size={30}
        //     />
        //   ),
        // }}
      />
      <Tab.Screen
        name="Challenges"
        component={ChallengesNavigator}
        // options={{
        //   tabBarIcon: ({ color }) => (
        //     <Icon
        //       name="home"
        //       style={{ position: "relative" }}
        //       color={color}
        //       size={30}
        //     />
        //   ),
        // }}
      />
    </Tab.Navigator>
  );
};

export default Main;
