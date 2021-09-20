import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import Insights from "../screens/insightsScreen/Insights";
import Settings from "../screens/insightsScreen/Settings";
import User from "../screens/insightsScreen/User";

const InsightStack = createStackNavigator({
  Insight: {
    screen: Insights,
  },
  Setting: {
    screen: Settings,
  },
  UserProfile: {
    screen: User,
  },
});

export default InsightStack;
