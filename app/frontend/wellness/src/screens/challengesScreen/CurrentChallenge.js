import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const CurrentChallenges = (props) => {
  return (
    <View>
      <Text style={{ alignSelf: "center" }}>
        This is the CurrentChallenges screen
      </Text>
      <Button
        title="past challenge"
        onPress={() => {
          props.navigation.navigate("SearchedChallenge");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CurrentChallenges;
