import React, { useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import ChallengeBox from "./components/ChallengeBox";
import SwipeButton from "./components/SwipeButton";
import SwipeButton2 from "./components/SwipeButton2";

const CurrentChallenges = (props) => {
  const [toggleState, setToggleState] = useState(false);

  const handleToggle = (value) => setToggleState(value);
  return (
    <View>
      <Button
        title="past challenge"
        onPress={() => {
          props.navigation.navigate("SearchedChallenge");
        }}
      />
      <SwipeButton2 onToggle={handleToggle} />
      <ScrollView>
        <ChallengeBox />
        <ChallengeBox />
        <ChallengeBox />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CurrentChallenges;
