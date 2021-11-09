import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import Formulary from "../screens/formularyScreen/Formulary";

import Header from "../sharedComponent/Header";

const FormularyStack = createStackNavigator(
  {
    Formulary: {
      screen: Formulary,
      navigationOptions: {
        header: ({ scene, previous, navigation }) => (
          <Header title="Formulary" navigation={navigation} />
        ),
      },
    },
  },
  {
    initialRouteName: "Formulary",
    headerMode: "screen",
  }
);

export default FormularyStack;
