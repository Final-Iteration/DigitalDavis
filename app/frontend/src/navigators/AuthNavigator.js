import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Login from '../screens/userScreen/Login';
import Signup from '../screens/userScreen/SignUp';
import ForgotPassword from '../screens/userScreen/ForgotPassword';
import Header from '../sharedComponent/Header';

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
      header: ({ scene, previous, navigation }) => (
        <Header title="Sign Up" navigation={navigation} signup={true} />
      ),

    },
  },
  ResetPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      headerShown: true,
      title: 'Reset Password',
    },
  },
});

export default AuthStack;
