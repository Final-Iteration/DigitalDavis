import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Settings from '../screens/Profile/Setting';
import Profile from '../screens/Profile/User';
import Header from '../sharedComponent/Header';

const ProfileStack = createStackNavigator(
  {
    User: {
      screen: Profile,
      navigationOptions: {
        header: ({ scene, previous, navigation }) => (
          <Header title="Profile" navigation={navigation} profile={true} />
        ),
      },
    },
    Setting: {
      screen: Settings,
      navigationOptions: {
        header: ({ scene, previous, navigation }) => (
          <Header
            title="Settings"
            navigation={navigation}
            profile={true}
            setting={true}
          />
        ),
      },
    },
  },
  { initialRouteName: 'User', headerMode: 'screen' }
);

export default ProfileStack;
