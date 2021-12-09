import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Settings from '../screens/Profile/Setting';
import Profile from '../screens/Profile/User';
import Header from '../sharedComponent/Header';

const Stack = createStackNavigator();
function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="User" headerMode="screen">
      <Stack.Screen
        name="User"
        component={Profile}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header title="Profile" navigation={navigation} profile={true} />
          ),
          cardStyle: { backgroundColor: '#142A4F' },
        }}
      />
      <Stack.Screen
        name="Setting"
        component={Settings}
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header title="Settings" navigation={navigation} setting={true} />
          ),
          cardStyle: { backgroundColor: '#142A4F' },
        }}
      />
    </Stack.Navigator>
  );
}

export default function AuthNavigator() {
  return <ProfileStack />;
}
