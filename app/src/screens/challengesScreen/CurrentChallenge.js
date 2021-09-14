import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import ChallengeBox from "../../components/ChallengeBox";

const CurrentChallenges = (props) => {
  return (
    <View>
      <Text style={{ alignSelf: "center" }}>
        This is the Current Challenges screen
      </Text>
      <ChallengeBox/>
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