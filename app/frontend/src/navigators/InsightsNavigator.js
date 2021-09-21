import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import Insights from "../screens/insightsScreen/Insights";
import Settings from "../screens/insightsScreen/Settings";
import User from "../screens/insightsScreen/User";

import Header from "../sharedComponent/Header";

const InsightStack = createStackNavigator({
  Insight: {
    screen: Insights,
    navigationOptions: {
      header: ({ scene, previous, navigation }) => (
        <Header title="Insights" navigation={navigation} />
      ),
      headerStyle: {
        backgroundColor: null,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "semi-bold",
        fontSize: 32,
        fontFamily: "Helvetica",
      },
    },
  },
  Setting: {
    screen: Settings,
    navigationOptions: {
      headerShown: false,
    },
  },
  UserProfile: {
    screen: User,
    navigationOptions: {
      headerShown: false,
    },
  },
});

export default InsightStack;
