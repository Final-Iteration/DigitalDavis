import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Insights from '../screens/insightsScreen/Insights';

import Header from '../sharedComponent/Header';

const InsightStack = createStackNavigator(
  {
    Insight: {
      screen: Insights,
      navigationOptions: {
        header: ({ scene, previous, navigation }) => (
          <Header title="Insights" navigation={navigation} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Insight',
    headerMode: 'screen',
  }
);

export default InsightStack;
