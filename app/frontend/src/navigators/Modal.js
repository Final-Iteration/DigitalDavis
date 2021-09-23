import React from "react";
import { createStackNavigator } from "react-navigation-stack";

//user Profile
import ProfileStack from "./ProfileNavigator";
//bottom tab
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
         gesturesEnabled: true,
      },
    },
  },
  {
    initialRouteName: "mainFlow",
    mode: "modal",                      // top to bottom instead of left to right
    headerMode: "screen",
  }
);

export default mainFlowWithProfile;
