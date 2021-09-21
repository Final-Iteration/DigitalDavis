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
      header: () => <Header title="Insights" />,
      headerStyle: {
        backgroundColor: "#142A4F",
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
  },
  UserProfile: {
    screen: User,
  },
});

export default InsightStack;
