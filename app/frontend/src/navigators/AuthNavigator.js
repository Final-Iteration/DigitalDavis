import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Login from '../screens/userScreen/Login';
import Signup from '../screens/userScreen/SignUp';
import ForgotPassword from '../screens/userScreen/forgotPassword';

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
  Register: {
    screen: Signup,
    navigationOptions: {
      headerShown: false,
    },
  },
  ForgotPassword: {
    screen: ForgotPassword,
  },
});

export default AuthStack;
