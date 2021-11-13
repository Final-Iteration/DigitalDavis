//https://reactnavigation.org/docs/auth-flow/
import React from "react";
import { createSwitchNavigator } from "react-navigation";
//auth stack
import AuthStack from "./AuthNavigator";
//main stack
import MainStack from "./Modal";

const MainNavigator = createSwitchNavigator(
  {
    Auth: AuthStack,
    Main: MainStack,
  },
  {
    initialRouteName: "Auth",
  }
);

export default MainNavigator;
