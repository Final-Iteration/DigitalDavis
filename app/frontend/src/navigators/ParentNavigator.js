//https://reactnavigation.org/docs/auth-flow/
import React from "react";
import { createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

//bottom tab
import ChallengeStack from "./ChallengesNavigator";
import FormularyStack from "./FormularyNavigator";
import InsightStack from "./InsightsNavigator";
import KnowledgeStack from "./KnowledgeNavigator";
import SearchStack from "./SearchNavigator";

//auth stack
import AuthStack from "./UserNavigator";

const TabStack = createBottomTabNavigator({
  InsightStack: InsightStack,
  Formulary: FormularyStack,
  SearchStack: SearchStack,
  KnowledgeStack: KnowledgeStack,
  Challenge: ChallengeStack,
});

const MainNavigator = createSwitchNavigator(
  {
    Auth: AuthStack,
    Main: TabStack,
  },
  {
    initialRouteName: 'Auth',
  }
);

export default MainNavigator;
