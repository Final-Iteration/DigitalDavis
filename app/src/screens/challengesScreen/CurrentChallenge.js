import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity } from "react-native";
import ChallengeBox from "./components/ChallengeBox";
// import SwipeButton from "./components/SwipeButton";

const CurrentChallenges = (props) => {
  //Toggles the active and recent challenges
  const [toggleState, setToggleState] = useState(false);

  const handleToggle = (value) => setToggleState(value);

  // useEffect(() => {
  //   if (toggleState) {
  //     // console.log("Toggle is true. Go to on Recent Challenges Screen");
  //     props.navigation.navigate("SearchedChallenge");
  //   } else {
  //     // console.log("Toggle is FALSE.Stay Active Challenges Screen");
  //   }
  // }, [toggleState]);

  return (
    <View>
      {/* This Button is no longer needed as its done by the swipe button */}
      {/* <Button
        title="past challenge"
        onPress={() => {
          props.navigation.navigate("SearchedChallenge");
        }}
      /> */}
      {/* <SwipeButton onToggle={handleToggle} /> */}
      <ScrollView>
        <TouchableOpacity onPress={() => props.navigation.navigate("ChallengeInformation")}>
          <ChallengeBox />
        </TouchableOpacity>
        <ChallengeBox />
        <ChallengeBox />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CurrentChallenges;
