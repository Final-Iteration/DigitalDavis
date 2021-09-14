import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import Login from "../screens/userScreen/Login";
import Logout from "../screens/userScreen/Logout";
import Signup from "../screens/userScreen/Singup";

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
  Register: {
    screen: Signup,
  },
});

export default AuthStack;
