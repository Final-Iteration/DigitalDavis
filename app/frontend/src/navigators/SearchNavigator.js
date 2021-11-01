import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Search from '../screens/searchScreen/Search';
import SearchedSearch from '../screens/searchScreen/SearchedSearch';

import Header from '../sharedComponent/Header';

const SearchStack = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      header: () => <Header title="Search" />,
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
  SearchedSearch: {
    screen: SearchedSearch,
  },
});

export default SearchStack;
