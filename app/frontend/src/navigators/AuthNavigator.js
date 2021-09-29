import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Login from '../screens/userScreen/Login';
import Signup from '../screens/userScreen/SignUp';
import ForgotPassword from '../screens/userScreen/ForgotPassword';

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
  ForgotPass: {
    screen: ForgotPassword,
  },
});

export default AuthStack;
