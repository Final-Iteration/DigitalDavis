import React from "react";
import { createAppContainer } from "react-navigation";
import MainNavigator from "./src/navigators/ParentNavigator";

const App = createAppContainer(MainNavigator);
export default () => {
  return <App />;
};
