import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import Knowledge from "../screens/knowledgeScreen/Knowledge";
import SearchedKnowledge from "../screens/knowledgeScreen/SearchedKnowledge";

const KnowledgeStack = createStackNavigator({
  Knowledge: {
    screen: Knowledge,
  },
  SearchedKnowledge: {
    screen: SearchedKnowledge,
  },
});

export default KnowledgeStack;
