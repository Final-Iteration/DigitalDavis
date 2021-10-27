/* eslint-disable react-native/no-color-literals */
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TagPill = ({ tag }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.tagText}>{tag}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    margin: 2,
    backgroundColor: "#142A4F",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    shadowColor: "#142A4F",
  },
  tagText: {
    fontSize: 9,
    margin: 9,
    color: "white",
    alignSelf: "center",
  },
});

export default TagPill;
