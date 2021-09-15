import React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import ChallengeBox from "./components/ChallengeBox";
import SwipeButton from "./components/SwipeButton";

const CurrentChallenges = (props) => {
  return (
    <View>
      <Button
        title="past challenge"
        onPress={() => {
          props.navigation.navigate("SearchedChallenge");
        }}
      />
      <SwipeButton/>
      <ScrollView>
        <ChallengeBox />
        <ChallengeBox />
        <ChallengeBox />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default CurrentChallenges;
