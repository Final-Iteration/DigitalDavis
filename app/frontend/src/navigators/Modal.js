import React from "react";
import { createStackNavigator } from "react-navigation-stack";

//user Profile
import ProfileStack from "./ProfileNavigator";
//botto, tab
import TabStack from "./MainBottomTab";
import Header from "../sharedComponent/Header";
const mainFlowWithProfile = createStackNavigator(
  {
    mainFlow: {
      screen: TabStack,
      navigationOptions: {
        headerShown: false,
      },
    },
    User: {
      screen: ProfileStack,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: "mainFlow",
    mode: "modal",
    headerMode: "screen",
  }
);

export default mainFlowWithProfile;
