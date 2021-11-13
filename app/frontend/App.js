import React from "react";
import { StatusBar, LogBox } from "react-native";

// import MainNavigator from "./src/navigators/ParentNavigator";
import { Provider as PaperProvider } from "react-native-paper";
import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from "@react-navigation/native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "@react-navigation/stack";
LogBox.ignoreAllLogs();

//auth stack
import AuthStack from "./src/navigators/AuthNavigator";
//main stack
import MainStack from "./src/navigators/Modal";
// const App = createAppContainer(MainNavigator);

const Stack = createStackNavigator();
const Main = () => {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerShown: false,
        headerLeft: null,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name="Main"
        component={MainStack}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="Auth" component={AuthStack} />
    </Stack.Navigator>
  );
};

export default () => {
  StatusBar.setBarStyle("dark-content");
  console.warn = () => {};
  LogBox.ignoreAllLogs();
  return (
    <PaperProvider>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
      <FlashMessage />
    </PaperProvider>
  );
};
