import React from "react";
import { StatusBar, LogBox } from "react-native";
import { createAppContainer } from "react-navigation";
import MainNavigator from "./src/navigators/ParentNavigator";
import { Provider as PaperProvider } from "react-native-paper";
import FlashMessage from "react-native-flash-message";
LogBox.ignoreAllLogs();
const App = createAppContainer(MainNavigator);

export default () => {
  StatusBar.setBarStyle("dark-content");
  console.warn = () => {};
  LogBox.ignoreAllLogs();
  return (
    <PaperProvider>
      <App />
      <FlashMessage />
    </PaperProvider>
  );
};
