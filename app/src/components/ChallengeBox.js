import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

const ChallengeBox = () => {
  return (
    <View>
      <Text>This is the challenges Box</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 120,
    borderRadius: 4,
    marginBottom: 5,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {},
  description: {},
  status: {
    color: "grey",
  },
});

export default ChallengeBox