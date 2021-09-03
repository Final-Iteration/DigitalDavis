import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import Formulary from "../screens/formularyScreen/Formulary";
import SearchedFormulary from "../screens/formularyScreen/SearchedFormulary";

const FormularyStack = createStackNavigator({
  Formulary: {
    screen: Formulary,
  },
  SearchedFormulary: {
    screen: SearchedFormulary,
  },
});

export default FormularyStack;
