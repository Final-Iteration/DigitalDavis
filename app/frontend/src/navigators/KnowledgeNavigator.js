import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Knowledge from '../screens/knowledgeScreen/Knowledge';
import SearchedKnowledge from '../screens/knowledgeScreen/SearchedKnowledge';

import Header from '../sharedComponent/Header';

const KnowledgeStack = createStackNavigator(
  {
    Knowledge: {
      screen: Knowledge,
      navigationOptions: {
        header: ({ scene, previous, navigation }) => (
          <Header title="Knowledge" navigation={navigation} />
        ),
      },
    },
    SearchedKnowledge: {
      screen: SearchedKnowledge,
    },
  },
  {
    initialRouteName: 'Knowledge',
    headerMode: 'screen',
  }
);

export default KnowledgeStack;
