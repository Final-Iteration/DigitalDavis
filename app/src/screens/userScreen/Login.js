import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const Login = (props) => {
  return (
    <View>
      {/* this will be removed! when we have our login API set up*/}
      <Text style={{ alignSelf: "center" }}>Log in screen</Text>

      <Button
        title="Enter main flow"
        onPress={() => props.navigation.navigate("Main")}
      />
      <Button
        title="Sign up"
        onPress={() => props.navigation.navigate("Register")}
      />
    </View>
  );
};
const styles = StyleSheet.create({});
export default Login;
