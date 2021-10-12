import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Search from '../screens/searchScreen/Search';
import SearchedSearch from '../screens/searchScreen/SearchedSearch';

import Header from '../sharedComponent/Header';

const SearchStack = createStackNavigator(
  {
    Search: {
      screen: Search,
      navigationOptions: {
        header: ({ scene, previous, navigation }) => (
          <Header title="Search" navigation={navigation} />
        ),
      },
    },
    SearchedSearch: {
      screen: SearchedSearch,
    },
  },
  {
    initialRouteName: 'Search',
    headerMode: 'screen',
  }
);

export default SearchStack;
