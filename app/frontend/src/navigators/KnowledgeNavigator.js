import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Knowledge from '../screens/knowledgeScreen/Knowledge';
import SearchedKnowledge from '../screens/knowledgeScreen/SearchedKnowledge';

import Header from '../sharedComponent/Header';

const KnowledgeStack = createStackNavigator({
  Knowledge: {
    screen: Knowledge,
    navigationOptions: {
      header: () => <Header title="Knowledge" />,
      headerStyle: {
        backgroundColor: "#142A4F",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "semi-bold",
        fontSize: 32,
        fontFamily: "Helvetica",
      },
    },
  },
  SearchedKnowledge: {
    screen: SearchedKnowledge,
  },
});

export default KnowledgeStack;
