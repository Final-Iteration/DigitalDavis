import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import ChallengeBox from "./components/ChallengeBox";

const CurrentChallenges = (props) => {
  return (
    <View>
      <Button
        title="past challenge"
        onPress={() => {
          props.navigation.navigate("SearchedChallenge");
        }}
      />
      <ChallengeBox />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CurrentChallenges;
