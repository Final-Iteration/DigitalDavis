import React from 'react';
import { StatusBar, LogBox } from 'react-native';

import MainNavigator from './src/navigators/ParentNavigator';
import { Provider as PaperProvider } from 'react-native-paper';
import FlashMessage from 'react-native-flash-message';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

export default () => {
  StatusBar.setBarStyle('dark-content');
  console.warn = () => {};
  LogBox.ignoreAllLogs();
  return (
    <PaperProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
      <FlashMessage />
    </PaperProvider>
  );
};
