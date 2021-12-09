import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/userScreen/Login';
import Signup from '../screens/userScreen/SignUp';
import ForgotPassword from '../screens/userScreen/ForgotPassword';
import Header from '../sharedComponent/Header';

const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Signup}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header title="Sign Up" navigation={navigation} signup={true} />
          ),
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ForgotPassword}
        options={{
          headerShown: true,
          title: 'Reset Password',
        }}
      />
    </Stack.Navigator>
  );
}

export default function AuthNavigator() {
  return <MyStack />;
}
