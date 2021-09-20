import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const Insights = (props) => {
  return (
    <View>
      <Text style={{ alignSelf: "center" }}> This is the Insights screen</Text>
      <Button
        title="logout"
        onPress={() => {
          props.navigation.navigate("Auth");
        }}
      />
      <Button
        title="setting"
        onPress={() => {
          props.navigation.navigate("Setting");
        }}
      />
      <Button
        title="user"
        onPress={() => {
          props.navigation.navigate("UserProfile");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Insights;
