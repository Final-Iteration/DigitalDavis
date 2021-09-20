import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import Search from "../screens/searchScreen/Search";
import SearchedSearch from "../screens/searchScreen/SearchedSearch";

const SearchStack = createStackNavigator({
  Search: {
    screen: Search,
  },
  SearchedSearch: {
    screen: SearchedSearch,
  },
});

export default SearchStack;
