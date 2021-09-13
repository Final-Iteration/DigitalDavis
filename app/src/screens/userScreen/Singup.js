import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const Signup = (props) => {
  return (
    <View>
      <Text style={{ alignSelf: "center" }}>Sign up screen</Text>
      <Button
        title="Main Flow"
        onPress={() => props.navigation.navigate("Main")}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Signup;
