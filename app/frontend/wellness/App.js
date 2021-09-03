// import React from "react";
// import { StyleSheet, Text, View } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";

// import MainNavigator from "./src/navigators/MainNavigator";

// export default function App() {
//   return (
//     <NavigationContainer>
//       <MainNavigator />
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({});

import React from "react";
import { createAppContainer } from "react-navigation";
import MainNavigator from "./src/navigators/ParentNavigator";

const App = createAppContainer(MainNavigator);
export default () => {
  return <App />;
};
