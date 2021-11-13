//https://reactnavigation.org/docs/auth-flow/
import React from "react";
import { createSwitchNavigator } from "react-navigation";
//auth stack
import AuthStack from "./AuthNavigator";
//main stack
import MainStack from "./Modal";

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
export default MainNavigator;
